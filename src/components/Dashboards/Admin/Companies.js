import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Grid,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { CardComponent, FilterDrawer } from "../NGOsCompanent";

const AdminCompanies = (userType) => {
  const [companies, setCompanies] = useState([]);
  const [filteredResult, setResult] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchNgos();
  });

  const fetchNgos = async () => {
    var options;

    const token = localStorage.getItem("AdminAuthToken");

    options = {
      headers: {
        "Content-type": "application/json",
        authorization: token,
      },
    };
    try {
      console.log(options.headers);
      const response = await fetch("http://localhost:4000/compnaies", options);
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setCompanies(data.companies);
        setResult(data.companies);
      } else {
        console.log("Error:", data.message);
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };
  // Function to handle search query changes
  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to handle checkbox selection
  const handleCheckboxChange = (selectedSectors) => {
    // console.warn(selectedSectors);
    // Apply filters based on selected sectors and states
    const filteredCompanies = companies.filter((company) => {
      const sectorMatch =
        selectedSectors.length === 0 ||
        (company.profile.sectors &&
          selectedSectors.some((sector) =>
            company.profile.sectors.includes(sector)
          ));

      return sectorMatch;
    });

    console.log("Filtered Companies:", filteredCompanies);
    setResult(filteredCompanies);
  };

  return (
    <Box>
      <Flex>
        <FilterDrawer
          isOpen={true}
          handleCheckboxChange={handleCheckboxChange}
        />
        <Box flex="1" p="4" marginLeft="auto">
          <InputGroup mb={4}>
            <InputLeftElement pointerEvents="none" children={<SearchIcon />} />
            <Input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchQueryChange}
            />
          </InputGroup>
          <Box display="flex" p="4">
            <Grid templateColumns="repeat(3, 1fr)" gap={3}>
              {filteredResult
                .filter((company) =>
                  company.company_name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
                )
                .map((company) => (
                  <CardComponent
                    userType={"company"}
                    ngoId={company._id}
                    name={company.company_name}
                    email={company.email}
                    phone={company.profile.phone}
                    location={company.profile.location}
                  />
                ))}
            </Grid>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default AdminCompanies;

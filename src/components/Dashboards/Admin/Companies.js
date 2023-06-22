import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { CardComponent, FilterDrawer } from "../NGOsCompanent";
import AdminNavigation from "../../Navigation/adminNavigation";

const AdminCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredResult, setResult] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchCompanies = async () => {
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
      const response = await fetch("http://localhost:4000/companies", options);
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        console.log(data.companies);
        setCompanies(data.companies);
        setResult(data.companies);
      } else {
        console.log("Error:", data.message);
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  // Function to fetch companies and update state
  const updateCompanies = async () => {
    await fetchCompanies();
  };

  // Callback function to trigger fetchCompanies
  const triggerFetchCompanies = () => {
    updateCompanies();
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
    <Box
      style={{
        backgroundImage: "url('../bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        minWidth: "100vw",
      }}
    >
      <AdminNavigation />
      <Box
        display={"flex"}
        justifyContent={"center"}
        mt={"5"}
        borderRadius="lg"
        borderWidth="1px"
        width={"90vw"}
        ml={"5vw"}
        bgColor={"whiteAlpha.800"}
        // style={{ backdropFilter: "blur(5px)" }}
        overflow={"auto"}
      >
        <Box width={"98vw"} height={"80vh"}>
          <Flex>
            <FilterDrawer
              isOpen={true}
              handleCheckboxChange={handleCheckboxChange}
            />
            <Box flex="1" p="4" marginLeft="auto">
              <InputGroup mb={4}>
                <InputLeftElement
                  pointerEvents="none"
                  children={<SearchIcon />}
                />
                <Input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={handleSearchQueryChange}
                />
              </InputGroup>
              <Box
                display="flex"
                pt="6"
                pl={"4"}
                flexWrap="wrap"
              >
                {filteredResult
                  .filter((company) =>
                    company.company_name
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  )
                  .map((company) => (
                    <CardComponent
                      userType={"admin"}
                      type={"company"}
                      Id={company._id}
                      name={company.company_name}
                      logo={company.profile.company_logo}
                      email={company.email}
                      phone={company.profile.comunication_person.cp_phone}
                      location={company.profile.location}
                      triggerFetchCompanies={triggerFetchCompanies} // Pass the callback function as a prop
                    />
                  ))}
              </Box>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminCompanies;

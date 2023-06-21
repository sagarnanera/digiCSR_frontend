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
import AdminNavigation from "../../Navigation/adminNavigation";

const AdminNGOs = () => {
  const [ngos, setNgos] = useState([]);
  const [filteredResult, setResult] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchNgos();
  }, []);
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
      const response = await fetch("http://localhost:4000/NGO", options);
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setNgos(data.ngos);
        setResult(data.ngos);
      } else {
        console.log("Error:", data.message);
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };
  const updateCompanies = async () => {
    await fetchNgos();
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
  const handleCheckboxChange = (selectedSectors, selectedStates) => {
    // console.warn(selectedSectors);
    console.warn(selectedStates);
    // Apply filters based on selected sectors and states
    const filteredNgos = ngos.filter((ngo) => {
      const sectorMatch =
        selectedSectors.length === 0 ||
        (ngo.profile.sectors &&
          selectedSectors.some((sector) =>
            ngo.profile.sectors.includes(sector)
          ));
      const stateMatch =
        selectedStates.length === 0 ||
        (ngo.profile.operation_area &&
          selectedStates.some((state) =>
            ngo.profile.operation_area.includes(state)
          ));
      console.log("State Match:", stateMatch);
      return stateMatch && sectorMatch;
    });

    console.log("Filtered NGOs:", filteredNgos);
    setResult(filteredNgos);
  };

  return (
    <Box>
      <AdminNavigation />
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
                .filter((ngo) =>
                  ngo.ngo_name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((ngo) => (
                  <CardComponent
                    userType={"admin"}
                    type={"ngo"}
                    Id={ngo._id}
                    name={ngo.ngo_name}
                    email={ngo.email}
                    phone={ngo.profile.phone}
                    location={ngo.profile.location}
                    triggerFetchCompanies={triggerFetchCompanies} // Pass the callback function as a prop
                  />
                ))}
            </Grid>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default AdminNGOs;

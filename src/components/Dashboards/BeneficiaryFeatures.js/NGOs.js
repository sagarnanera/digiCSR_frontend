import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Badge,
  Flex,
  Checkbox,
  CheckboxGroup,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Grid,
  Input,
  InputGroup,
  InputLeftElement,
  MenuButton,
  SimpleGrid,
  MenuList,
  MenuItem,
  Stack,
  Text,
  useDisclosure,
  Heading,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  FilterIcon,
  EmailIcon,
  PhoneIcon,
} from "@chakra-ui/icons";
import { sectorOptions } from "../../sectorData";
import { fetchStates } from "../../geoData";
import { Icon } from "@chakra-ui/react";
import { FiMapPin } from "react-icons/fi";
const FilterableCardList = () => {
  const ngo = {
    ngoName: "Your NGO Name",
    states: [
      "Andaman and Nicobar",
      "Goa",
      "Gujarat",
      "Gujarat",
      "Gujarat",
      "Gujarat",
      "Gujarat",
      "Gujarat",
    ],
    sectors: ["Sector 1", "Sector 2", "Sector 3", "Sector 4", "Sector 5"],
    ratings: 4.5,
  };
  const [ngos, setNgos] = useState([]);
  const [filteredResult, setResult] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchNgos();
  }, []);

  const fetchNgos = async () => {
    try {
      const response = await fetch("http://localhost:4000/NGO", {
        headers: {
          authorization: localStorage.getItem("CompanyAuthToken"), // Replace with your actual token
        },
      });
      const data = await response.json();
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
    <>
      <FilterDrawer isOpen={true} handleCheckboxChange={handleCheckboxChange} />
      <Box flex='1' p='4' marginLeft='auto'>
        <InputGroup mb={4}>
          <InputLeftElement pointerEvents='none' children={<SearchIcon />} />
          <Input
            type='text'
            placeholder='Search'
            value={searchQuery}
            onChange={handleSearchQueryChange}
          />
        </InputGroup>
        <Box display='flex' p='4'>
          <Grid templateColumns='repeat(3, 1fr)' gap={3}>
            {filteredResult
              .filter((ngo) =>
                ngo.ngo_name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((ngo) => (
                <CardComponent
                  key={ngo._id}
                  name={ngo.ngo_name}
                  email={ngo.email}
                  phone={ngo.profile.phone}
                  location={ngo.profile.location}
                />
              ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

const FilterDrawer = ({ isOpen, onClose, handleCheckboxChange }) => {
  const [states, setStates] = useState([]);
  const [selectedSectors, setSelectedSectors] = useState([]);
  const [selectedStates, setSelectedStates] = useState([]);
  const [isSectorDropdownOpen, setIsSectorDropdownOpen] = useState(false);
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);

  useEffect(() => {
    const getStates = async () => {
      const fetchedStates = await fetchStates();
      setStates(fetchedStates);
    };
    getStates();
  }, []);

  const handleToggleSectorDropdown = () => {
    setIsSectorDropdownOpen((prevIsDropdownOpen) => !prevIsDropdownOpen);
  };

  const handleToggleStateDropdown = () => {
    setIsStateDropdownOpen((prevIsDropdownOpen) => !prevIsDropdownOpen);
  };

  const handleSectorChange = (selectedOptions) => {
    setSelectedSectors(selectedOptions);
  };

  const handleStateChange = (selectedOptions) => {
    setSelectedStates(selectedOptions);
  };

  const handleApplyFilters = () => {
    handleCheckboxChange(selectedSectors, selectedStates);
  };

  return (
    <Box
      left={0}
      top={0}
      h='100vh'
      overflow='auto'
      padding='1%'
      w='45vh'
      bg='linear-gradient(174.6deg, rgba(19, 15, 38, 0.6825) 1.74%, rgba(19, 15, 38, 0.75) 53.41%, rgba(19, 15, 38, 0.739748) 76.16%, rgba(19, 15, 38, 0.6075) 97.17%)'
      boxShadow='md'
    >
      <Heading color='white' fontSize='4xl' marginBottom='0.7rem'>
        Filters
      </Heading>
      <Button
        alignContent='center'
        w='90%'
        rightIcon={
          isSectorDropdownOpen ? <ChevronUpIcon /> : <ChevronDownIcon />
        }
        onClick={handleToggleSectorDropdown}
        display='flex'
        justifyContent='flex-start'
        style={{ background: "rgba(255, 255, 255, 0.27)", color: "white" }}
      >
        Select Sector
      </Button>
      {isSectorDropdownOpen && (
        <Stack
          maxH='300px'
          width='90%'
          overflowY='auto'
          spacing={2}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.27)",
            color: "white",
            padding: "1rem",
            marginTop: "0.5rem",
            borderRadius: "5px",
          }}
        >
          <CheckboxGroup
            colorScheme='teal'
            value={selectedSectors}
            onChange={handleSectorChange}
          >
            {sectorOptions.map((option) => (
              <Checkbox key={option.value} id={option.id} value={option.label}>
                {option.label}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </Stack>
      )}
      <Button
        w='90%'
        rightIcon={
          isStateDropdownOpen ? <ChevronUpIcon /> : <ChevronDownIcon />
        }
        onClick={handleToggleStateDropdown}
        display='flex'
        justifyContent='flex-start'
        style={{
          background: "rgba(255, 255, 255, 0.27)",
          color: "white",
          marginTop: "1rem",
        }}
      >
        Select State
      </Button>

      {isStateDropdownOpen && (
        <Stack
          maxH='400px'
          overflowY='auto'
          width='90%'
          spacing={2}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.27)",
            color: "white",
            padding: "1rem",
            marginTop: "0.5rem",
            borderRadius: "5px",
          }}
        >
          <CheckboxGroup
            colorScheme='teal'
            value={selectedStates}
            onChange={handleStateChange}
          >
            {states.map((state) => (
              <Checkbox
                key={state.adminCode1}
                id={state.geonameId}
                value={state.name}
              >
                {state.name}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </Stack>
      )}
      <Button
        w='90%'
        display='flex'
        justifyContent='center'
        justifyItems='center'
        style={{
          background: "rgba(255, 255, 255, 0.27)",
          color: "white",
          marginTop: "1rem",
        }}
        onClick={handleApplyFilters}
      >
        Apply
      </Button>
    </Box>
  );
};

const CardComponent = ({ name, email, phone, location }) => {
  return (
    <Box
      maxW='sm'
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
      p={4}
      marginLeft='0.1rem'
    >
      <Text fontSize='xl' fontWeight='bold' mb={4}>
        {name}
      </Text>
      <Flex align='center' mb={2}>
        <EmailIcon mr={2} />
        <Text>{email}</Text>
      </Flex>
      <Flex align='center' mb={2}>
        <PhoneIcon mr={2} />
        <Text>{phone}</Text>
      </Flex>
      <Flex align='center'>
        <Icon as={FiMapPin} mr={2} />
        <Text>
          {location.city} , {location.state} , {location.pincode}
        </Text>
      </Flex>
    </Box>
  );
};

const SearchIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M21 21l-4.35-4.35'
      />
      <circle cx='11' cy='11' r='8' />
    </svg>
  );
};

export default FilterableCardList;

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
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon, FilterIcon } from "@chakra-ui/icons";
import { sectorOptions } from "../../sectorData";
import { fetchStates } from "../../geoData";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Function to handle search query changes
  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to handle checkbox selection
  const handleCheckboxChange = (selectedFilters) => {
    setFilters(selectedFilters);
  };

  return (
    <Box p={4}>
      <InputGroup mb={4}>
        <InputLeftElement pointerEvents='none' children={<SearchIcon />} />
        <Input
          type='text'
          placeholder='Search'
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
      </InputGroup>
      <Stack direction='row' spacing={4} mb={4}>
        <FilterButton onOpen={onOpen} />
      </Stack>
      <Grid templateColumns='repeat(3, 1fr)' gap={3}>
        {/* Replace the following dummy card components with your actual card components */}
        <Card
          ngoName={ngo.ngoName}
          states={ngo.states}
          sectors={ngo.sectors}
          ratings={ngo.ratings}
        />
      </Grid>
      <FilterDrawer isOpen={true} handleCheckboxChange={handleCheckboxChange} />
    </Box>
  );
};

const FilterButton = ({ onOpen }) => {
  return (
    <Button onClick={onOpen} colorScheme='blue'>
      Open Filters
    </Button>
  );
};

const FilterDrawer = ({ isOpen, onClose, handleCheckboxChange }) => {
  const [states, setStates] = useState([]);

  useEffect(() => {
    const getStates = async () => {
      const fetchedStates = await fetchStates();
      setStates(fetchedStates);
    };
    getStates();
  }, []);

  const [isSectorDropdownOpen, setIsSectorDropdownOpen] = useState(false);
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);

  const handleToggleSectorDropdown = () => {
    setIsSectorDropdownOpen((prevIsDropdownOpen) => !prevIsDropdownOpen);
  };

  const handleToggleStateDropdown = () => {
    setIsStateDropdownOpen((prevIsDropdownOpen) => !prevIsDropdownOpen);
  };
  //   const btnCss = {};

  return (
    <Drawer isOpen={isOpen} placement='left'>
      <DrawerContent
        style={{
          background:
            "linear-gradient(174.6deg, rgba(19, 15, 38, 0.6825) 1.74%, rgba(19, 15, 38, 0.75) 53.41%, rgba(19, 15, 38, 0.739748) 76.16%, rgba(19, 15, 38, 0.6075) 97.17%)",
        }}
      >
        <DrawerHeader>Filters</DrawerHeader>
        <DrawerBody>
          <Button
            w='100%'
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
                // value={sector}
                // onChange={handleSectorChange}
              >
                {sectorOptions.map((option) => (
                  <Checkbox
                    key={option.value}
                    id={option.id}
                    value={option.label}
                  >
                    {option.label}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            </Stack>
          )}
          <Button
            w='100%'
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
                // value={selectedStates}
                // onChange={handleStateChange}
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
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

const Card = ({ ngoName, states, sectors, ratings }) => {
  // Limiting states and sectors to at most 7
  const truncatedStates = states.slice(0, 7);
  const truncatedSectors = sectors.slice(0, 7);

  // Checking if there are more states and sectors
  const hasMoreStates = states.length > 7;
  const hasMoreSectors = sectors.length > 7;
  return (
    <Box
      width='25rem'
      height='fit-content'
      borderRadius='md'
      bg='gray.200'
      p={4}
      display='flex'
      flexDirection='column'
      justifyContent='space-between'
    >
      <Text fontWeight='bold' fontSize='lg' mb={2}>
        {ngoName}
      </Text>

      <Box mb={2}>
        <Text fontSize='sm' fontWeight='bold' mb={1}>
          States:
        </Text>
        <SimpleGrid columns={2} spacing={2}>
          {truncatedStates.map((state, index) => (
            <Text key={index}>{state}</Text>
          ))}
        {hasMoreStates && <Text>more...</Text>}
        </SimpleGrid>
      </Box>

      <Box mb={2}>
        <Text fontSize='sm' fontWeight='bold' mb={1}>
          Sectors:
        </Text>
        <SimpleGrid columns={2} spacing={2}>
          {truncatedSectors.map((sector, index) => (
            <Text key={index}>{sector}</Text>
          ))}
        {hasMoreSectors && <Text>more...</Text>}
        </SimpleGrid>
      </Box>

      <Text fontWeight='bold' fontSize='lg'>
        Ratings: {ratings}
      </Text>
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

/* Rectangle 1194 */

// position: absolute;
// width: 340px;
// height: 892px;
// left: 31px;
// top: 136px;

// background: linear-gradient(174.6deg, rgba(19, 15, 38, 0.6825) 1.74%, rgba(19, 15, 38, 0.75) 53.41%, rgba(19, 15, 38, 0.739748) 76.16%, rgba(19, 15, 38, 0.6075) 97.17%);
// backdrop-filter: blur(100px);
// /* Note: backdrop-filter has minimal browser support */
// border-radius: 23px 0px 0px 26px;

/* Button */

// box-sizing: border-box;

// /* Auto layout */
// display: flex;
// flex-direction: row;
// align-items: center;
// padding: 5px 16px;
// gap: 80px;

// width: 285px;
// height: 63px;

// background: rgba(255, 255, 255, 0.27);
// border: 2px solid rgba(255, 255, 255, 0.42);
// border-radius: 8px;

// /* Inside auto layout */
// flex: none;
// order: 1;
// flex-grow: 0;

// /* Frame 2351 */

// /* Auto layout */
// display: flex;
// flex-direction: row;
// align-items: center;
// padding: 0px;
// gap: 101px;

// width: 256px;
// height: 53px;

// /* Inside auto layout */
// flex: none;
// order: 0;
// align-self: stretch;
// flex-grow: 0;

// /* Label */

// width: 131px;
// height: 20px;

// font-family: 'Poppins';
// font-style: normal;
// font-weight: 400;
// font-size: 20px;
// line-height: 20px;
// /* identical to box height, or 100% */

// color: rgba(255, 255, 255, 0.65);

// /* Inside auto layout */
// flex: none;
// order: 0;
// flex-grow: 0;

// /* Icon */

// width: 24px;
// height: 24px;

// opacity: 0.5;

// /* Inside auto layout */
// flex: none;
// order: 1;
// flex-grow: 0;

// /* Group */

// position: absolute;
// left: 16.67%;
// right: 16.67%;
// top: 37.5%;
// bottom: 29.17%;

// /* Vector */

// position: absolute;
// left: 16.67%;
// right: 16.67%;
// top: 37.5%;
// bottom: 29.17%;

// border: 5px solid #FFFFFF;

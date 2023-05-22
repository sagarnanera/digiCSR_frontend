import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Text,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  InputGroup,
  InputLeftElement,
  Checkbox,
  CheckboxGroup,
  MenuItem,
  MenuList,
  MenuButton,
  Menu,
  Button,
  Stack,
  Select,
} from "@chakra-ui/react";
// import CompanyNavigation from "../companyNavigation";
import { sectorOptions } from "../../sectorData";
import { fetchStates, fetchCities } from "../../geoData";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  EmailIcon,
  PhoneIcon,
} from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const [checkedItems, setCheckedItems] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const getStates = async () => {
      const fetchedStates = await fetchStates();
      setStates(fetchedStates);
    };

    getStates();
  }, []);

  const handleStateChange = async (stateId) => {
    const fetchedCities = await fetchCities(stateId);
    setCities(fetchedCities);
  };

  const submitHandler = async () => {
    navigate("/Company", { replace: true });
  };

  const handleAllChecked = (e) => {
    const allChecked = e.target.checked;
    if (allChecked) {
      const allSectors = sectorOptions.map((option) => option.value);
      setCheckedItems(allSectors);
    } else {
      setCheckedItems([]);
    }
  };

  const handleSectorChange = (selectedItems) => {
    setCheckedItems(selectedItems);
  };

  const handleToggleDropdown = () => {
    setIsDropdownOpen((prevIsDropdownOpen) => !prevIsDropdownOpen);
  };

  return (
    <Container centerContent>
      <Box
        d="flex"
        textAlign="center"
        p={3}
        bg="#f2f2f2"
        w={{ base: "100%", md: "80vw" }}
        m="50px 0 10px 0"
        borderRadius="10px"
      >
        <Text fontSize="3xl" fontFamily="Work sans">
          Edit Company Profile
        </Text>
      </Box>
      <Box
        d="flex"
        textAlign="center"
        m="25px 0 10px 0"
        p={3}
        bg="#f2f2f2"
        w={{ base: "100%", md: "80vw" }}
        borderRadius="10px"
      >
        <VStack spacing={4} w="100%">
          <Flex
            w="90%"
            flexWrap="wrap"
            justifyContent={{ base: "center", md: "flex-start" }}
          >
            <Box flex={{ base: "100%", md: "5" }} mr={{ base: 0, md: 5 }}>
              <FormControl id="companyname" isRequired={true}>
                <FormLabel>Company Name</FormLabel>
                <Input type="text" placeholder="Enter Company's Full Name" />
              </FormControl>
            </Box>
            <Box flex={{ base: "100%", md: "5" }} ml={{ base: 0, md: 5 }}>
              <FormControl id="year" isRequired={true}>
                <FormLabel>Year of Establishment</FormLabel>
                <NumberInput>
                  <NumberInputField placeholder="yyyy" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </Box>
          </Flex>
          <br />
          <Box flex={5} w="90%">
            <FormControl isRequired={true}>
              <FormLabel>Location of the Company</FormLabel>
              <Flex
                w="100%"
                flexWrap="wrap"
                justifyContent={{ base: "center", md: "flex-start" }}
              >
                <Box flex={{ base: "100%", md: "5" }} mr={{ base: 0, md: 5 }}>
                  <FormControl>
                    <FormLabel htmlFor="state">State:</FormLabel>
                    <Select
                      id="state"
                      onChange={(e) => handleStateChange(e.target.value)}
                    >
                      <option value="">Select a state</option>
                      {states.map((state) => (
                        <option key={state.geonameId} value={state.geonameId}>
                          {state.name}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box
                  flex={{ base: "100%", md: "5" }}
                  mr={{ base: 0, md: 10 }}
                  ml={{ base: 0, md: 10 }}
                >
                  <FormControl>
                    <FormLabel htmlFor="city">City:</FormLabel>
                    <Select id="city">
                      <option value="">Select a city</option>
                      {cities.map((city) => (
                        <option key={city.geonameId} value={city.geonameId}>
                          {city.name}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box flex={{ base: "100%", md: "5" }} ml={{ base: 0, md: 5 }}>
                  <FormControl id="pincode" isRequired={true}>
                    <FormLabel>Pincode</FormLabel>
                    <Input type="number" placeholder="Enter Pincode" />
                  </FormControl>
                </Box>
              </Flex>
            </FormControl>
          </Box>
          <br />
          <Box flex={5} w="90%">
            <FormControl isRequired={true}>
              <FormLabel>Communication Person of the Company</FormLabel>
              <Flex
                w="100%"
                flexWrap="wrap"
                justifyContent={{ base: "center", md: "flex-start" }}
              >
                <Box flex={{ base: "100%", md: "5" }} mr={{ base: 0, md: 5 }}>
                  <FormControl id="name" isRequired={true}>
                    <FormLabel>Name</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter Name of Communication Person"
                    />
                  </FormControl>
                </Box>
                <Box
                  flex={{ base: "100%", md: "5" }}
                  mr={{ base: 0, md: 10 }}
                  ml={{ base: 0, md: 10 }}
                >
                  <FormControl id="email" isRequired={true}>
                    <FormLabel>Email</FormLabel>
                    <InputGroup>
                      <InputLeftElement>
                        <EmailIcon color="gray.300" />
                      </InputLeftElement>
                      <Input
                        type="email"
                        placeholder="Enter email of Communication Person"
                      />
                    </InputGroup>
                  </FormControl>
                </Box>
                <Box flex={{ base: "100%", md: "5" }} ml={{ base: 0, md: 5 }}>
                  <FormControl id="phoneno" isRequired={true}>
                    <FormLabel>Phone No</FormLabel>
                    <InputGroup>
                      <InputLeftElement>
                        <PhoneIcon color="gray.300" />
                      </InputLeftElement>
                      <Input type="tel" placeholder="Phone number" />
                    </InputGroup>
                  </FormControl>
                </Box>
              </Flex>
            </FormControl>
          </Box>
          <Flex
            flexWrap="wrap"
            justifyContent={{ base: "center", md: "flex-start" }}
            flex={5}
            w="90%"
          >
            <Box
              w={{ base: "90%", md: "23.5vw" }}
              mr={{ base: 0, md: "54.5vw" }}
            >
              <FormControl id="designation" isRequired={true}>
                <FormLabel>Designation of Communication Person</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter Degignation of Communication Person"
                />
              </FormControl>
            </Box>
          </Flex>
          <br />
          <Box flex={5} w="90%">
            <FormControl isRequired={true}>
              <FormLabel>Sectors to provide CSR</FormLabel>
              <Checkbox
                isChecked={checkedItems.length === sectorOptions.length}
                onChange={handleAllChecked}
                w="100%"
              >
                All Sectors
              </Checkbox>
              <Menu closeOnSelect={false}>
                <MenuButton
                  as={Button}
                  rightIcon={
                    isDropdownOpen ? <ChevronUpIcon /> : <ChevronDownIcon />
                  }
                  onClick={handleToggleDropdown}
                  display="flex"
                  justifyContent="flex-start"
                  isopen={isDropdownOpen} // Manually control the isOpen state
                >
                  Select Sector
                </MenuButton>
                <MenuList maxH="200px" overflowY="auto">
                  <CheckboxGroup
                    colorScheme="teal"
                    value={checkedItems}
                    onChange={handleSectorChange}
                  >
                    {sectorOptions.map((option) => (
                      <MenuItem key={option.value}>
                        <Checkbox value={option.value}>{option.label}</Checkbox>
                      </MenuItem>
                    ))}
                  </CheckboxGroup>
                </MenuList>
              </Menu>
            </FormControl>
          </Box>
          <br />
          <Box flex={5} w="90%">
            <FormControl id="certificate" isRequired={true}>
              <FormLabel>Company Registration Certificate</FormLabel>
              <Input type="file" p={1.5} accept="pdf/*" />
            </FormControl>
          </Box>
          <br />
          <Box flex={5} w="90%">
            <FormControl id="taxeligibility" isRequired={true}>
              <FormLabel>Tax Compliance Eligibility</FormLabel>
              <CheckboxGroup colorScheme="teal">
                <Stack spacing={[1, 3]} direction={["column", "row"]}>
                  <Checkbox value="80G">80 G (for 50% tax benefits)</Checkbox>
                  <Checkbox value="35AC">
                    35 AC (for 100% tax benefits)
                  </Checkbox>
                  <Checkbox value="12AA">
                    12 AA (Tax exemption for NGO income)
                  </Checkbox>
                  <Checkbox value="FCRA">
                    FCRA (Eligible for international funding)
                  </Checkbox>
                </Stack>
              </CheckboxGroup>
            </FormControl>
          </Box>
          <br />
          <br />
          <br />
          <Button
            colorScheme="teal"
            variant="solid"
            w={"10vw"}
            onClick={submitHandler}
          >
            Save
          </Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default EditProfile;

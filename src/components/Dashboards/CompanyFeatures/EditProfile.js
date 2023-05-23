import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
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
  useToast,
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
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [companyName, setCompanyName] = useState("");
  const [establishmentyear, setEstablishmentYear] = useState();
  const [personName, setPersonName] = useState();
  const [personEmail, setPersonEmail] = useState();
  const [personPhone, setPersonPhone] = useState();
  const [personDesignation, setPersonDesignation] = useState();
  const [userId, setUserId] = useState("");
  const [certificate, setCertificate] = useState();
  const [Sector, setSector] = useState([]);
  const [taxEligibility, setTaxEligibility] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [pincode, setPincode] = useState();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const getStates = async () => {
      const fetchedStates = await fetchStates();
      setStates(fetchedStates);
    };
    // Retrieve the user's ID from localStorage
    const token = localStorage.getItem("CompanyAuthToken");
    const decodedToken = jwt_decode(token);
    const userId = decodedToken._id;
    // Set the user's ID in the state variable
    setUserId(userId);
    getStates();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setCertificate(file);
  };
  const handleStateChange = async (stateId) => {
    const fetchedCities = await fetchCities(stateId);
    setCities(fetchedCities);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // if (
    //   !companyName ||
    //   !establishmentyear ||
    //   !personName ||
    //   !personEmail ||
    //   !personPhone ||
    //   !personDesignation ||
    //   !Sector.length ||
    //   !taxEligibility.length ||
    //   !pincode ||
    //   !cities.length ||
    //   (establishmentyear && establishmentyear.length !== 4) ||
    //   (personPhone && personPhone.length !== 10) ||
    //   !(pincode && pincode.length <= 10 && pincode.length >= 5) ||
    //   !(certificate && certificate.type === "application/pdf")
    // ) {
    //   // Display an error message or handle the validation error
    //   toast({
    //     title: "Please Fill all the Fields",
    //     status: "warning",
    //     duration: 5000,
    //     isClosable: true,
    //     position: "bottom",
    //   });
    //   setLoading(false);
    //   return;
    // }
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(personEmail)) {
    //   // Display an error message or handle the email validation error
    //   toast({
    //     title: "Please Enter a valid email",
    //     status: "warning",
    //     duration: 5000,
    //     isClosable: true,
    //     position: "bottom",
    //   });
    //   setLoading(false);
    //   return;
    // }
    try {
      const url = `http://localhost:4000/company/add-profile/${userId}`; // Replace with your API endpoint URL

      const formDataToSend = new FormData();
      formDataToSend.append("company_name", companyName);
      formDataToSend.append("city", cities);
      formDataToSend.append("state", states);
      formDataToSend.append("pincode", pincode);
      formDataToSend.append("establishment_year", establishmentyear);
      formDataToSend.append("cp_name", personName);
      formDataToSend.append("cp_email", personEmail);
      formDataToSend.append("cp_designation", personDesignation);
      formDataToSend.append("cp_phone", personPhone);
      formDataToSend.append("registration_certificate", certificate);
      Sector.forEach((sector, index) => {
        formDataToSend.append(`sectors[${index}]`, sector);
      });

      // Append each element of the 'taxEligibility' array individually to FormDataToSend
      taxEligibility.forEach((eligibility, index) => {
        formDataToSend.append(`taxEligibility[${index}]`, eligibility);
      });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await fetch(url, {
        method: "POST",
        headers: config.headers,
        body: formDataToSend
      })
      if (response.ok) {
        toast({
          title: "Registration Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
        navigate("/Company", { replace: true });
      } else {
        throw new Error("Failed to create Profile. Please try again.");
      }
    } catch (error) {
      // console.log(error.message);
      toast({
        title: "Error Occurred!",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return; // Prevent further execution
    }
  };

  const handleAllChecked = (e) => {
    const allChecked = e.target.checked;
    if (allChecked) {
      const allSectors = sectorOptions.map((option) => option.value);
      setSector(allSectors);
    } else {
      setSector([]);
    }
  };

  const handleSectorChange = (selectedItems) => {
    setSector(selectedItems);
  };

  const handleTaxEligibilityChange = (selectedValues) => {
    setTaxEligibility(selectedValues);
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
                <Input
                  type="text"
                  placeholder="Enter Company's Full Name"
                  value={companyName || ""}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </FormControl>
            </Box>
            <Box flex={{ base: "100%", md: "5" }} ml={{ base: 0, md: 5 }}>
              <FormControl id="year" isRequired={true}>
                <FormLabel>Year of Establishment</FormLabel>
                <NumberInput>
                  <NumberInputField
                    placeholder="yyyy"
                    value={establishmentyear || null}
                    onChange={(e) => setEstablishmentYear(e.target.value)}
                    maxLength={4}
                    minLength={4}
                  />
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
                    <Input
                      type="number"
                      placeholder="Enter Pincode"
                      value={pincode || null}
                      onChange={(e) => setPincode(e.target.value)}
                      minLength={5}
                      maxLength={10}
                    />
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
                      value={personName || ""}
                      onChange={(e) => setPersonName(e.target.value)}
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
                        value={personEmail || ""}
                        onChange={(e) => setPersonEmail(e.target.value)}
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
                      <Input
                        type="tel"
                        placeholder="Phone number"
                        value={personPhone || null}
                        onChange={(e) => setPersonPhone(e.target.value)}
                        minLength={10}
                        maxLength={10}
                      />
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
                  value={personDesignation || ""}
                  onChange={(e) => setPersonDesignation(e.target.value)}
                />
              </FormControl>
            </Box>
          </Flex>
          <br />
          <Box flex={5} w="90%">
            <FormControl isRequired={true}>
              <FormLabel>Sectors to provide CSR</FormLabel>
              <Checkbox
                isChecked={Sector.length === sectorOptions.length}
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
                  isopen={isDropdownOpen.toString()} // Manually control the isOpen state
                >
                  Select Sector
                </MenuButton>
                <MenuList maxH="200px" overflowY="auto">
                  <CheckboxGroup
                    colorScheme="teal"
                    value={Sector || []}
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
            <FormControl id="certificate" isRequired>
              <FormLabel>Company Registration Certificate</FormLabel>
              <Input
                type="file"
                p={1.5}
                accept="application/pdf"
                onChange={handleFileChange}
              />
            </FormControl>
          </Box>
          <br />
          <Box flex={5} w="90%">
            <FormControl id="taxeligibility" isRequired={true}>
              <FormLabel>Tax Compliance Eligibility</FormLabel>
              <CheckboxGroup
                colorScheme="teal"
                value={taxEligibility}
                onChange={handleTaxEligibilityChange}
              >
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
            isLoading={loading}
          >
            Save
          </Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default EditProfile;

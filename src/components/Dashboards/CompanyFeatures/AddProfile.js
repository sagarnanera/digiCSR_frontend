import React, { useEffect, useState } from "react";
// import jwt_decode from "jwt-decode";
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
  Tooltip,
  Textarea,
  IconButton,
} from "@chakra-ui/react";
import { sectorOptions } from "../../sectorData";
import { fetchStates, fetchCities, fetchStateName } from "../../geoData";
import {
  AddIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  EmailIcon,
  PhoneIcon,
} from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
// export const allFieldsContext = createContext();

const AddProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [companyName, setCompanyName] = useState("");
  const [CompanySummary, setCompanySummary] = useState("");
  const [rows, setRows] = useState(1);
  const [establishmentyear, setEstablishmentYear] = useState();
  const [personName, setPersonName] = useState();
  const [personEmail, setPersonEmail] = useState();
  const [personPhone, setPersonPhone] = useState();
  const [personDesignation, setPersonDesignation] = useState();
  const [certificate, setCertificate] = useState();
  const [Sector, setSector] = useState([]);
  const [taxEligibility, setTaxEligibility] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedstates, setselectedStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedcities, setselectedCities] = useState([]);
  const [pincode, setPincode] = useState();
  const [selectedSectorText, setSelectedSectorText] = useState("");
  const isSectorTextAreaVisible = true;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const [allfields, setAllfields] = useState(false);
  const [image, setImage] = useState("/user-avatar.jpg"); // State to store the selected image

  useEffect(() => {
    const getStates = async () => {
      const fetchedStates = await fetchStates();
      setStates(fetchedStates);
    };
    getStates();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setCertificate(file);
  };
  const handleStateChange = async (stateId) => {
    // console.log(states);
    const fetchedCities = await fetchCities(stateId);
    const fetchedstateName = await fetchStateName(stateId);
    setselectedStates(fetchedstateName);
    setCities(fetchedCities);
  };
  const handlecityChange = async (cityId) => {
    setselectedCities(cityId);
  };

  const handleAllChecked = (e) => {
    const allChecked = e.target.checked;
    if (allChecked) {
      const allSectors = sectorOptions.map((option) => option.label);
      setSector(allSectors);
    } else {
      setSector([]);
    }
  };

  const handleSectorChange = (selectedItems) => {
    setSector(selectedItems);
    setSelectedSectorText(selectedItems.join(", "));
  };

  const handleTaxEligibilityChange = (selectedValues) => {
    setTaxEligibility(selectedValues);
  };

  const handleToggleDropdown = () => {
    setIsDropdownOpen((prevIsDropdownOpen) => !prevIsDropdownOpen);
    // setIsSectorTextAreaVisible(!isSectorTextAreaVisible);
  };
  const handleChange = (event) => {
    setCompanySummary(event.target.value);
    const textareaLineHeight = 24; // Set the line height of the textarea
    const previousRows = event.target.rows;
    event.target.rows = 1; // Reset the rows to 1 to calculate the new height
    const currentRows = Math.ceil(
      event.target.scrollHeight / textareaLineHeight
    );
    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    } else {
      setRows(currentRows);
    }
    console.log(CompanySummary);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };

    if (file) {
      // Validate file type
      if (
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png"
      ) {
        // Validate file size
        if (file.size <= 150 * 1024) {
          // 150 KB in bytes
          reader.readAsDataURL(file);
          // console.log(image);
        } else {
          alert("Please select an image file smaller than 150 KB.");
        }
      } else {
        alert("Please select a JPEG, JPG, or PNG image file.");
      }
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    if (
      !companyName ||
      !establishmentyear ||
      !CompanySummary ||
      !personName ||
      !personEmail ||
      !personPhone ||
      !personDesignation ||
      !Sector.length ||
      !taxEligibility.length ||
      !pincode ||
      !selectedstates ||
      !selectedcities ||
      (establishmentyear && establishmentyear.length !== 4) ||
      (personPhone && personPhone.length !== 10) ||
      !(pincode && pincode.length <= 10 && pincode.length >= 5) ||
      !(certificate && certificate.type === "application/pdf")
    ) {
      // Display an error message or handle the validation error
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    } else {
      // setAllfields(true);
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(personEmail)) {
      // Display an error message or handle the email validation error
      toast({
        title: "Please Enter a valid email",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    try {
      const url = `http://localhost:4000/company/add-profile`; // Replace with your API endpoint URL
      const registrationCertificateFile = new File(
        [certificate],
        "registration_certificate.pdf"
      );
      const companyLogoFile = new File([image], "company_logo.jpg");
      const formData = new FormData();
      formData.append("company_name", companyName);
      formData.append("summary", CompanySummary);
      formData.append("city", selectedcities);
      formData.append("state", selectedstates);
      formData.append("pincode", pincode);
      formData.append("establishment_year", establishmentyear);
      formData.append("cp_name", personName);
      formData.append("cp_email", personEmail);
      formData.append("cp_designation", personDesignation);
      formData.append("cp_phone", personPhone);
      taxEligibility.forEach((tax) => {
        formData.append("tax_comp", tax);
      });
      Sector.forEach((sectorItem) => {
        formData.append("sectors", sectorItem);
      });
      formData.append("registration_certificate", registrationCertificateFile);
      formData.append("company_logo", companyLogoFile);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          authorization: localStorage.getItem("CompanyAuthToken"),
        },
        body: formData,
      });
      const data = await response.json();
      console.warn(data);
      if (response.ok) {
        toast({
          title: "Profile Edited Successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
        console.log(data);
        navigate("/Company", { replace: true });
      } else {
        console.warn(data);
        throw new Error("Failed to create Profile. Please try again.");
      }
    } catch (error) {
      console.log(error.message);
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

  return (
    // <allFieldsContext.Provider value={allfields}>
    <Container
      centerContent
      style={{
        zoom: "0.8",
        width: "120vw",
        backgroundImage: "url('../bg3.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        minWidth: "125vw",
      }}
    >
      <Box
        d="flex"
        textAlign="center"
        p={3}
        bg="#f2f2f2"
        w={{ base: "100%", md: "90vw" }}
        m="50px 0 0px 0"
        color={"White"}
        bgColor={"skyblue"}
      >
        <Text fontSize="3xl" fontFamily="Work sans">
          Company Profile
        </Text>
      </Box>
      <Box
        d="flex"
        textAlign="center"
        m="0px 0 0px 0"
        p={3}
        bg="white"
        w={{ base: "100%", md: "90vw" }}
        maxHeight="100vh" // Limit height to screen height
        overflowY="auto"
      >
        <VStack spacing={4} w="100%">
          <Flex
            w="95%"
            flexWrap="wrap"
            justifyContent={{ base: "center", md: "flex-start" }}
          >
            <Box mr={"1%"} mt={"2%"}>
              <label htmlFor="profile-image">
                <div
                  style={{
                    position: "relative",
                    width: "70px",
                    height: "70px",
                    marginTop: "5",
                    borderRadius: "50%",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={image || "/user-avatar.jpg"} // Replace "user-avatar.jpg" with your initial image source
                    alt="Profile"
                    style={{ width: "100%", height: "100%" }}
                  />
                  <input
                    type="file"
                    id="profile-image"
                    accept=".jpg,.jpeg,.png"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-4px",
                      right: "-4px",
                      zIndex: 1, // Increase the z-index value
                    }}
                  >
                    <label htmlFor="profile-image">
                      <IconButton
                        component="span"
                        size={"xs"}
                        colorScheme="blue"
                        color="primary"
                        aria-label="Add Photo"
                      >
                        <AddIcon />
                      </IconButton>
                    </label>
                  </div>
                </div>
              </label>
            </Box>

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
          {/* <br /> */}
          <Flex
            flexWrap="wrap"
            justifyContent={{ base: "center", md: "flex-start" }}
            flex={5}
            w="95%"
          >
            <FormControl id="Ngo" isRequired={true}>
              <FormLabel>Company Summary</FormLabel>

              <Textarea
                value={CompanySummary}
                rows={rows}
                onChange={handleChange}
                placeholder="Enter text..."
                resize="none"
              ></Textarea>
            </FormControl>
          </Flex>
          <br />
          <Box flex={5} w="95%">
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
                    <Select
                      id="city"
                      onChange={(e) => handlecityChange(e.target.value)}
                    >
                      <option value="">Select a city</option>
                      {cities.map((city) => (
                        <option key={city.geonameId} value={city.name}>
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
          <Box flex={5} w="95%">
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
              </Flex>
            </FormControl>
          </Box>
          <Flex
            flexWrap="wrap"
            justifyContent={{ base: "center", md: "flex-start" }}
            flex={5}
            w="95%"
          >
            <Box flex={{ base: "100%", md: "5" }} mr={{ base: 0, md: 5 }}>
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
            <Box
              flex={{ base: "100%", md: "5" }}
              mr={{ base: 0, md: 10 }}
              ml={{ base: 0, md: 10 }}
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
          <Box flex={5} w="95%">
            <FormControl isRequired>
              <FormLabel>Sectors to provide CSR</FormLabel>
              <Checkbox
                isChecked={Sector.length === sectorOptions.length}
                onChange={handleAllChecked}
                w="100%"
              >
                All Sectors
              </Checkbox>
              <Box>
                <Menu closeOnSelect={false}>
                  <MenuButton
                    as={Button}
                    w="100%"
                    rightIcon={
                      isDropdownOpen ? <ChevronUpIcon /> : <ChevronDownIcon />
                    }
                    onClick={handleToggleDropdown}
                    display="flex"
                    justifyContent="flex-start"
                    isOpen={isDropdownOpen.toString()}
                  >
                    Select Sector
                  </MenuButton>
                  <MenuList maxH="200px" overflowY="auto">
                    <CheckboxGroup
                      colorScheme="blue"
                      value={Sector}
                      onChange={handleSectorChange}
                    >
                      {sectorOptions.map((option) => (
                        <MenuItem key={option.value}>
                          <Checkbox id={option.id} value={option.label}>
                            {option.label}
                          </Checkbox>
                        </MenuItem>
                      ))}
                    </CheckboxGroup>
                  </MenuList>
                </Menu>
              </Box>
            </FormControl>
            {isSectorTextAreaVisible && (
              <Tooltip
                label={Sector.join(", ")}
                isDisabled={Sector.length <= 5}
              >
                <Textarea
                  placeholder="Selected Sectors"
                  isReadOnly
                  rows={rows}
                  onChange={handleChange}
                  height="fit-content"
                  textOverflow="ellipsis"
                  resize="none"
                  value={
                    Sector.length <= 5
                      ? selectedSectorText
                      : `${Sector.slice(0, 5)},..+${Sector.length - 5} more`
                  }
                ></Textarea>
              </Tooltip>
            )}
          </Box>
          <br />
          <Box flex={5} w="95%">
            <FormControl id="taxeligibility" isRequired={true}>
              <FormLabel>Tax Compliance Eligibility</FormLabel>
              <CheckboxGroup
                colorScheme="blue"
                value={taxEligibility}
                onChange={handleTaxEligibilityChange}
                size={"sm"}
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
          <Box flex={5} w="95%">
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
          <Button
            colorScheme="blue"
            bg="white"
            color="skyblue"
            width={"20%"}
            boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
            _hover={{ boxShadow: "0px 4px 6px skyblue" }}
            _active={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}
            onClick={submitHandler}
            isLoading={loading}
          >
            Save
          </Button>
        </VStack>
      </Box>
    </Container>
    // </allFieldsContext.Provider>
  );
};

export default AddProfile;

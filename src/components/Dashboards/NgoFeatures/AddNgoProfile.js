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
  Textarea,
  RadioGroup,
  Stack,
  Radio,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  Button,
  MenuList,
  CheckboxGroup,
  MenuItem,
  Checkbox,
  Tooltip,
  // WrapItem,
  useToast,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Table,
  TableCaption,
  Tbody,
  Tr,
  Td,
  Thead,
  Th,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
} from "@chakra-ui/react";
import {
  AddIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  DeleteIcon,
  EditIcon,
  PhoneIcon,
} from "@chakra-ui/icons";
import { fetchStates, fetchCities, fetchStateName } from "../../geoData";
import { sectorOptions } from "../../sectorData";
import { useNavigate } from "react-router-dom";
// export const allNgoFieldsContext = createContext();
import "../../../CSS/rfpTable.css";

const AddNgoProfile = () => {
  const navigate = useNavigate();
  const [NgoName, setNgoName] = useState("");
  const [NgoSummary, setNgoSummary] = useState("");
  const [rows, setRows] = useState(1);
  const [states, setStates] = useState([]);
  const [sector, setSector] = useState([]);
  const [CSRBudget, setCSRBudget] = useState();
  const [selectedStates, setSelectedStates] = useState([]);
  const [isSectorDropdownOpen, setIsSectorDropdownOpen] = useState(false);
  const [selectedStatesText, setSelectedStatesText] = useState("");
  const [selectedSectorText, setSelectedSectorText] = useState("");
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
  const toast = useToast();
  // const [allfields, setAllfields] = useState(false);
  const [boardMembers, setBoardMembers] = useState([]);
  const [image, setImage] = useState("/user-avatar.jpg"); // State to store the selected image
  const [showModal, setShowModal] = useState(false);
  const [currentMemberIndex, setCurrentMemberIndex] = useState(null);
  const [personPhone, setPersonPhone] = useState();
  const [establishmentyear, setEstablishmentYear] = useState(1);
  const [locationState, setlocationState] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedcities, setselectedCities] = useState([]);
  const [pincode, setPincode] = useState();
  const [imageURL, setImageURL] = useState("");

  const handleAddMember = () => {
    setShowModal(true);
    setBoardMembers((prevBoardMembers) => [
      ...prevBoardMembers,
      {
        name: "",
        gender: "",
        dinNumber: "",
        phoneNo: "",
        designation: "",
        isEditing: true, // Initially set to true to show the form fields
      },
    ]);
    setCurrentMemberIndex(boardMembers.length); // Set the current member index to the newly added member
  };

  const handleMemberChange = (index, field, value) => {
    setBoardMembers((prevBoardMembers) => {
      const updatedMembers = [...prevBoardMembers];
      updatedMembers[index][field] = value;
      return updatedMembers;
    });
  };

  const handleEditMember = (index) => {
    setShowModal(true);
    setCurrentMemberIndex(index);
    setBoardMembers((prevBoardMembers) => {
      const updatedMembers = [...prevBoardMembers];
      updatedMembers[index].isEditing = true; // Set isEditing to true to show the form fields
      return updatedMembers;
    });
  };

  const handleSaveMember = (index) => {
    const member = boardMembers[index];

    // Check if any of the fields have non-null values
    const hasValues = Object.values(member).some(
      (value) => value.trim() !== ""
    );

    if (!hasValues) {
      toast({
        title: "Please fill at least one field",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    setBoardMembers((prevBoardMembers) => {
      const updatedMembers = [...prevBoardMembers];
      updatedMembers[index].isEditing = false; // Set isEditing to false to show the text form
      return updatedMembers;
    });
    setShowModal(false);
  };
  const handleDeleteMember = (index) => {
    setBoardMembers((prevBoardMembers) => {
      const updatedMembers = [...prevBoardMembers];
      updatedMembers.splice(index, 1);
      return updatedMembers;
    });
  };

  const handleCloseModal = (currentMemberIndex) => {
    if (currentMemberIndex === boardMembers.length - 1) {
      const currentMember = boardMembers[currentMemberIndex];
      if (
        currentMember.name.trim() === "" &&
        currentMember.gender.trim() === "" &&
        currentMember.dinNumber.trim() === "" &&
        currentMember.phoneNo.trim() === "" &&
        currentMember.designation.trim() === ""
      ) {
        // Remove the current member from the boardMembers state
        setBoardMembers((prevBoardMembers) =>
          prevBoardMembers.slice(0, prevBoardMembers.length - 1)
        );
      }
    }
    setShowModal(false);
  };

  const handleChange = (event) => {
    setNgoSummary(event.target.value);
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
  };

  useEffect(() => {
    const getStatesAndCompanyId = async () => {
      const fetchedStates = await fetchStates();
      setStates(fetchedStates);
    };
    // const token = localStorage.getItem("NgoAuthToken");
    // const decodedToken = jwt_decode(token);
    // // Set the user's ID in the state variable
    // setUserId(decodedToken._id);
    getStatesAndCompanyId();
  }, []);

  const handleStateChange = (selectedItems) => {
    setSelectedStates(selectedItems);
    setSelectedStatesText(selectedItems.join(", "));
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
  const handlelocationStateChange = async (stateId) => {
    const fetchedCities = await fetchCities(stateId);
    const fetchedstateName = await fetchStateName(stateId);
    setlocationState(fetchedstateName);
    setCities(fetchedCities);
  };
  const handlecityChange = async (cityId) => {
    setselectedCities(cityId);
  };
  const handleSectorChange = (selectedItems) => {
    setSector(selectedItems);
    setSelectedSectorText(selectedItems.join(", "));
  };

  const handleToggleSectorDropdown = () => {
    setIsSectorDropdownOpen((prevIsDropdownOpen) => !prevIsDropdownOpen);
  };

  const handleToggleStateDropdown = () => {
    setIsStateDropdownOpen((prevIsDropdownOpen) => !prevIsDropdownOpen);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // const reader = new FileReader();
    const file1 = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImageURL(reader.result);
    };

    if (file1) {
      reader.readAsDataURL(file1);
    }
    // reader.onload = () => {
    //   setImage(reader.result);
    // };

    setImage(file);

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
          // reader.readAsDataURL(file);
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
      !NgoName ||
      !NgoSummary ||
      !sector ||
      !selectedStates ||
      !locationState ||
      !selectedcities ||
      (establishmentyear && establishmentyear.length !== 4) ||
      (personPhone && personPhone.length !== 10) ||
      !(pincode && pincode.length <= 10 && pincode.length >= 5) ||
      boardMembers.length === 0
    ) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      const logoData = new FormData();
      const ngoLogoFile = new File([image], "ngo_logo.jpg");
      logoData.append("file", ngoLogoFile);

      const logoUploadRes = await fetch(
        `http://localhost:4000/ngo/upload-logo`,
        {
          method: "POST",
          headers: {
            authorization: localStorage.getItem("CompanyAuthToken"),
          },
          body: logoData,
        }
      );
      const logoRes = await logoUploadRes.json();

      console.log(logoRes);

      // logo upload end

      const url = `http://localhost:4000/NGO/add-profile`;

      const formData = new FormData();
      // const ngoLogoFile = new File([image], "ngo_logo.jpg");

      formData.append("ngo_name", NgoName);
      formData.append("summary", NgoSummary);
      formData.append("csr_budget", CSRBudget);
      formData.append("city", selectedcities);
      formData.append("state", locationState);
      formData.append("pincode", pincode);
      formData.append("phone", personPhone);
      formData.append("establishment_year", establishmentyear);
      selectedStates.forEach((state) => {
        formData.append("operation_area", state);
      });

      sector.forEach((sectorItem) => {
        formData.append("sectors", sectorItem);
      });

      // Append each board member as a separate form field
      boardMembers.forEach((member, index) => {
        formData.append(`board_members[${index}][bm_name]`, member.name);
        formData.append(`board_members[${index}][bm_gender]`, member.gender);
        formData.append(`board_members[${index}][bm_din]`, member.dinNumber);
        formData.append(`board_members[${index}][bm_phone]`, member.phoneNo);
        formData.append(
          `board_members[${index}][bm_designation]`,
          member.designation
        );
      });
      // formData.append("ngo_logo", ngoLogoFile);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          authorization: `${localStorage.getItem("NgoAuthToken")}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        toast({
          title: "Profile Edited Successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        console.log(data);
        navigate("/Ngo", { replace: true });
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
      return; // Prevent further execution
    }
  };

  return (
    // <allNgoFieldsContext.Provider value={allfields}>
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
          Ngo Profile
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
        <VStack spacing={4} w="98%">
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
                  {imageURL ? (
                    <img
                      src={imageURL || "/user-avatar.jpg"} // Replace "user-avatar.jpg" with your initial image source
                      alt="Profile"
                      style={{ width: "100%", height: "100%" }}
                    />
                  ) : (
                    <img
                      src={image || "/user-avatar.jpg"} // Replace "user-avatar.jpg" with your initial image source
                      alt="Profile"
                      style={{ width: "100%", height: "100%" }}
                    />
                  )}
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
                  value={NgoName || ""}
                  onChange={(e) => setNgoName(e.target.value)}
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
          <Flex
            flexWrap="wrap"
            justifyContent={{ base: "center", md: "flex-start" }}
            flex={5}
            w="95%"
          >
            <FormControl id="Ngo" isRequired={true}>
              <FormLabel>Ngo Summary</FormLabel>

              <Textarea
                value={NgoSummary}
                rows={rows}
                onChange={handleChange}
                placeholder="Enter text..."
                resize="none"
              ></Textarea>
            </FormControl>
          </Flex>
          <br />
          <Flex
            flexWrap="wrap"
            justifyContent={{ base: "center", md: "flex-start" }}
            flex={5}
            w="95%"
          >
            <Box flex={{ base: "100%", md: "5" }} mr={{ base: 0, md: 5 }}>
              <FormControl id="AmountRfp" isRequired>
                <FormLabel>CSR Budget of this year</FormLabel>
                <Input
                  type="number"
                  placeholder="CSR Budget"
                  value={CSRBudget}
                  onChange={(e) => {
                    setCSRBudget(e.target.value);
                  }}
                />
              </FormControl>
            </Box>
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
                      onChange={(e) =>
                        handlelocationStateChange(e.target.value)
                      }
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

          <Flex
            flexWrap="wrap"
            justifyContent={{ base: "center", md: "flex-start" }}
            flex={5}
            w="95%"
          >
            <Box flex={{ base: "100%", md: "5" }} mr={{ base: 0, md: 5 }}>
              <FormControl isRequired={true}>
                <FormLabel>Area of operation</FormLabel>
                <Box>
                  <br />
                  <Menu closeOnSelect={false}>
                    <MenuButton
                      as={Button}
                      w="100%"
                      rightIcon={
                        isStateDropdownOpen ? (
                          <ChevronUpIcon />
                        ) : (
                          <ChevronDownIcon />
                        )
                      }
                      onClick={handleToggleStateDropdown}
                      display="flex"
                      justifyContent="flex-start"
                      isOpen={isStateDropdownOpen.toString()}
                    >
                      Select State
                    </MenuButton>

                    <MenuList maxH="200px" overflowY="auto">
                      <CheckboxGroup
                        colorScheme="blue"
                        value={selectedStates}
                        onChange={handleStateChange}
                      >
                        {states.map((state) => (
                          <MenuItem key={state.adminCode1}>
                            <Checkbox id={state.geonameId} value={state.name}>
                              {state.name}
                            </Checkbox>
                          </MenuItem>
                        ))}
                      </CheckboxGroup>
                    </MenuList>
                  </Menu>
                </Box>
              </FormControl>
              <Tooltip
                label={selectedStates.join(", ")}
                isDisabled={selectedStates.length <= 6}
              >
                <Textarea
                  placeholder="Selected States"
                  isReadOnly
                  rows={2}
                  height="fit-content"
                  textOverflow="ellipsis"
                  resize="none"
                  value={
                    selectedStates.length <= 6
                      ? selectedStatesText
                      : `${selectedStates.slice(0, 6)},..+${
                          selectedStates.length - 6
                        } more`
                  }
                ></Textarea>
              </Tooltip>
            </Box>
            <Box flex={{ base: "100%", md: "5" }} ml={{ base: 0, md: 5 }}>
              <FormControl isRequired={true}>
                <FormLabel>Development Sector</FormLabel>
                <Checkbox
                  isChecked={sector.length === sectorOptions.length}
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
                        isSectorDropdownOpen ? (
                          <ChevronUpIcon />
                        ) : (
                          <ChevronDownIcon />
                        )
                      }
                      onClick={handleToggleSectorDropdown}
                      display="flex"
                      justifyContent="flex-start"
                      isOpen={isSectorDropdownOpen.toString()}
                    >
                      Select Sector
                    </MenuButton>
                    <MenuList maxH="200px" overflowY="auto">
                      <CheckboxGroup
                        colorScheme="blue"
                        value={sector}
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
              <Tooltip
                label={sector.join(", ")}
                isDisabled={sector.length <= 5}
              >
                <Textarea
                  placeholder="Selected Sectors"
                  isReadOnly
                  rows={2}
                  height="fit-content"
                  textOverflow="ellipsis"
                  resize="none"
                  value={
                    sector.length <= 5
                      ? selectedSectorText
                      : `${sector.slice(0, 5)},..+${sector.length - 5} more`
                  }
                ></Textarea>
              </Tooltip>
            </Box>
          </Flex>
          <br />
          <Box flex={5} w="95%">
            <FormControl isRequired={true}>
              <FormLabel>Board Member's Of NGO</FormLabel>
              <div display={"flex"} justifyContent={"center"}>
                <Box>
                  {boardMembers.length !== 0 && (
                    <Table size="sm" variant={"simple"} colorScheme="blue">
                      <TableCaption>Member Details</TableCaption>
                      <Thead
                        style={{ background: "skyblue", marginBottom: "2rem" }}
                      >
                        <Tr>
                          <Th>Sr. No.</Th>
                          <Th>Member Name</Th>
                          <Th>Gender</Th>
                          <Th>DIN No.</Th>
                          <Th>Phone No.</Th>
                          <Th>Designation</Th>
                          <Th>Action</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {boardMembers.map((member, index) => (
                          <Tr>
                            <Td className="divider">{index + 1}</Td>
                            <Td className="divider">{member.name}</Td>
                            <Td className="divider">{member.gender}</Td>
                            <Td className="divider">{member.dinNumber}</Td>
                            <Td className="divider">{member.phoneNo}</Td>
                            <Td className="divider">{member.designation}</Td>
                            <Td>
                              <IconButton
                                aria-label="View proposal"
                                icon={<EditIcon />}
                                marginLeft="0.5rem"
                                variant={"ghost"}
                                onClick={() => handleEditMember(index)}
                                colorScheme="blue"
                                color={"blue"}
                              />
                              <IconButton
                                aria-label="Delete member"
                                icon={<DeleteIcon />}
                                marginLeft="0.5rem"
                                variant={"ghost"}
                                onClick={() => handleDeleteMember(index)}
                                colorScheme="red"
                                color={"red"}
                              />
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  )}
                </Box>
              </div>

              {boardMembers.map((member, index) => (
                <Box
                  key={index}
                  textAlign="center"
                  p={3}
                  bg="white"
                  w={{ base: "100%", md: "75vw" }}
                  m="10px 0 10px 0"
                >
                  {member.isEditing && index === currentMemberIndex && (
                    <Modal
                      isOpen={showModal}
                      onClose={() => handleCloseModal(currentMemberIndex)}
                      size={"sm"}
                    >
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>
                          {currentMemberIndex !== null
                            ? "Edit Member"
                            : "Add Member"}
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody style={{ zoom: "0.7" }}>
                          <FormControl isRequired={true} mb={3}>
                            <FormLabel>Name</FormLabel>
                            <Input
                              type="text"
                              placeholder="Enter Name of Communication Person"
                              value={
                                currentMemberIndex !== null
                                  ? boardMembers[currentMemberIndex].name
                                  : ""
                              }
                              onChange={(e) =>
                                handleMemberChange(
                                  currentMemberIndex,
                                  "name",
                                  e.target.value
                                )
                              }
                            />
                          </FormControl>
                          <FormControl isRequired={true} mb={3}>
                            <FormLabel>Gender</FormLabel>
                            <RadioGroup
                              value={
                                currentMemberIndex !== null
                                  ? boardMembers[currentMemberIndex].gender
                                  : ""
                              }
                              onChange={(value) =>
                                handleMemberChange(
                                  currentMemberIndex,
                                  "gender",
                                  value
                                )
                              }
                            >
                              <Stack direction="row">
                                <Radio value="Male">Male</Radio>
                                <Radio value="Female">Female</Radio>
                                <Radio value="Others">Others</Radio>
                              </Stack>
                            </RadioGroup>
                          </FormControl>
                          <FormControl isRequired={true} mb={3}>
                            <FormLabel>DIN Number</FormLabel>
                            <Input
                              type="number"
                              placeholder="DIN number"
                              value={
                                currentMemberIndex !== null
                                  ? boardMembers[currentMemberIndex].dinNumber
                                  : ""
                              }
                              onChange={(e) =>
                                handleMemberChange(
                                  currentMemberIndex,
                                  "dinNumber",
                                  e.target.value
                                )
                              }
                            />
                          </FormControl>
                          <FormControl isRequired={true} mb={3}>
                            <FormLabel>Phone No</FormLabel>
                            <InputGroup>
                              <InputLeftElement>
                                <PhoneIcon color="gray.300" />
                              </InputLeftElement>
                              <Input
                                type="tel"
                                placeholder="Phone number"
                                value={
                                  currentMemberIndex !== null
                                    ? boardMembers[currentMemberIndex].phoneNo
                                    : ""
                                }
                                onChange={(e) =>
                                  handleMemberChange(
                                    currentMemberIndex,
                                    "phoneNo",
                                    e.target.value
                                  )
                                }
                              />
                            </InputGroup>
                          </FormControl>
                          <FormControl isRequired={true} mb={3}>
                            <FormLabel>Designation</FormLabel>
                            <Input
                              type="text"
                              placeholder="Enter Designation of Communication Person"
                              value={
                                currentMemberIndex !== null
                                  ? boardMembers[currentMemberIndex].designation
                                  : ""
                              }
                              onChange={(e) =>
                                handleMemberChange(
                                  currentMemberIndex,
                                  "designation",
                                  e.target.value
                                )
                              }
                            />
                          </FormControl>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            colorScheme="blue"
                            onClick={() => handleSaveMember(currentMemberIndex)}
                          >
                            Save
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  )}
                </Box>
              ))}

              <Button
                colorScheme="blue"
                bg="white"
                color="skyblue"
                boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
                _hover={{ boxShadow: "0px 4px 6px skyblue" }}
                _active={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}
                onClick={handleAddMember}
              >
                Add Member
              </Button>
            </FormControl>
          </Box>

          <Button
            // colorScheme="blue"
            bg="skyblue"
            color="white"
            w={"15%"}
            mr={"5%"}
            boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
            _hover={{ boxShadow: "0px 4px 6px skyblue" }}
            _active={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}
            onClick={submitHandler}
          >
            save
          </Button>
        </VStack>
      </Box>
    </Container>
    // </allNgoFieldsContext.Provider>
  );
};

export default AddNgoProfile;

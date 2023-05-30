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
  WrapItem,
  Wrap,
  useToast,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  EditIcon,
  PhoneIcon,
} from "@chakra-ui/icons";
import { fetchStates } from "../../geoData";
import { sectorOptions } from "../../sectorData";
import { useNavigate } from "react-router-dom";
// export const allNgoFieldsContext = createContext();

const EditNgoProfile = () => {
  const navigate = useNavigate();
  const [NgoName, setNgoName] = useState("");
  const [NgoSummary, setNgoSummary] = useState("");
  const [rows, setRows] = useState(1);
  const [states, setStates] = useState([]);
  const [sector, setSector] = useState([]);
  const [CSRBudget, setCSRBudget] = useState();
  const [userId, setUserId] = useState("");
  const [selectedStates, setSelectedStates] = useState([]);
  const [isSectorDropdownOpen, setIsSectorDropdownOpen] = useState(false);
  const [isTextAreaVisible, setIsTextAreaVisible] = useState(false);
  const [isSectorTextAreaVisible, setIsSectorTextAreaVisible] = useState(false);
  const [selectedStatesText, setSelectedStatesText] = useState("");
  const [selectedSectorText, setSelectedSectorText] = useState("");
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [memberloading, setmemberLoading] = useState(false);
  const toast = useToast();
  // const [allfields, setAllfields] = useState(false);
  const [boardMembers, setBoardMembers] = useState([]);

  const handleAddMember = () => {
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
  };
  const handleMemberChange = (index, field, value) => {
    setBoardMembers((prevBoardMembers) => {
      const updatedMembers = [...prevBoardMembers];
      updatedMembers[index][field] = value;
      return updatedMembers;
    });
  };

  const handleEditMember = (index) => {
    setBoardMembers((prevBoardMembers) => {
      const updatedMembers = [...prevBoardMembers];
      updatedMembers[index].isEditing = true; // Set isEditing to true to show the form fields
      return updatedMembers;
    });
  };

  const handleSaveMember = (index) => {
    const member = boardMembers[index];
    if (
      member.name.trim() === "" ||
      member.gender.trim() === "" ||
      member.dinNumber.trim() === "" ||
      member.phoneNo.trim() === "" ||
      member.designation.trim() === ""
    ) {
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
    setBoardMembers((prevBoardMembers) => {
      const updatedMembers = [...prevBoardMembers];
      updatedMembers[index].isEditing = false; // Set isEditing to false to show the text form
      // console.log(boardMembers);
      return updatedMembers;
    });
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
    const token = localStorage.getItem("NgoAuthToken");
    const decodedToken = jwt_decode(token);
    // Set the user's ID in the state variable
    setUserId(decodedToken._id);
    getStatesAndCompanyId();
  }, []);

  useEffect(() => {
    setSelectedStatesText(selectedStates.join(", "));
  }, [selectedStates]);

  useEffect(() => {
    setSelectedSectorText(sector.join(", "));
  }, [sector]);

  const handleStateChange = (selectedItems) => {
    setSelectedStates(selectedItems);
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
  };

  const handleToggleSectorDropdown = () => {
    setIsSectorDropdownOpen((prevIsDropdownOpen) => !prevIsDropdownOpen);
    setIsSectorTextAreaVisible(!isSectorTextAreaVisible);
  };

  const handleToggleStateDropdown = () => {
    setIsStateDropdownOpen((prevIsDropdownOpen) => !prevIsDropdownOpen);
    setIsTextAreaVisible(!isTextAreaVisible);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (
      !NgoName ||
      !NgoSummary ||
      !sector ||
      !selectedStates ||
      boardMembers.length === 0
    ) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setmemberLoading(false);
      return;
    }

    try {
      const url = `http://localhost:4000/NGO/add-profile/${userId}`;

      const formattedBoardMembers = boardMembers.map((member) => ({
        bm_name: member.name,
        bm_gender: member.gender,
        bm_din: member.dinNumber,
        bm_phone: member.phoneNo,
        bm_designation: member.designation,
      }));
      console.log(
        NgoName,
        NgoSummary,
        formattedBoardMembers,
        CSRBudget,
        selectedStates,
        sector
      );
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          NGO_name: NgoName,
          summary: NgoSummary,
          board_members: formattedBoardMembers,
          csr_budget: CSRBudget,
          operation_area: selectedStates,
          sectors: sector,
        }),
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
        setLoading(false);
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
      setLoading(false);
      return; // Prevent further execution
    }
  };

  return (
    // <allNgoFieldsContext.Provider value={allfields}>
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
            Edit Ngo Profile
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
              flexWrap="wrap"
              justifyContent={{ base: "center", md: "flex-start" }}
              flex={5}
              w="95%"
            >
              <Box
                w={{ base: "90%", md: "33.5vw" }}
                mr={{ base: 0, md: "34.5vw" }}
              >
                <FormControl id="Ngo" isRequired={true}>
                  <FormLabel>Ngo Name</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter Ngo's Full Name"
                    value={NgoName || ""}
                    onChange={(e) => setNgoName(e.target.value)}
                  />
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
            <Box flex={5} w="95%">
              <FormControl isRequired={true}>
                <FormLabel>Board Member's Of NGO</FormLabel>
                {boardMembers.map((member, index) => (
                  <Box
                    key={index}
                    textAlign="center"
                    p={3}
                    bg="#f2f2f2"
                    w={{ base: "100%", md: "75vw" }}
                    m="10px 0 10px 0"
                  >
                    {member.isEditing ? (
                      <>
                        <FormControl isRequired={true} mb={3}>
                          <FormLabel>Name</FormLabel>
                          <Input
                            type="text"
                            placeholder="Enter Name of Communication Person"
                            value={member.name}
                            onChange={(e) =>
                              handleMemberChange(index, "name", e.target.value)
                            }
                          />
                        </FormControl>
                        <FormControl isRequired={true} mb={3}>
                          <FormLabel>Gender</FormLabel>
                          <RadioGroup
                            value={member.gender}
                            onChange={(value) =>
                              handleMemberChange(index, "gender", value)
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
                            value={member.dinNumber}
                            onChange={(e) =>
                              handleMemberChange(
                                index,
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
                              value={member.phoneNo}
                              onChange={(e) =>
                                handleMemberChange(
                                  index,
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
                            value={member.designation}
                            onChange={(e) =>
                              handleMemberChange(
                                index,
                                "designation",
                                e.target.value
                              )
                            }
                          />
                        </FormControl>
                        <Button
                          colorScheme="blue"
                          mt={4}
                          onClick={() => handleSaveMember(index)}
                          isLoading={memberloading}
                        >
                          Save
                        </Button>
                      </>
                    ) : (
                      <Box>
                        <Wrap
                          align="center"
                          justify="center"
                          spacing={3}
                          mb={-2}
                        >
                          <WrapItem>
                            <Text>
                              <strong>Name:</strong> {member.name}
                            </Text>
                          </WrapItem>
                          <WrapItem>
                            <Text>
                              <strong>Gender:</strong> {member.gender}
                            </Text>
                          </WrapItem>
                          <WrapItem>
                            <Text>
                              <strong>DIN Number:</strong> {member.dinNumber}
                            </Text>
                          </WrapItem>
                          <WrapItem>
                            <Text>
                              <strong>Phone No:</strong> {member.phoneNo}
                            </Text>
                          </WrapItem>
                          <WrapItem>
                            <Text>
                              <strong>Designation:</strong> {member.designation}
                            </Text>
                          </WrapItem>
                          <WrapItem>
                            <Button
                              colorScheme="teal"
                              size="sm"
                              ml={4}
                              onClick={() => handleEditMember(index)}
                            >
                              <EditIcon mr={1} /> Edit
                            </Button>
                          </WrapItem>
                        </Wrap>
                      </Box>
                    )}
                  </Box>
                ))}

                <Button colorScheme="blue" onClick={handleAddMember}>
                  Add Member
                </Button>
              </FormControl>
            </Box>
            <br />

            <Flex
              flexWrap="wrap"
              justifyContent={{ base: "center", md: "flex-start" }}
              flex={5}
              w="95%"
            >
              <Box
                w={{ base: "90%", md: "33.5vw" }}
                mr={{ base: 0, md: "34.5vw" }}
              >
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
            </Flex>
            <br />
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
                          colorScheme="teal"
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
                {isTextAreaVisible && (
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
                    >
                      {selectedStates.length <= 6
                        ? selectedStatesText
                        : `${selectedStates.slice(0, 6)},..+${
                            selectedStates.length - 6
                          } more`}
                    </Textarea>
                  </Tooltip>
                )}
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
                          colorScheme="teal"
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
                {isSectorTextAreaVisible && (
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
                    >
                      {sector.length <= 5
                        ? selectedSectorText
                        : `${sector.slice(0, 5)},..+${sector.length - 5} more`}
                    </Textarea>
                  </Tooltip>
                )}
              </Box>
            </Flex>
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
    // </allNgoFieldsContext.Provider>
  );
};

export default EditNgoProfile;

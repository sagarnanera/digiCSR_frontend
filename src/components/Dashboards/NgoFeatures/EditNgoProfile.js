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
  useToast,
  // HStack,
  Wrap,
  IconButton,
} from "@chakra-ui/react";
import {
  AddIcon,
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
  const [profileData, setProfileData] = useState(null);
  const toast = useToast();
  // const [allfields, setAllfields] = useState(false);
  const [boardMembers, setBoardMembers] = useState([]);
  const [image, setImage] = useState("/user-avatar.jpg"); // State to store the selected image

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
    const fetchCompanyProfile = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/NGO/profile/${userId}`
        );
        const data = await response.json();
        if (data.success) {
          setProfileData(data.data);
        } else {
          console.log(data.message);
          throw new Error("Failed to Get Profile.please Reload");
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchLogo = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/NGO/logo/${userId}`
        );

        const base64Data = await response.text();

        const byteCharacters = atob(base64Data.split(",")[1]);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);

        const blob = new Blob([byteArray], { type: "image/png" });
        const imageUrl = URL.createObjectURL(blob);
        setImage(imageUrl);
      } catch (error) {
        console.error(error);
      }
    };
    if (userId && userId !== "") {
      fetchLogo();
      fetchCompanyProfile(); // runs when id is non-empty string
    }
  }, [userId]);
  useEffect(() => {
    if (profileData) {
      setNgoName(profileData.NGO_name);
      setNgoSummary(profileData.profile.summary);
      setCSRBudget(profileData.profile.csr_budget);
      const defaultMembers = profileData.profile.board_members.map(
        (member) => ({
          name: member.bm_name,
          gender: member.bm_gender,
          dinNumber: member.bm_din,
          phoneNo: member.bm_phone,
          designation: member.bm_designation,
          isEditing: false, // Initially set to false to show the text form
        })
      );
      setBoardMembers(defaultMembers);
    }
  }, [profileData]);
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

      // const formattedBoardMembers = boardMembers.map((member) => ({
      //   bm_name: member.name,
      //   bm_gender: member.gender,
      //   bm_din: member.dinNumber,
      //   bm_phone: member.phoneNo,
      //   bm_designation: member.designation,
      // }));
      console.log(
        NgoName,
        NgoSummary,
        // formattedBoardMembers,
        CSRBudget,
        selectedStates,
        sector
      );
      const formData = new FormData();
      const ngoLogoFile = new File([image], "ngo_logo.jpg");
      
      formData.append("NGO_name", NgoName);
      formData.append("summary", NgoSummary);
      formData.append("csr_budget", CSRBudget);
      formData.append("operation_area", selectedStates);
      formData.append("sectors", sector);

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
      formData.append("ngo_logo", ngoLogoFile);
      const response = await fetch(url, {
        method: "POST",
        body: formData,
        // headers: {
        //   "Content-type": "application/json",
        // },
        // body: JSON.stringify({
        //   NGO_name: NgoName,
        //   summary: NgoSummary,
        //   board_members: formattedBoardMembers,
        //   csr_budget: CSRBudget,
        //   operation_area: selectedStates,
        //   sectors: sector,
        // }),
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
            <Box mr={"1%"}>
              <label htmlFor="profile-image">
                <div
                  style={{
                    position: "relative",
                    width: "100px",
                    height: "100px",
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
                      bottom: "8px",
                      right: "8px",
                      zIndex: 1, // Increase the z-index value
                    }}
                  >
                    <label htmlFor="profile-image">
                      <IconButton
                        component="span"
                        size={"xs"}
                        colorScheme="green"
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
            <Box
              w={{ base: "90%", md: "33.5vw" }}
              mr={{ base: 0, md: "34.5vw" }}
            >
              <FormControl id="Ngo" isRequired={true}>
                <FormLabel>Ngo Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter Ngo's Full Name"
                  defaultValue={NgoName || ""}
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
                defaultValue={NgoSummary}
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
              <Wrap spacing={10}>
                {boardMembers.map((member, index) => (
                  <Box
                    // ml={25}
                    key={index}
                    borderWidth="1px"
                    borderRadius="md"
                    p={4}
                    width="350px"
                  >
                    {!member.isEditing && (
                      <>
                        <Text mb={2}>
                          <strong>Member Name:</strong> {member.name}
                        </Text>
                        <Text mb={2}>
                          <strong>Gender:</strong> {member.gender}
                        </Text>
                        <Text mb={2}>
                          <strong>DIN:</strong> {member.dinNumber}
                        </Text>
                        <Text mb={2}>
                          <strong>Phone:</strong> {member.phoneNo}
                        </Text>
                        <Text mb={2}>
                          <strong>Designation:</strong> {member.designation}
                        </Text>
                        <Button
                          colorScheme="teal"
                          size="sm"
                          onClick={() => handleEditMember(index)}
                        >
                          <EditIcon mr={1} /> Edit
                        </Button>
                      </>
                    )}
                  </Box>
                ))}
              </Wrap>

              {boardMembers.map((member, index) => (
                <Box
                  key={index}
                  textAlign="center"
                  p={3}
                  bg="#f2f2f2"
                  w={{ base: "100%", md: "75vw" }}
                  // m="10px 0 0 0"
                >
                  {member.isEditing && (
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
                  defaultValue={CSRBudget}
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
                        defaultValue={selectedStates}
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
                        defaultValue={sector}
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

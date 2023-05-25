import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Container,
  FormControl,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  Textarea,
  VStack,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { sectorOptions } from "../../sectorData";
import { useNavigate } from "react-router-dom";
import { fetchStates } from "../../geoData";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import CompanyNavigation from "../companyNavigation";

function RaiseRFP() {
  const navigate = useNavigate();
  const [title, setTitle] = useState();
  const [AmountRfp, setAmountRfp] = useState();
  const [Sector, setSector] = useState([]);
  const [timeline, setTimeline] = useState();
  const [states, setStates] = useState([]);
  const [selectedStates, setSelectedStates] = useState([]);
  const [isSectorDropdownOpen, setIsSectorDropdownOpen] = useState(false);
  const [isTextAreaVisible, setIsTextAreaVisible] = useState(false);
  const [isSectorTextAreaVisible, setIsSectorTextAreaVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedStatesText, setSelectedStatesText] = useState("");
  const [selectedSectorText, setSelectedSectorText] = useState("");
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const getStates = async () => {
      const fetchedStates = await fetchStates();
      setStates(fetchedStates);
    };
    getStates();
  }, []);

  useEffect(() => {
    setSelectedStatesText(selectedStates.join(", "));
  }, [selectedStates]);

  useEffect(() => {
    setSelectedSectorText(Sector.join(", "));
  }, [Sector]);

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

  const submitHandler = async () => {
    console.log(selectedStates, states, Sector);
    setLoading(true);
    if (
      !title ||
      !AmountRfp ||
      !Sector ||
      !timeline ||
      !selectedStates ||
      !(timeline > 12)
    ) {
      toast({
        title: "Please Fill all the Fields properly",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await fetch("http://localhost:4000/add-rfp", {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify({
          title,
          AmountRfp,
          Sector,
          timeline,
          selectedStates,
        }),
      });

      if (response.ok) {
        toast({
          title: "RFp Raised Successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        navigate("/Company/TrackRPF", { replace: true });
        setLoading(false);
      } else {
        throw new Error("Failed to rfp request. Please try again.");
      }
    } catch (error) {
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
    <div>
      <CompanyNavigation />
      <Container maxW="xl">
        <Box
          d="flex"
          textAlign={"center"}
          p={3}
          bg="white"
          w="100%"
          m="70px 0 15px 0"
          borderRadius="lg"
          borderWidth="1px"
        >
          <Text fontSize="4xl" fontFamily="Work sans">
            Raise RFP Request
          </Text>
        </Box>
        <Box p={4} bg="white" w="100%" borderRadius="lg" borderWidth="1px">
          <VStack spacing={"5px"}>
            <FormControl id="RFPTitle" isRequired>
              <FormLabel>RFP Title</FormLabel>
              <Input
                placeholder={"Enter Title for RFP"}
                value={title || ""}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>
            {/* ---------------------------------------------------------- */}
            <FormControl id="AmountRfp" isRequired>
              <FormLabel>Amount of RFP</FormLabel>
              <Input
                type={"number"}
                placeholder={"Amount of RFP"}
                value={AmountRfp || null}
                onChange={(e) => setAmountRfp(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired={true}>
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
                    w={"100%"}
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
                    isopen={isSectorDropdownOpen.toString()} // Manually control the isOpen state
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
                  rows={2}
                  height={"fit-content"}
                  textOverflow="ellipsis"
                  resize={"none"}
                >
                  {Sector.length <= 5
                    ? selectedSectorText
                    : `${Sector.slice(0, 5)},..+${Sector.length - 5} more`}
                </Textarea>
              </Tooltip>
            )}
            <FormControl id="timeline" isRequired={true}>
              <FormLabel>Timeline for money utilization</FormLabel>
              <NumberInput>
                <NumberInputField
                  placeholder="mm (least value should be of 12 months)"
                  minLength={2}
                  value={timeline || 12}
                  onChange={(e) => setTimeline(e.target.value)}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl isRequired={true}>
              <FormLabel>States</FormLabel>
              <Box>
                <Menu closeOnSelect={false}>
                  <MenuButton
                    as={Button}
                    w={"100%"}
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
                    isopen={isStateDropdownOpen.toString()} // Manually control the isOpen state
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
                  height={"fit-content"}
                  textOverflow="ellipsis"
                  resize={"none"}
                >
                  {selectedStates.length <= 6
                    ? selectedStatesText
                    : `${selectedStates.slice(0, 6)},..+${
                        selectedStates.length - 6
                      } more`}
                </Textarea>
              </Tooltip>
            )}
            <Button
              colorScheme="blue"
              w={"100%"}
              onClick={submitHandler}
              style={{ marginTop: 15 }}
              isLoading = {loading}
            >
              Raise Request
            </Button>
          </VStack>
        </Box>
      </Container>
    </div>
  );
}

export default RaiseRFP;

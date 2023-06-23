import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
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
  Textarea,
  VStack,
  Tooltip,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { fetchStates } from "../../geoData";
import { sectorOptions } from "../../sectorData";
import RaiseConfirmationDialog from "./RFPRaiseAlert";
// import jwt_decode from "jwt-decode";

function RaiseRFP({ onClose, onRFPRaised }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [amountRfp, setAmountRfp] = useState("");
  const [sector, setSector] = useState([]);
  const [timeline, setTimeline] = useState("");
  const [states, setStates] = useState([]);
  const [selectedStates, setSelectedStates] = useState([]);
  const [isSectorDropdownOpen, setIsSectorDropdownOpen] = useState(false);
  // const [isTextAreaVisible, setIsTextAreaVisible] = useState(false);
  // const [isSectorTextAreaVisible, setIsSectorTextAreaVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedStatesText, setSelectedStatesText] = useState("");
  const [selectedSectorText, setSelectedSectorText] = useState("");
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

  // const [company, setCompany] = useState("");
  const toast = useToast();

  useEffect(() => {
    const getStatesAndCompanyId = async () => {
      const fetchedStates = await fetchStates();
      setStates(fetchedStates);
      // const token = localStorage.getItem("CompanyAuthToken");
      // const decodedToken = await jwt_decode(token);
      // setCompany(decodedToken._id);
    };
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

  const handleRaiseRFP = () => {
    setIsAlertDialogOpen(true);
  };

  const handleRaiseConfirmation = async () => {
    setIsAlertDialogOpen(false);
    setLoading(true);
    if (
      !title ||
      !amountRfp ||
      sector.length === 0 ||
      !timeline ||
      !selectedStates ||
      Number(timeline) <= 12
    ) {
      toast({
        title: "Please fill all the fields properly",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const result = localStorage.getItem("CompanyAuthToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          authorization: result,
        },
      };
      const response = await fetch("http://localhost:4000/add-rfp", {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify({
          title,
          amount: amountRfp,
          timeline,
          sectors: sector,
          states: selectedStates,
        }),
      });
      console.log(1);

      console.log(2);
      if (response.ok) {
        toast({
          title: "RFP Raised Successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        onClose();
        onRFPRaised();
        navigate("/Company/TrackRFP", { replace: true });
        setLoading(false);
      } else {
        console.warn(response);
        throw new Error("Failed to raise RFP request. Please try again.");
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
      return;
    }
  };

  const handleRaiseCancel = () => {
    setIsAlertDialogOpen(false);
  };

  return (
    <Modal isOpen={true} onClose={onClose} size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader display={"flex"} justifyContent={"center"}>
          Raise RFP Request
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody
          style={{
            zoom: "0.75",
          }}
        >
          <VStack spacing={5}>
            <FormControl id="RFPTitle" isRequired>
              <FormLabel>RFP Title</FormLabel>
              <Input
                placeholder="Enter Title for RFP"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>
            <FormControl id="AmountRfp" isRequired>
              <FormLabel>Amount of RFP</FormLabel>
              <Input
                type="number"
                placeholder="Amount of RFP"
                value={amountRfp}
                onChange={(e) => setAmountRfp(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Sectors to provide CSR</FormLabel>
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
                    mb={-5}
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
            <Tooltip label={sector.join(", ")} isDisabled={sector.length <= 5}>
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
            <FormControl id="timeline" isRequired>
              <FormLabel>
                Timeline for money utilization(least value should be of 12
                months)
              </FormLabel>
              <NumberInput>
                <NumberInputField
                  placeholder="mm"
                  minLength={2}
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>States</FormLabel>
              <Box>
                <Menu closeOnSelect={false}>
                  <MenuButton
                    as={Button}
                    w="100%"
                    mb={-5}
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
            <Button
              type="submit"
              colorScheme="blue"
              w="100%"
              onClick={handleRaiseRFP}
              style={{ marginTop: 15 }}
              isLoading={loading}
            >
              Raise Request
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
      {isAlertDialogOpen && (
        <RaiseConfirmationDialog
          isOpen={isAlertDialogOpen}
          onClose={handleRaiseCancel}
          onDelete={handleRaiseConfirmation}
        />
      )}
    </Modal>
  );
}

export default RaiseRFP;

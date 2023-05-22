import React, { useState, createContext } from "react";
// import "../App.css";
import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Text,
  Select,
  VStack,
} from "@chakra-ui/react";
import CompanyAuth from "../pages/Authentication/companyAuth";
import NgoAuth from "../pages/Authentication/NgoAuth";
import BenificiaryAuth from "../pages/Authentication/benificiaryAuth";
export const SelectedOptionContext = createContext();

const ChooseUserComponent = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <SelectedOptionContext.Provider value={selectedOption}>
      <Container maxW="xl">
        <Box
          d="flex"
          textAlign={"center"}
          p={3}
          bg="white"
          w="100%"
          m="100px 0 15px 0"
          borderRadius="lg"
          borderWidth="1px"
        >
          <Text fontSize="4xl" fontFamily="Work sans">
            DigiCSR
          </Text>
        </Box>
        <Box p={4} bg="white" w="100%" borderRadius="lg" borderWidth="1px">
          {selectedOption ? (
            <div>
              {selectedOption === "Company" && <CompanyAuth />}
              {selectedOption === "Benificiary" && <BenificiaryAuth />}
              {selectedOption === "NGO" && <NgoAuth />}
            </div>
          ) : (
            <VStack>
              <FormControl id="email" isRequired>
                <FormLabel>Register or Login As:</FormLabel>
                <Select value={selectedOption} onChange={handleOptionChange}>
                  <option value="">Select an option</option>
                  <option value="Company">Company</option>
                  <option value="NGO">NGO</option>
                  <option value="Benificiary">
                    Benificiary or Common User
                  </option>
                </Select>
              </FormControl>
            </VStack>
          )}
        </Box>
      </Container>
    </SelectedOptionContext.Provider>
  );
};

export default ChooseUserComponent;

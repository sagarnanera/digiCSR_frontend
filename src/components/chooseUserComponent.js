import React, { useState, createContext } from "react";
import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Text,
  RadioGroup,
  Radio,
  HStack,
} from "@chakra-ui/react";
import CompanyAuth from "../pages/Authentication/companyAuth";
import NgoAuth from "../pages/Authentication/NgoAuth";
import BenificiaryAuth from "../pages/Authentication/benificiaryAuth";

export const SelectedOptionContext = createContext();

const ChooseUserComponent = () => {
  const [selectedOption, setSelectedOption] = useState("Company");

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  return (
    <SelectedOptionContext.Provider value={selectedOption}>
      <div
        style={{
          backgroundImage: "url('bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          minWidth: "100vw"
        }}
      >
        <Container
          maxW="xl"
          style={{
            zoom: "0.75",
            width: "125vw",
          }}
          backdropBlur={"lg"}
        >
          <Box
            d="flex"
            textAlign="center"
            p={3}
            bg="white"
            w="100%"
            m="150px 0 0 0"
            // borderRadius="lg"
            borderWidth="1px"
            backgroundColor={"skyblue"}
          >
            <Text fontSize="3xl" fontFamily="Work Sans" color={"white"}>
              DigiCSR
            </Text>
          </Box>
          <Box p={4} bg="rgba(255, 255, 255, 0.1)" w="100%" borderWidth="1px">
            <FormControl id="registerAs" isRequired>
              <FormLabel>Register or Login As:</FormLabel>
              <RadioGroup
                value={selectedOption}
                onChange={(value) => handleOptionChange(value)}
              >
                <HStack align="start" spacing={10}>
                  <Radio value="Company">Company</Radio>
                  <Radio value="Ngo">NGO</Radio>
                  <Radio value="Benificiary">Benificiary or Common User</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
            <br />
            <br />
            {selectedOption && (
              <div>
                {selectedOption === "Company" && <CompanyAuth />}
                {selectedOption === "Benificiary" && <BenificiaryAuth />}
                {selectedOption === "Ngo" && <NgoAuth />}
              </div>
            )}
          </Box>
        </Container>
      </div>
    </SelectedOptionContext.Provider>
  );
};

export default ChooseUserComponent;

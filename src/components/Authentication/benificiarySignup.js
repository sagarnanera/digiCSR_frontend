import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  PinInput,
  PinInputField,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { PhoneIcon } from "@chakra-ui/icons";

function BenificiarySignup() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState();
  const [aadharNo, setAadharNo] = useState();
  const [otp, setOtp] = useState();
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showSignupButton, setShowSignupButton] = useState(false);
  const [showOtpButton, setShowOtpButton] = useState(true);

  const handleSendOtp = () => {
    setShowOtpInput(true);
    setShowOtpButton(false);
    setShowSignupButton(true);
  };
  const handleAadharKeyPress = (e) => {
    const maxLength = 16; // Set your desired maxLength value
    const inputValue = e.target.value;

    if (inputValue.length === maxLength) {
      e.preventDefault();
    }
  };

  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const submitHandler = async () => {
    // Handle the form submission
  };

  return (
    <VStack spacing={"5px"}>
      <FormControl id="user-name" isRequired>
        <FormLabel>UserName</FormLabel>
        <Input
          placeholder={"Enter User Name"}
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type={"email"}
          placeholder={"Enter Email (e.g., abc@abc.com)"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="phone" isRequired>
        <FormLabel>Phone Number</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <PhoneIcon color="gray.300" />
          </InputLeftElement>
          <Input
            type="tel"
            placeholder="Phone number"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
          />
        </InputGroup>
      </FormControl>

      <FormControl id="aadhar" isRequired>
        <FormLabel>Aadhar Card Number</FormLabel>
        <Input
          type={"number"}
          placeholder={"Enter Your Aadhar Card No"}
          value={aadharNo}
          onChange={(e) => setAadharNo(e.target.value)}
          onKeyPress={handleAadharKeyPress}
        />
      </FormControl>

      {showOtpButton && (
        <Button
          colorScheme="orange"
          w={"100%"}
          style={{ marginTop: 15 }}
          onClick={handleSendOtp}
        >
          Send Otp
        </Button>
      )}
      {showOtpInput && (
        <FormControl id="otp" isRequired>
          <FormLabel>Otp</FormLabel>
          <PinInput otp value={otp} onChange={handleOtpChange}>
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
        </FormControl>
      )}

      {showSignupButton && (
        <Button
          colorScheme="orange"
          w={"100%"}
          style={{ marginTop: 15 }}
          onClick={submitHandler}
        >
          Sign Up
        </Button>
      )}
    </VStack>
  );
}

export default BenificiarySignup;

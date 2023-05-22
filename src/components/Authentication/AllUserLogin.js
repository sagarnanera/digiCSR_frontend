import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { PinInput, PinInputField } from "@chakra-ui/react";

function AllUserLogin() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState();
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showSignupButton, setShowSignupButton] = useState(false);
  const [showOtpButton, setShowOtpButton] = useState(true);

  const handleSendOtp = () => {
    setShowOtpInput(true);
    setShowOtpButton(false);
    setShowSignupButton(true);
  };

  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const submitHandler = async () => {
    // Handle the form submission
  };

  return (
    <VStack spacing={"5px"}>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="Enter Email (e.g., abc@abc.com)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          Login
        </Button>
      )}
    </VStack>
  );
}

export default AllUserLogin;

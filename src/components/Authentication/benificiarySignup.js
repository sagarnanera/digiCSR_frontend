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
  useToast,
} from "@chakra-ui/react";
import { PhoneIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

function BenificiarySignup() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState();
  const [aadharNo, setAadharNo] = useState();
  const [otp, setOtp] = useState();
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showSignupButton, setShowSignupButton] = useState(false);
  const [showOtpButton, setShowOtpButton] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
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
  const handleSendOtp = async () => {
    setShowOtpInput(false);
    setOtp();
    setLoading(true);
    if (!userName || !email || !phoneNo || !aadharNo) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
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
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await fetch("http://localhost:4000/Beneficiary/signup", {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify({
          name: userName,
          email: email,
          mobile_no: phoneNo,
          aadhar_no: aadharNo,
        }),
      });

      if (response.ok) {
        toast({
          title: "Otp Sent Successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
        setShowOtpInput(true);
        setShowOtpButton(false);
        setShowSignupButton(true);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
        toast({
          title: "Error Occurred!",
          description: errorMessage,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
      }
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to send OTP. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!otp) {
      toast({
        title: "Please Fill the otp Fields",
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

      const response = await fetch("http://localhost:4000/Beneficiary/verify", {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify({
          name: userName,
          email: email,
          mobile_no: phoneNo,
          aadhar_no: aadharNo,
          otp: otp,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const { result } = data;
        toast({
          title: "Registration Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        localStorage.setItem("BenificiaryAuthToken", result);

        // TODO : get the userData from the server and save it into context

        setLoading(false);
        navigate("/Benificiary", { replace: true });
      } else {
        throw new Error("Failed to verify. Please try again.");
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
          colorScheme="blue"
          w={"100%"}
          style={{ marginTop: 15 }}
          onClick={handleSendOtp}
          isLoading={loading}
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
          colorScheme="blue"
          w={"100%"}
          style={{ marginTop: 15 }}
          onClick={submitHandler}
          isLoading={loading}
        >
          Sign Up
        </Button>
      )}
    </VStack>
  );
}

export default BenificiarySignup;

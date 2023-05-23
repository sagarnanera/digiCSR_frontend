import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { PinInput, PinInputField } from "@chakra-ui/react";
// import { SelectedOptionContext } from "../chooseUserComponent";
// import { useNavigate } from "react-router-dom";

function AllUserLogin() {
  // const selectedOption = useContext(SelectedOptionContext);
  // const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState();
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showSignupButton, setShowSignupButton] = useState(false);
  const [showOtpButton, setShowOtpButton] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSendOtp = async () => {
    setShowOtpInput(false);
    setOtp();
    setLoading(true);

    if (!email || email.trim() === "") {
      toast({
        title: "Please fill in all the fields",
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
      toast({
        title: "Please enter a valid email",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/company/login", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });


      if (response.ok) {
        toast({
          title: "OTP Sent Successfully",
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
        description: "Failed to send OTP. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
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

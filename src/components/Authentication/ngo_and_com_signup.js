import React, { useState, useContext } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  PinInput,
  PinInputField,
  useToast,
} from "@chakra-ui/react";
import { SelectedOptionContext } from "../chooseUserComponent";
import { useNavigate } from "react-router-dom";

function NgoAndComSignup() {
  const selectedOption = useContext(SelectedOptionContext);
  const navigate = useNavigate();
  const [cin, setCin] = useState();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState();
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showSignupButton, setShowSignupButton] = useState(false);
  const [showOtpButton, setShowOtpButton] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const toast = useToast();

  const handleSendOtp = async () => {
    setShowOtpInput(false);
    setOtp();
    setLoading(true);
    if (!cin || !email) {
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
    if (selectedOption === "Company") {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        const response = await fetch("http://localhost:4000/company/signup", {
          method: "POST",
          headers: config.headers,
          body: JSON.stringify({
            cin,
            email,
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
    } else if (selectedOption === "Ngo") {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        const response = await fetch("http://localhost:4000/ngo/signup", {
          method: "POST",
          headers: config.headers,
          body: JSON.stringify({
            csr: cin,
            email: email,
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
    }
  };

  const submitHandler = async () => {
    if (selectedOption === "Company") {
      setLoading(true);
      if (!cin || !email || !otp) {
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

      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        const response = await fetch("http://localhost:4000/company/verify", {
          method: "POST",
          headers: config.headers,
          body: JSON.stringify({
            cin,
            email,
            otp,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          toast({
            title: "Registration Successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          localStorage.setItem("CompanyAuthToken", JSON.stringify(data));
          setLoading(false);
          navigate("/Company/editprofile", { replace: true });
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
    } else if (selectedOption === "Ngo") {
      setLoading(true);
      if (!cin || !email || !otp) {
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

      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        const response = await fetch("http://localhost:4000/ngo/verify", {
          method: "POST",
          headers: config.headers,
          body: JSON.stringify({
            csr: cin,
            email: email,
            otp: otp,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          toast({
            title: "Registration Successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          localStorage.setItem("NgoAuthToken", JSON.stringify(data));
          setLoading(false);
          navigate("/Ngo/editprofile", { replace: true });
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
        return;
      }
    }
  };

  return (
    <VStack spacing={"5px"}>
      <FormControl id="CRN" isRequired>
        <FormLabel>CRN Number</FormLabel>
        <Input
          type={"text"}
          placeholder={"Enter CRN Number"}
          value={cin || ""}
          maxLength={21}
          onChange={(e) => setCin(e.target.value)}
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
          <PinInput otp value={otp} onChange={(value) => setOtp(value)}>
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
          isLoading={loading}
        >
          Sign Up
        </Button>
      )}
      {showOtpInput && <Button onClick={handleSendOtp}>Send OTP Again</Button>}
    </VStack>
  );
}

export default NgoAndComSignup;

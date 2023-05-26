import React, { useState, useEffect } from "react";
import CompanyNavigation from "../companyNavigation";
import { Button, Box, Heading, Text, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const ShowProfile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [companyId, setCompanyId] = useState("");
  const toast = useToast();

  useEffect(() => {
    const token = localStorage.getItem("CompanyAuthToken");
    const decodedToken = jwt_decode(token);
    setCompanyId(decodedToken._id);
  }, []);

  const fetchCompanyProfile = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/company/profile/${companyId}`
      );
      const data = await response.json();
      if (data.success) {
        setProfileData(data.data);
      } else {
        console.log(data.message);
        throw new Error("Failed to Get Profile.please Reload");
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
    }
  };

  useEffect(() => {
    fetchCompanyProfile();
  });

  const fetchCertificate = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/company/certificate/${companyId}`
      );
      if (response.ok) {
        const blob = await response.blob();
        // Use the blob as needed, such as downloading the file
        const url = URL.createObjectURL(blob);

        // Create a temporary link element
        const link = document.createElement("a");
        link.href = url;
        link.download = "certificate.pdf"; // Set the desired filename for the download
        link.click();

        // Clean up the URL and remove the link element
        URL.revokeObjectURL(url);
        link.remove();
      } else {
        const data = await response.json();
        console.log(data.message);
        throw new Error("Failed to Download Certificate.");
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
    }
  };

  const submitHandler = async () => {
    navigate("/Company/editprofile", { replace: true });
  };

  return (
    <div p={4}>
      <CompanyNavigation />
      <Box
        maxW="80vw"
        mx="auto"
        mt={8}
        borderWidth="1px"
        p={4}
        bg={"white"}
        borderRadius="md"
        boxShadow="md"
      >
        {profileData ? (
          <>
            <Heading size="lg" mb={4}>
              Company Profile
            </Heading>
            <Text fontSize="xl">
              <strong>Company Name:</strong> {profileData.company_name}
            </Text>
            <Text fontSize="xl">
              <strong>Email:</strong> {profileData.email}
            </Text>
            <Text mt={4} fontSize="xl">
              <strong>Profile:</strong>
            </Text>
            <Box pl={4} mt={2}>
              <Text fontSize="lg">
                <strong>Location:</strong>{" "}
                {`${profileData.profile.location.city}, ${profileData.profile.location.state}, ${profileData.profile.location.pincode}`}
              </Text>
              <Text fontSize="lg">
                <strong>Establishment Year:</strong>{" "}
                {profileData.profile.establishment_year}
              </Text>
              <Text fontSize="lg">
                <strong>Communication Person:</strong>{" "}
                {`${profileData.profile.comunication_person.cp_name} (${profileData.profile.comunication_person.cp_designation})`}
              </Text>
              <Text fontSize="lg">
                <strong>Email (Communication Person):</strong>{" "}
                {profileData.profile.comunication_person.cp_email}
              </Text>
              <Text fontSize="lg">
                <strong>Phone (Communication Person):</strong>{" "}
                {profileData.profile.comunication_person.cp_phone}
              </Text>
              <Text fontSize="lg">
                <strong>Tax Comp:</strong> {profileData.profile.tax_comp}
              </Text>
              <Text fontSize="lg">
                <strong>Sectors:</strong> {profileData.profile.sectors}
              </Text>
              <Button
                colorScheme="teal"
                w={"20vw"}
                mt={6}
                onClick={submitHandler}
              >
                Edit Profile
              </Button>
              <br />
              <br />
              <Text fontSize="lg">
                <strong>Company Registration Certificate:</strong>
              </Text>
              <Button
                colorScheme="blue"
                w={"20vw"}
                mt={6}
                onClick={fetchCertificate}
              >
                Download Certificate
              </Button>
            </Box>
          </>
        ) : (
          <Text>Loading profile data...</Text>
        )}
      </Box>
    </div>
  );
};

export default ShowProfile;

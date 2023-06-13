import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Heading,
  Text,
  IconButton,
  useToast,
  HStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { CloseIcon } from "@chakra-ui/icons";
import jwt_decode from "jwt-decode";
import CompanyNavigation from "../companyNavigation";

const ShowProfile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [companyId, setCompanyId] = useState("");
  const toast = useToast();
  const [showCertificate, setShowCertificate] = useState(false);
  const [image, setImage] = useState("/user-avatar.jpg"); // State to store the selected image

  useEffect(() => {
    const token = localStorage.getItem("CompanyAuthToken");
    const decodedToken = jwt_decode(token);
    setCompanyId(decodedToken._id);
  }, []);

  // only executes when id is set
  useEffect(() => {
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
        console.log(error.message);
      }
    };
    const fetchLogo = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/company/logo/${companyId}`
        );

        const base64Data = await response.text();

        const byteCharacters = atob(base64Data.split(",")[1]);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);

        const blob = new Blob([byteArray], { type: "image/png" });
        const imageUrl = URL.createObjectURL(blob);
        setImage(imageUrl);
      } catch (error) {
        console.error(error);
      }
    };
    if (companyId && companyId !== "") {
      fetchLogo();
      fetchCompanyProfile(); // runs when id is non-empty string
    }
    // return () => {
    //   // Clean up the created object URL
    //   URL.revokeObjectURL(image);
    // };
  }, [companyId]);

  const fetchCertificate = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/company/certificate/${companyId}`
      );
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setShowCertificate(url);
      } else {
        const data = await response.json();
        console.log(data.message);
        throw new Error("Certificate not Found !!!");
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
  const handleCloseCertificate = () => {
    setShowCertificate(false);
  };

  const submitHandler = async () => {
    navigate("/Company/editprofile", { replace: true });
  };
  return (
    <Box>
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
            <Box mr={"1%"}>
              <label htmlFor="profile-image">
                <div
                  style={{
                    position: "relative",
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    overflow: "hidden",
                  }}
                >
                  {image ? (
                    <img
                      src={image}
                      alt="company logo"
                      width="100%"
                      height="100%"
                    />
                  ) : (
                    <img
                      src={"/user-avatar.jpg"}
                      alt="Profile"
                      style={{ width: "100%", height: "100%" }}
                    />
                  )}
                </div>
              </label>
            </Box>
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
                <strong>Company Info Summary:</strong>{" "}
                {profileData.profile.summary}
              </Text>
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
                <strong>Sectors:</strong>{" "}
                {/* {JSON.parse(profileData.profile.sectors).join(", ")} */}
                {JSON.parse(profileData.profile.sectors).map(
                  (sector, index) => (
                    <span key={index}>
                      <b>{index + 1}.</b> {sector},{/* <br /> */}
                    </span>
                  )
                )}
              </Text>
              <br />
              <HStack>
                <Text fontSize="lg">
                  <strong>Company Registration Certificate:</strong>
                </Text>
                <Button
                  colorScheme="blue"
                  w={"20vw"}
                  mt={4}
                  onClick={fetchCertificate}
                >
                  Show Certificate
                </Button>
              </HStack>
              {showCertificate && (
                <Box mt={0}>
                  <IconButton
                    icon={<CloseIcon />}
                    colorScheme="red"
                    mt={2}
                    onClick={handleCloseCertificate}
                  />
                  <embed
                    src={showCertificate}
                    type="application/pdf"
                    width="100%"
                    height="500px"
                  />
                </Box>
              )}
              <Button
                colorScheme="teal"
                w={"20vw"}
                mt={6}
                onClick={submitHandler}
              >
                Edit Profile
              </Button>
            </Box>
          </>
        ) : (
          <Text>Loading profile data...</Text>
        )}
      </Box>
    </Box>
  );
};

export default ShowProfile;

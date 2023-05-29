import React, { useState, useEffect } from "react";
import { Button, Box, Heading, Text, HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import NgoNavigation from "../ngoNavigation";

const ShowNgoProfile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [ngoId, setNgoId] = useState("");
  // const toast = useToast();
  useEffect(() => {
    const token = localStorage.getItem("NgoAuthToken");
    const decodedToken = jwt_decode(token);
    setNgoId(decodedToken._id);
  }, []);

  const fetchCompanyProfile = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/NGO/profile/${ngoId}`
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
      // toast({
      //   title: "Error Occurred!",
      //   description: error.message,
      //   status: "error",
      //   duration: 5000,
      //   isClosable: true,
      //   position: "bottom",
      // });
    }
  };

  useEffect(() => {
    fetchCompanyProfile();
  });

  const submitHandler = async () => {
    navigate("/Ngo/editprofile", { replace: true });
  };
  return (
    <div p={4}>
      <NgoNavigation />
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
              Ngo Profile
            </Heading>
            <Text fontSize="xl">
              <strong>Ngo Name:</strong> {profileData.NGO_name}
            </Text>
            <Text fontSize="xl">
              <strong>Email:</strong> {profileData.email}
            </Text>
            <Text mt={4} fontSize="xl">
              <strong>Profile:</strong>
            </Text>
            <Box pl={4} mt={2}>
              <Text fontSize="lg">
                <strong>Ngo Info Summary:</strong>{" "}
                {profileData.profile.summary}
              </Text>
              <br />
              <Text fontSize="lg">
                <strong>Board Members:</strong>
                {Array.isArray(profileData.profile.board_members) ? (
                  profileData.profile.board_members.map((member, index) => (
                    <Box key={index} mt={2}>
                      <Text fontSize="lg">
                        <strong>Member {index + 1}:</strong>
                      </Text>
                      <HStack>
                        <Text fontSize="lg" mr={2}>
                          <strong>Member Name:</strong> {member.bm_name}
                        </Text>
                        <Text fontSize="lg" mr={2}>
                          <strong>Gender:</strong> {member.bm_gender}
                        </Text>
                        <Text fontSize="lg" mr={2}>
                          <strong>DIN:</strong> {member.bm_din}
                        </Text>
                        <Text fontSize="lg" mr={2}>
                          <strong>Phone:</strong> {member.bm_phone}
                        </Text>
                        <Text fontSize="lg" mr={2}>
                          <strong>Designation:</strong> {member.bm_designation}
                        </Text>
                      </HStack>
                    </Box>
                  ))
                ) : (
                  <Text fontSize="lg">No board members found.</Text>
                )}
              </Text>
              <br />
              <Text fontSize="lg">
                <strong>CSR Budget of this year:</strong>{" "}
                {profileData.profile.csr_budget}
              </Text>
              <br />
              <Text fontSize="lg">
                <strong>Area of operation :</strong>{" "}
                {profileData.profile.operation_area.join(", ")}
              </Text>
              <br />
              <Text fontSize="lg">
                <strong>Development Sector :</strong>
                <br />
                {profileData.profile.sectors.map((sector, index) => (
                  <span key={index}>
                    <b>{index + 1}.</b> {sector}
                    <br />
                  </span>
                ))}
              </Text>
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
    </div>
  );
};

export default ShowNgoProfile;

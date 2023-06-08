import React, { useState, useEffect } from "react";
import { Button, Box, Heading, Text, Wrap, Divider } from "@chakra-ui/react";
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
  const [image, setImage] = useState("/user-avatar.jpg"); // State to store the selected image

  useEffect(() => {
    const fetchCompanyProfile = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/NGO/profile/${ngoId}`
        );
        const data = await response.json();
        if (data.success) {
          setProfileData(data.data);
          console.log(data.data);
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
          `http://localhost:4000/NGO/logo/${ngoId}`
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
    if (ngoId && ngoId !== "") {
      fetchLogo();
      fetchCompanyProfile();
    }
  }, [ngoId]);

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
                      alt="ngo logo"
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
                <strong>Ngo Info Summary:</strong> {profileData.profile.summary}
              </Text>
              <br />
              <Text fontSize="lg">
                <strong>Board Members:</strong>
                <Wrap spacing={10}>
                  {Array.isArray(profileData.profile.board_members) ? (
                    profileData.profile.board_members.map((member, index) => (
                      <Box
                        key={index}
                        borderWidth="1px"
                        borderRadius="md"
                        p={4}
                        width="350px"
                      >
                        <Text fontSize="lg">
                          <strong>Member {index + 1}:</strong>
                        </Text>
                        <Divider />
                        {/* <HStack> */}
                        <Text fontSize="lg" mt={2} mb={2}>
                          <strong>Member Name:</strong> {member.bm_name}
                        </Text>
                        <Text fontSize="lg" mb={2}>
                          <strong>Gender:</strong> {member.bm_gender}
                        </Text>
                        <Text fontSize="lg" mb={2}>
                          <strong>DIN Number:</strong> {member.bm_din}
                        </Text>
                        <Text fontSize="lg" mb={2}>
                          <strong>Phone Number:</strong> {member.bm_phone}
                        </Text>
                        <Text fontSize="lg">
                          <strong>Designation:</strong> {member.bm_designation}
                        </Text>
                        {/* </HStack> */}
                      </Box>
                    ))
                  ) : (
                    <Text fontSize="lg">No board members found.</Text>
                  )}
                </Wrap>
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

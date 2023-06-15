import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Heading,
  Text,
  useToast,
  HStack,
  Icon,
  Divider,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import CompanyNavigation from "../companyNavigation";
import { FiMail, FiMapPin, FiPhone, FiUser } from "react-icons/fi";

const ShowProfile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [companyId, setCompanyId] = useState("");
  const toast = useToast();
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
        window.open(url, "_blank"); // Open the URL in a new tab
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
    <div
      style={{
        backgroundImage: "url('../bg3.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        minWidth: "100vw",
      }}
    >
      <Box>
        <CompanyNavigation />

        <div
          style={{
            zoom: "0.8",
            // width: "125vw",
            // marginTop: "1%",
          }}
        >
          {profileData ? (
            <div>
              <Box mr={"1%"} display={"flex"} justifyContent={"center"}>
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
                <Heading size="lg" ml={4} mt={4} fontFamily={"serif"}>
                  {profileData.company_name}
                </Heading>
              </Box>
              <Box
                maxW="100vw"
                mx="auto"
                mt={1}
                borderWidth="1px"
                p={4}
                bg={"rgba(115, 190, 246, 0.4)"}
                borderRadius="md"
                boxShadow="md"
                fontFamily={"serif"}
              >
                <Text fontSize={{ base: "xl", md: "xl" }}>
                  <strong>Company Summary:</strong>{" "}
                </Text>
                <Text ml={4} fontSize={{ base: "sm", md: "lg" }}>
                  {JSON.parse(profileData.profile.summary)}
                </Text>
                <br />
                <Text fontSize={{ base: "xl", md: "xl" }}>
                  <strong>Company Info:</strong>{" "}
                </Text>
                <Divider height={"2"} borderColor={"transparent"} />
                <Box>
                  {/* <Text mt={4} fontSize="xl">
        <strong>Profile:</strong>
      </Text> */}
                  <HStack
                    ml={{ base: "10%", md: "10%" }}
                    display={"flex"}
                    justifyContent={"start"}
                    flexWrap={"wrap"}
                    gap={{ base: "20%", md: "20%" }}
                  >
                    <Box mr={{ base: "5%", md: "5%" }}>
                      <Text fontSize={{ base: "lg", md: "lg" }}>
                        <strong>Establishment Year:</strong>{" "}
                        <span style={{ marginLeft: "5%" }}>
                          {profileData.profile.establishment_year}
                        </span>
                      </Text>
                      <Divider height={"2"} borderColor={"transparent"} />
                      <Text fontSize={{ base: "lg", md: "lg" }}>
                        <strong>Tax Comp:</strong>{" "}
                        <span style={{ marginLeft: "13%" }}>
                          {profileData.profile.tax_comp}
                        </span>
                      </Text>
                      <Divider height={"2"} borderColor={"transparent"} />
                      <Text fontSize={{ base: "xl", md: "xl" }}>
                        <Icon as={FiMail} boxSize={4} mr={5} />
                        {profileData.email}
                      </Text>
                      <Divider height={"2"} borderColor={"transparent"} />
                      <Text fontSize={{ base: "lg", md: "lg" }}>
                        <Icon as={FiMapPin} boxSize={4} mr={5} />{" "}
                        {`${profileData.profile.location.city}, ${profileData.profile.location.state}, ${profileData.profile.location.pincode}`}
                      </Text>
                    </Box>
                    <Box mr={{ base: "10%", md: "10%" }}>
                      <strong>Communication Person:</strong>{" "}
                      <Text fontSize={{ base: "lg", md: "lg" }}>
                        <Icon as={FiUser} boxSize={4} mr={5} />{" "}
                        {`${profileData.profile.comunication_person.cp_name} (${profileData.profile.comunication_person.cp_designation})`}
                      </Text>
                      <Divider height={"2"} borderColor={"transparent"} />
                      <Text fontSize={{ base: "lg", md: "lg" }}>
                        <Icon as={FiMail} boxSize={4} mr={5} />{" "}
                        {profileData.profile.comunication_person.cp_email}
                      </Text>
                      <Divider height={"2"} borderColor={"transparent"} />
                      <Text fontSize={{ base: "lg", md: "lg" }}>
                        <Icon as={FiPhone} boxSize={4} mr={5} />{" "}
                        {profileData.profile.comunication_person.cp_phone}
                      </Text>
                    </Box>
                  </HStack>
                  <br></br>
                  <Text fontSize={{ base: "lg", md: "lg" }}>
                    <strong
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      Sectors:
                    </strong>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <VStack>
                        <Divider
                          borderBottomWidth="10px"
                          borderColor="skyblue"
                          width={"115px"}
                          mb="-9%" // Apply negative margin to remove the gap
                          mt={"-12%"}
                        />
                        <Divider
                          borderBottomWidth="2px"
                          borderColor="blue"
                          width={"115px"}
                        />
                      </VStack>
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, minmax(20%, 1fr))",
                        gap: "10px",
                        whiteSpace: "wrap",
                        maxWidth: "100%",
                        overflow: "auto-fit",
                        marginLeft: "10%",
                      }}
                    >
                      {JSON.parse(profileData.profile.sectors).map((sector) => (
                        <p
                          style={{
                            cursor: "default",
                            marginLeft: 0,
                            fontSize: { base: "sm", md: "lg" },
                          }}
                        >
                          {sector}
                        </p>
                      ))}
                    </div>
                  </Text>
                  <br />
                  <HStack
                    display={"flex"}
                    justifyContent={"center"}
                    flexWrap={"wrap"}
                  >
                    <Button
                      bg="skyblue"
                      color="white"
                      w={"190px"}
                      mr={"5%"}
                      boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
                      _hover={{ boxShadow: "0px 4px 6px white" }}
                      _active={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}
                      mt={4}
                      onClick={fetchCertificate}
                    >
                      Show Certificate
                    </Button>
                    <Button
                      bg="white"
                      color="skyblue"
                      w={"190px"}
                      boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
                      _hover={{ boxShadow: "0px 4px 6px skyblue" }}
                      _active={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}
                      mt={4}
                      onClick={submitHandler}
                    >
                      Edit Profile
                    </Button>
                  </HStack>
                </Box>
              </Box>
            </div>
          ) : (
            <Box
              maxW="80vw"
              mx="auto"
              mt={8}
              borderWidth="1px"
              p={4}
              bg={"rgba(115, 190, 246, 0.4)"}
              borderRadius="md"
              boxShadow="md"
            >
              <Text>Loading profile data...</Text>
            </Box>
          )}
        </div>
      </Box>
    </div>
  );
};

export default ShowProfile;

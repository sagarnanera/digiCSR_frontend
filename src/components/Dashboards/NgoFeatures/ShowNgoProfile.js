import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Heading,
  Text,
  Divider,
  HStack,
  Icon,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import NgoNavigation from "../ngoNavigation";
import { FiMail } from "react-icons/fi";
import "../../../CSS/rfpTable.css";

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
        const response = await fetch(`http://localhost:4000/NGO/logo/${ngoId}`);

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
        <NgoNavigation />

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
                  {profileData.NGO_name}
                </Heading>
              </Box>
              <Box
                maxW="95vw"
                mx="auto"
                mt={1}
                borderWidth="1px"
                p={4}
                bg={"rgba(115, 190, 246, 0.4)"}
                borderRadius="md"
                boxShadow="md"
                fontFamily={"serif"}
              >
                <Box ml={"10"} mr={"10"}>
                  <Text fontSize={{ base: "xl", md: "xl" }}>
                    <strong>Ngo Summary:</strong>{" "}
                  </Text>
                  <Text ml={4} fontSize={{ base: "sm", md: "lg" }}>
                    {profileData.profile.summary}
                  </Text>
                  <br />
                  <Text fontSize={{ base: "xl", md: "xl" }}>
                    <strong>Ngo Info:</strong>{" "}
                  </Text>
                  <Divider height={"2"} borderColor={"transparent"} />
                  <Divider height={"2"} borderColor={"transparent"} />
                  <Box ml={"5"}>
                    <Box mr={{ base: "10%", md: "5%" }}>
                      <Text fontSize={{ base: "lg", md: "lg" }}>
                        <strong>CSR Budget of this year:</strong>{" "}
                        <span style={{ marginLeft: "5%" }}>
                          {profileData.profile.csr_budget}
                        </span>
                      </Text>
                      <Divider height={"2"} borderColor={"transparent"} />
                      <Divider height={"2"} borderColor={"transparent"} />
                      <Text fontSize={{ base: "xl", md: "xl" }}>
                        <Icon as={FiMail} boxSize={4} mr={5} />
                        {profileData.email}
                      </Text>
                    </Box>
                    <br></br>
                    <Flex
                      direction={{ base: "column", md: "row" }}
                      wrap={{ base: "wrap", md: "nowrap" }}
                      justifyContent={{ base: "center", md: "space-between" }}
                    >
                      <div style={{ flex: 1, marginRight: "2%" }}>
                        <Text fontSize="lg">
                          <strong>Area of operation :</strong>{" "}
                          <Divider height={"2"} borderColor={"transparent"} />
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns:
                                "repeat(3, minmax(20%, 1fr))",
                              gap: "20px",
                              whiteSpace: "wrap",
                              maxWidth: "100%",
                              overflow: "auto-fit",
                              marginLeft: "0%",
                            }}
                          >
                            {profileData.profile.operation_area.map((state) => (
                              <p
                                style={{
                                  cursor: "default",
                                  marginLeft: 0,
                                  fontSize: { base: "sm", md: "lg" },
                                }}
                              >
                                {state}
                              </p>
                            ))}
                          </div>
                        </Text>
                      </div>
                      <div style={{ flex: 1, marginLeft: "2%" }}>
                        <strong>Development Sector :</strong>
                        <Divider height={"2"} borderColor={"transparent"} />

                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, minmax(20%, 1fr))",
                            gap: "20px",
                            whiteSpace: "wrap",
                            maxWidth: "100%",
                            overflow: "auto-fit",
                            marginLeft: "0%",
                          }}
                        >
                          {profileData.profile.sectors.map((sector) => (
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
                      </div>
                    </Flex>
                    <Divider height={"2"} borderColor={"transparent"} />
                    <Divider height={"2"} borderColor={"transparent"} />

                    <Text fontSize="lg">
                      <strong>Board Members:</strong>
                      <Box>
                        {Array.isArray(profileData.profile.board_members) ? (
                          <Table
                            size="sm"
                            variant={"striped"}
                            colorScheme="blue"
                            borderRadius="md"
                            overflow="hidden"
                          >
                            <TableCaption>Member Details</TableCaption>
                            <Thead
                              style={{
                                background: "#3580f1",
                                marginBottom: "2rem",
                              }}
                            >
                              <Tr>
                                <Th>Sr. No.</Th>
                                <Th>Member Name</Th>
                                <Th>Gender</Th>
                                <Th>DIN No.</Th>
                                <Th>Phone No.</Th>
                                <Th>Designation</Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              {profileData.profile.board_members.map(
                                (member, index) => (
                                  <Tr>
                                    <Td className="divider">{index + 1}</Td>
                                    <Td className="divider">
                                      {member.bm_name}
                                    </Td>
                                    <Td className="divider">
                                      {member.bm_gender}
                                    </Td>
                                    <Td className="divider">{member.bm_din}</Td>
                                    <Td className="divider">
                                      {member.bm_phone}
                                    </Td>
                                    <Td>{member.bm_designation}</Td>
                                  </Tr>
                                )
                              )}
                            </Tbody>
                          </Table>
                        ) : (
                          <Text fontSize="lg">No board members found.</Text>
                        )}
                      </Box>
                    </Text>
                    <Divider height={"2"} borderColor={"transparent"} />

                    <HStack
                      display={"flex"}
                      justifyContent={"center"}
                      flexWrap={"wrap"}
                    >
                      <Button
                        bg="white"
                        color="skyblue"
                        w={"190px"}
                        // mr={"5%"}
                        boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
                        _hover={{ boxShadow: "0px 4px 6px skyblue" }}
                        _active={{
                          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                        }}
                        mt={4}
                        onClick={submitHandler}
                      >
                        Edit Profile
                      </Button>
                    </HStack>
                  </Box>
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

export default ShowNgoProfile;

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
  Tooltip,
} from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import "../../../CSS/rfpTable.css";
import ReviewComponent from "../AddReviews";
import NavBar from "../../NavBar";

const ShowNgoProfile = () => {
  const location = useLocation();
  let ngoID = location.state?.ngoID;
  const userType = location.state?.userType;
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [ngoId, setNgoId] = useState("");
  // const toast = useToast();
  useEffect(() => {
    if (
      !(
        userType === "company" ||
        userType === "beneficiary" ||
        userType === "admin"
      )
    ) {
      const token = localStorage.getItem("NgoAuthToken");
      const decodedToken = jwt_decode(token);
      setNgoId(decodedToken._id);
    }
  }, [userType]);
  const [image, setImage] = useState("/user-avatar.jpg"); // State to store the selected image

  useEffect(() => {
    if (
      userType === "company" ||
      userType === "beneficiary" ||
      userType === "admin"
    ) {
      const fetchCompanyProfile = async () => {
        try {
          const response = await fetch(
            `http://localhost:4000/NGO/profile/${ngoID}`
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
            `http://localhost:4000/NGO/logo/${ngoID}`
          );
          console.log(response);
          const base64Data = await response.text();
          const byteCharacters = atob(base64Data.split(",")[1]);
          console.log(base64Data);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);

          const blob = new Blob([byteArray], { type: "image/png" });
          const imageUrl = URL.createObjectURL(blob);
          console.log(imageUrl);
          setImage(imageUrl);
        } catch (error) {
          console.error(error);
        }
      };
      if (ngoID && ngoID !== "") {
        fetchLogo();
        fetchCompanyProfile();
      }
    } else {
      const fetchCompanyProfile = async () => {
        try {
          const response = await fetch(
            `http://localhost:4000/NGO/profile/${ngoId}`
          );
          const data = await response.json();
          if (data.success) {
            setProfileData(data.data);
            // console.log(data.data);
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
    }
  }, [ngoId, ngoID, userType]);

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
        {/* {userType !== "company" && userType !== "beneficiary" ? (
          <NgoNavigation />
        ) : userType === "company" ? (
          <CompanyNavigation />
        ) : userType === "beneficiary" ? (
          <BenificiaryNavigation />
        )} */}

        <NavBar userType={userType} />

        <div
          style={{
            zoom: "0.8",
            // width: "125vw",
            // marginTop: "1%",
          }}
        >
          {profileData ? (
            <div>
              <Box
                mr={"1%"}
                mt={"1%"}
                mb={"1%"}
                display={"flex"}
                justifyContent={"center"}
              >
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
                bg={"rgba(255, 255, 255)"}
                borderRadius="md"
                boxShadow="2px 4px 6px black"
                borderColor={"skyblue"}
                fontFamily={"serif"}
              >
                <Box ml={"0"} mr={"0"}>
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
                    <HStack
                      ml={{ base: "5%", md: "5%" }}
                      display={"flex"}
                      justifyContent={"start"}
                      flexWrap={"wrap"}
                      // gap={{ base: "10%", md: "10%" }}
                    >
                      <Box
                        mr={{ base: "2%", md: "2%" }}
                        // borderWidth="1px"
                        ml={"1.5%"}
                        borderRadius={"10px"}
                      >
                        <Text fontSize={{ base: "lg", md: "lg" }}>
                          <strong>Establishment Year:</strong>{" "}
                          <span style={{ marginLeft: "0%" }}>
                            {profileData.profile.establishment_year}
                          </span>
                        </Text>
                        <Divider height={"2"} borderColor={"transparent"} />
                        <Text fontSize={{ base: "lg", md: "lg" }}>
                          <Icon as={FiPhone} boxSize={4} mr={5} />{" "}
                          {profileData.profile.phone}
                        </Text>
                        <Text fontSize={{ base: "lg", md: "lg" }}>
                          <Icon as={FiMapPin} boxSize={4} mr={5} />{" "}
                          {`${profileData.profile.location.city}, ${profileData.profile.location.state}, ${profileData.profile.location.pincode}`}
                        </Text>
                        <Divider height={"2"} borderColor={"transparent"} />
                        <Text fontSize={{ base: "lg", md: "lg" }}>
                          <Icon as={FiMail} boxSize={4} mr={5} />{" "}
                          {profileData.email}
                        </Text>
                      </Box>
                    </HStack>
                    <br></br>
                    <Flex
                      direction={{ base: "column", md: "row" }}
                      wrap={{ base: "wrap", md: "nowrap" }}
                      justifyContent={{ base: "center", md: "space-between" }}
                    >
                      <div
                        style={{
                          flex: 1,
                          marginRight: "2%",
                          paddingLeft: "2%",
                          paddingTop: "1%",
                          paddingBottom: "1%",
                          backgroundColor: "rgb(106, 200, 230, 0.05)",
                          borderRadius: "10px",
                          borderWidth: "1px",
                          borderColor: "skyblue",
                        }}
                      >
                        <strong>Work Location:</strong>
                        <Divider
                          height={"1"}
                          mb={"2"}
                          w={"95%"}
                          borderColor={"skyblue"}
                        />
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, minmax(20%, 1fr))",
                            gap: "10px",
                            whiteSpace: "wrap",
                            maxWidth: "100%",
                            overflow: "auto-fit",
                            marginLeft: "0%",
                          }}
                        >
                          {profileData.profile.operation_area.map(
                            (state, index) => (
                              <p
                                style={{
                                  cursor: "default",
                                  marginLeft: 0,
                                  fontSize: { base: "sm", md: "lg" },
                                }}
                              >
                                {index % 3 !== 0 && (
                                  <div
                                    style={{
                                      borderLeft: "1px solid black",
                                      height: "120%",
                                      // marginRight: "-15px",
                                    }}
                                  >
                                    <div
                                      style={{
                                        marginLeft: "10px",
                                      }}
                                    >
                                      <Tooltip
                                        style={{ zoom: "0.8" }}
                                        label={state.length > 20 ? state : ""}
                                      >
                                        <p
                                          style={{
                                            cursor: "default",
                                            marginLeft: 0,
                                            fontSize: { base: "sm", md: "lg" },
                                          }}
                                        >
                                          {state.length > 20
                                            ? `${state.slice(0, 20)}...`
                                            : state}
                                        </p>
                                      </Tooltip>
                                    </div>
                                  </div>
                                )}
                                {index % 3 === 0 && (
                                  <div>
                                    <Tooltip
                                      style={{ zoom: "0.8" }}
                                      label={state.length > 20 ? state : ""}
                                    >
                                      <p
                                        style={{
                                          cursor: "default",
                                          marginLeft: 0,
                                          fontSize: { base: "sm", md: "lg" },
                                        }}
                                      >
                                        {state.length > 20
                                          ? `${state.slice(0, 20)}...`
                                          : state}
                                      </p>
                                    </Tooltip>
                                  </div>
                                )}
                              </p>
                            )
                          )}
                        </div>
                      </div>
                      <div
                        style={{
                          flex: 1,
                          paddingLeft: "2%",
                          paddingTop: "1%",
                          paddingBottom: "1%",
                          backgroundColor: "rgb(106, 200, 230, 0.05)",
                          borderRadius: "10px",
                          borderWidth: "1px",
                          borderColor: "skyblue",
                        }}
                      >
                        <strong>Cause Area (CSR Sectors):</strong>
                        <Divider
                          height={"1"}
                          mb={"2"}
                          w={"95%"}
                          borderColor={"skyblue"}
                        />{" "}
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, minmax(20%, 1fr))",
                            gap: "10px",
                            whiteSpace: "wrap",
                            maxWidth: "100%",
                            overflow: "auto-fit",
                            marginLeft: "0%",
                          }}
                        >
                          {profileData.profile.sectors.map((sector, index) => (
                            <p
                              style={{
                                cursor: "default",
                                marginLeft: 0,
                                fontSize: { base: "sm", md: "lg" },
                              }}
                            >
                              {index % 3 !== 0 && (
                                <div
                                  style={{
                                    borderLeft: "1px solid black",
                                    height: "120%",
                                    // marginRight: "10px",
                                  }}
                                >
                                  <div
                                    style={{
                                      marginLeft: "10px",
                                    }}
                                  >
                                    <Tooltip
                                      style={{ zoom: "0.8" }}
                                      label={sector.length > 20 ? sector : ""}
                                    >
                                      <p
                                        style={{
                                          cursor: "default",
                                          marginLeft: 0,
                                          fontSize: { base: "sm", md: "lg" },
                                        }}
                                      >
                                        {sector.length > 20
                                          ? `${sector.slice(0, 20)}...`
                                          : sector}
                                      </p>
                                    </Tooltip>
                                  </div>
                                </div>
                              )}
                              {index % 3 === 0 && (
                                <div>
                                  <Tooltip
                                    style={{ zoom: "0.8" }}
                                    label={sector.length > 20 ? sector : ""}
                                  >
                                    <p
                                      style={{
                                        cursor: "default",
                                        marginLeft: 0,
                                        fontSize: { base: "sm", md: "lg" },
                                      }}
                                    >
                                      {sector.length > 20
                                        ? `${sector.slice(0, 20)}...`
                                        : sector}
                                    </p>
                                  </Tooltip>
                                </div>
                              )}
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
                            variant={"simple"}
                            colorScheme="blue"
                            overflow="auto"
                          >
                            <TableCaption>Member Details</TableCaption>
                            <Thead
                              style={{
                                background: "skyblue",
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
                            <Tbody style={{ zoom: 1.2 }}>
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
                      {userType !== "company" &&
                        userType !== "beneficiary" &&
                        userType !== "admin" && (
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
                        )}
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
      {userType === "company" ||
      userType === "beneficiary" ||
      userType === "admin" ? (
        <ReviewComponent ngoID={ngoID} userType={userType} />
      ) : (
        <>
          <ReviewComponent ngoID={ngoId} userType={"ngo"} />
        </>
      )}
    </div>
  );
};

export default ShowNgoProfile;

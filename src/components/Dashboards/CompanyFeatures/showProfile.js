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
  Tooltip,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import CompanyNavigation from "../../Navigation/companyNavigation";
import { FiMail, FiMapPin, FiPhone, FiUser } from "react-icons/fi";
import AdminNavigation from "../../Navigation/adminNavigation";

const ShowProfile = () => {
  const location = useLocation();
  let companyID = location.state?.companyID;
  const userType = location.state?.userType;
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [companyId, setCompanyId] = useState("");
  const toast = useToast();
  const [image, setImage] = useState("/user-avatar.jpg"); // State to store the selected image

  useEffect(() => {
    if (!(userType === "admin")) {
      const token = localStorage.getItem("CompanyAuthToken");
      const decodedToken = jwt_decode(token);
      setCompanyId(decodedToken._id);
    }
  }, [userType]);

  // only executes when id is set
  useEffect(() => {
    if (userType === "admin") {
      const fetchCompanyProfile = async () => {
        try {
          const response = await fetch(
            `http://localhost:4000/company/profile/${companyID}`
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
            `http://localhost:4000/company/logo/${companyID}`
          );
          const res = await response.json();
          // console.log(res);
          setImage(res.LogoURL);
        } catch (error) {
          console.error(error);
        }
      };
      if (companyID && companyID !== "") {
        fetchLogo();
        fetchCompanyProfile(); // runs when id is non-empty string
      }
    } else {
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
          const res = await response.json();
          // console.log(res);
          setImage(res.LogoURL);
        } catch (error) {
          console.error(error);
        }
      };
      if (companyId && companyId !== "") {
        fetchLogo();
        fetchCompanyProfile(); // runs when id is non-empty string
      }
    }
  }, [companyId, companyID, userType]);

  const fetchCertificate = async () => {
    try {
      if (userType === "admin") {
        const response = await fetch(
          `http://localhost:4000/company/certificate/${companyID}`
        );
        const data = await response.json();
        console.log(data);

        if (response.ok && data.success) {
          const certificateURL = data.certificateURL;

          // Open the certificate in a new tab
          window.open(certificateURL, "_blank");
        } else {
          console.error("Failed to fetch certificate:", data.message);
        }
      } else {
        const response = await fetch(
          `http://localhost:4000/company/certificate/${companyId}`
        );
        const data = await response.json();
        console.log(data);

        if (response.ok && data.success) {
          const certificateURL = data.certificateURL;

          // Open the certificate PDF in a new tab
          window.open(certificateURL, "_blank");
        } else {
          console.error("Failed to fetch certificate:", data.message);
        }
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
        {userType !== "admin" ? <CompanyNavigation /> : <AdminNavigation />}

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
                mt={"2%"}
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
                  {profileData.company_name}
                </Heading>
              </Box>
              <Box
                maxW="100vw"
                mx="auto"
                mt={4}
                borderWidth="1px"
                p={4}
                bg="#f2f2f2"
                borderRadius="md"
                boxShadow="md"
                fontFamily={"serif"}
                overflow={"auto"}
              >
                <Text fontSize={{ base: "xl", md: "xl" }}>
                  <strong>Company Summary:</strong>{" "}
                </Text>
                <p style={{ padding: "1%" }}>{profileData.profile.summary}</p>
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
                    ml={{ base: "5%", md: "5%" }}
                    display={"flex"}
                    justifyContent={"start"}
                    flexWrap={"wrap"}
                  // gap={{ base: "10%", md: "10%" }}
                  >
                    <Box
                      mr={{ base: "4%", md: "4%" }}
                      // borderLeft="1px"
                      padding={"2% 9%"}
                      ml={"1%"}
                      borderRadius={"10px"}
                    >
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
                          {profileData.profile.tax_comp.join(",")}
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
                    <Box
                      mr={{ base: "5%", md: "5%" }}
                      borderLeft="1px"
                      padding={"2% 12%"}
                      ml={"1%"}
                      fontSize={"lg"}
                    >
                      <strong>Communication Person:</strong>{" "}
                      <Divider
                        height={"1"}
                        ml={"1%"}
                        mb={"2"}
                        w={"98%"}
                        borderColor={"skyblue"}
                      />
                      <Box>
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
                    </Box>
                  </HStack>
                  <br></br>
                  <Text fontSize={{ base: "lg", md: "lg" }}>
                    <Box
                      backgroundColor="rgb(106, 200, 230, 0.05)"
                      borderWidth="1px"
                      borderColor="skyblue"
                      padding={"2%"}
                      paddingTop={"1"}
                      ml={"1%"}
                      borderRadius={"10px"}
                      width={"98%"}
                    >
                      <Text
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <strong>Cause Area(CSR Sector Prefered):</strong>{" "}
                      </Text>
                      <Divider
                        height={"1"}
                        ml={"1%"}
                        mb={"3"}
                        w={"98%"}
                        borderColor={"skyblue"}
                      />
                      <Box
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
                        {profileData.profile.sectors.map((sector, index) => (
                          <Box key={sector} display="flex" alignItems="center">
                            {index % 3 !== 0 && (
                              <div
                                style={{
                                  borderLeft: "1px solid black",
                                  height: "120%",
                                  marginRight: "60px",
                                  marginLeft: "10px",
                                }}
                              />
                            )}
                            <Tooltip
                              style={{ zoom: "0.8" }}
                              label={sector.length > 30 ? sector : ""}
                            >
                              <p
                                style={{
                                  cursor: "default",
                                  marginLeft: 0,
                                  fontSize: { base: "sm", md: "lg" },
                                }}
                              >
                                {sector.length > 30
                                  ? `${sector.slice(0, 30)}...`
                                  : sector}
                              </p>
                            </Tooltip>
                          </Box>
                        ))}
                      </Box>
                    </Box>
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
                      mb={4}
                      onClick={fetchCertificate}
                    >
                      Show Certificate
                    </Button>
                    {userType !== "admin" && (
                      <Button
                        bg="white"
                        color="skyblue"
                        w={"190px"}
                        boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
                        _hover={{ boxShadow: "0px 4px 6px rgb(45, 38, 38)" }}
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

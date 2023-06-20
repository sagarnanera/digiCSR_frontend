import React, { useEffect, useState } from "react";
import "../../../CSS/RFPDetails.css";
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Image,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import NgoNavigation from "../../Navigation/NgoNavigation";
import RequestAmount from "./requestAmount";

const RFPDetails = () => {
  const location = useLocation();
  const rfpID = location.state?.rfpID;
  const [rfpDetails, setRfpDetails] = useState(null);
  const [companyDetails, setCompanyDetails] = useState(null);
  const [selectedRFPId, setSelectedRFPId] = useState(null);
  const [showShareForm, setShowShareForm] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  useEffect(() => {
    const fetchRFPDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/rfp-details/${rfpID}`,
          {
            headers: {
              authorization: `${localStorage.getItem("NgoAuthToken")}`,
            },
          }
        );
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          setRfpDetails(data.data.rfp);
          setCompanyDetails(data.data.company);
          setSelectedRowData(data.data);
        } else {
          console.error("Failed to fetch RFP details:", data.message);
        }
      } catch (error) {
        console.error("Failed to fetch RFP details:", error);
      }
    };
    fetchRFPDetails();
  }, [rfpID]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const addMonths = (dateString, months) => {
    const date = new Date(dateString);
    const monthsToAdd = parseInt(months, 10);
    date.setMonth(date.getMonth() + monthsToAdd);
    return formatDate(date);
  };
  const handleShareClick = () => {
    setSelectedRFPId(rfpID);
    console.log(selectedRFPId);
    setShowShareForm(true);
  };
  return (
    <div
      style={{
        backgroundImage: "url('../bg2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        minWidth: "100vw",
      }}
    >
      <Box>
        <NgoNavigation />
        <div
          className="company-details-container"
          style={{ zoom: "0.8", width: "125vw" }}
        >
          <Container centerContent>
            <Box
              d="flex"
              textAlign="center"
              p={3}
              bg="skyblue"
              w={{ base: "100%", md: "95vw" }}
              m="30px 0 0px 0"
            >
              <Text fontSize="3xl" fontFamily="Work sans">
                RFP Details
              </Text>
            </Box>
            <Box
              d="flex"
              m="0px 0 10px 0"
              p={3}
              bg="#f2f2f2"
              w={{ base: "100%", md: "95vw" }}
              maxHeight="95vh" // Limit height to screen height
              overflowY="auto"
            >
              {rfpDetails ? (
                <>
                  <Box>
                    <Flex
                      w="90%"
                      flexWrap="wrap"
                      justifyContent={{ base: "center", md: "flex-start" }}
                    >
                      <Image
                        src="../rfppic.jpg"
                        alt="RFP Picture"
                        width={"500px"}
                      />
                      <VStack mt={4} ml={4} align="flex-start" spacing={2}>
                        <Text mt={2}>
                          <strong>Created by:</strong>{" "}
                          {companyDetails.company_name}
                        </Text>
                        <Text mt={2}>
                          <strong>Title of RFP:</strong> {rfpDetails.title}
                        </Text>
                        <Text mt={2}>
                          <strong>Creation Date:</strong>
                          {formatDate(rfpDetails.date)}
                        </Text>
                        <Text mt={2}>
                          <strong>Budget:</strong> $
                          {rfpDetails.remaining_amount}
                        </Text>
                        <Text mt={2}>
                          <strong>Expiry Date:</strong>{" "}
                          {addMonths(rfpDetails.date, rfpDetails.timeline)}
                        </Text>
                        <Text mt={2}>
                          <strong>Communication Person:</strong>{" "}
                          {companyDetails.profile.comunication_person.cp_name}
                        </Text>
                        <Text mt={2}>
                          <strong>Email:</strong>{" "}
                          {companyDetails.profile.comunication_person.cp_email}
                        </Text>
                      </VStack>
                    </Flex>
                  </Box>
                  <br />
                  <Divider
                    borderBottomWidth="4px"
                    borderColor="skyblue"
                    width="98%"
                  />
                  <br />
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
                        {rfpDetails.states.map((state, index) => (
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
                                    marginLeft: "20px",
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
                        ))}
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
                        {rfpDetails.sectors.map((sector, index) => (
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
                                    marginLeft: "20px",
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
                  <br />
                  <Box width="98%" backgroundColor={"skyblue"} height={"10%"}>
                    <strong style={{ backgroundColor: "skyblue" }}>
                      Corporate(Company):
                    </strong>
                    <Divider borderBottomWidth="4px" borderColor="blue" />
                  </Box>
                  <Box mt={"5"}>
                    <strong>Company Summary:</strong>
                  </Box>
                  <p style={{ padding: "1%" }}>
                    {companyDetails.profile.summary}
                  </p>
                  {/* <br /> */}
                  <VStack mt={4} align="flex-start" spacing={2}>
                    <Text>
                      <strong>Registered Office:</strong>{" "}
                      {companyDetails.profile.location.city},
                      {companyDetails.profile.location.state}{" "}
                      {companyDetails.profile.location.pincode}
                    </Text>
                    <Divider height={"0.5"} borderColor={"transparent"} />

                    <Box
                      backgroundColor="rgb(106, 200, 230, 0.05)"
                      borderWidth="1px"
                      borderColor="skyblue"
                      padding={"2%"}
                      borderRadius={"10px"}
                      width={"100%"}
                    >
                      <Text>
                        <strong>Cause Area(CSR Sector Prefered):</strong>{" "}
                      </Text>
                      <Divider
                        height={"1"}
                        mb={"2"}
                        w={"95%"}
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
                        {companyDetails.profile.sectors.map((sector, index) => (
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
                  </VStack>
                  <br />
                  <br />
                  <Box display={"flex"} justifyContent={"center"}>
                    <Button
                      colorScheme="blue"
                      bg="white"
                      color="skyblue"
                      width={"300px"}
                      boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
                      _hover={{ boxShadow: "0px 4px 6px skyblue" }}
                      _active={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}
                      onClick={handleShareClick}
                    >
                      Rquest Donation
                    </Button>
                    {showShareForm && (
                      <RequestAmount
                        rfpID={selectedRFPId}
                        rowData={selectedRowData}
                        onClose={() => setShowShareForm(false)}
                      />
                    )}
                  </Box>
                </>
              ) : (
                <Text>Loading Rfp Details...</Text>
              )}
            </Box>
          </Container>
        </div>
      </Box>
    </div>
  );
};

export default RFPDetails;

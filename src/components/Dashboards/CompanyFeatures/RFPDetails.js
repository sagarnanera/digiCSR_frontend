import React, { useEffect, useState } from "react";
import "../../../CSS/RFPDetails.css";
import {
  Box,
  Container,
  Divider,
  Flex,
  Image,
  IconButton,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import CompanyNavigation from "../companyNavigation";

const RFPCompanyDetails = () => {
  const location = useLocation();
  const rfpID = location.state?.rfpID;
  const [rfpDetails, setRfpDetails] = useState(null);

  useEffect(() => {
    const fetchRFPDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/rfp/${rfpID}`, {
          headers: {
            authorization: `${localStorage.getItem("CompanyAuthToken")}`,
          },
        });
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          setRfpDetails(data.rfp);
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

  const handleManageDonation = async (donationId, action) => {
    try {
      const response = await fetch("http://localhost:4000/rfp/manage", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `${localStorage.getItem("CompanyAuthToken")}`,
        },
        body: JSON.stringify({
          rfpID: rfpID,
          donationId: donationId,
          action: action,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        // Update the donation status in the UI
        const updatedRfpDetails = { ...rfpDetails };
        const donationIndex = updatedRfpDetails.donations.findIndex(
          (donation) => donation._id === donationId
        );
        if (donationIndex !== -1) {
          updatedRfpDetails.donations[donationIndex].status = action;
          setRfpDetails(updatedRfpDetails);
        }
      } else {
        console.error("Failed to manage donation:", data.message);
      }
    } catch (error) {
      console.error("Failed to manage donation:", error);
    }
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
        <CompanyNavigation />
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
              // borderRadius="10px"
            >
              <Text fontSize="3xl" fontFamily="Work sans">
                RFP Details
              </Text>
            </Box>
            <Box
              d="flex"
              m="px 0 10px 0"
              p={3}
              bg={"rgba(255, 255, 255, 0.529)"}
              w={{ base: "100%", md: "95vw" }}
              // borderRadius="10px"
            >
              {rfpDetails ? (
                <>
                  <Box>
                    <Flex
                      w="90%"
                      flexWrap="wrap"
                      justifyContent={{ base: "center", md: "flex-start" }}
                    >
                      <Image src="../rfppic.jpg" alt="RFP Picture" />
                      <VStack mt={4} ml={4} align="flex-start" spacing={2}>
                        <Text mt={2}>
                          <strong>Title of RFP:</strong> {rfpDetails.title}
                        </Text>
                        <Text mt={2}>
                          <strong>Creation Date:</strong>{" "}
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
                  <div style={{ display: "flex" }}>
                    <div style={{ flex: 1, marginRight: "2%" }}>
                      <strong>Work Location:</strong>
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
                        {rfpDetails.states.map((state) => (
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
                    </div>
                    <div style={{ flex: 1, marginLeft: "2%" }}>
                      <strong>Cause Area (CSR Sectors):</strong>
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
                        {rfpDetails.sectors.map((sector) => (
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
                  </div>

                  <Box width="98%" backgroundColor={"skyblue"} height={"10%"}>
                    <strong style={{ backgroundColor: "skyblue" }}>
                      Donation Request:
                    </strong>
                    <Divider borderBottomWidth="4px" borderColor="blue" />
                  </Box>
                  <br />
                  <Wrap spacing={10}>
                    {Array.isArray(rfpDetails.donations) ? (
                      rfpDetails.donations.map((donation, index) => (
                        <Box
                          key={index}
                          borderWidth="1px"
                          borderRadius="md"
                          p={4}
                          width="350px"
                        >
                          <Text fontSize="lg">
                            <strong>Donation {index + 1}:</strong>
                          </Text>
                          <Divider
                            borderBottomWidth="4px"
                            borderColor="skyblue"
                            width={"50%"}
                          />
                          <Divider
                            borderBottomWidth="2px"
                            borderColor="blue"
                            width={"50%"}
                          />
                          <Text fontSize="lg" mb={2}>
                            <strong>NGO Name:</strong> {donation.ngo}
                          </Text>
                          <Text fontSize="lg" mb={2}>
                            <strong>Request Date:</strong>{" "}
                            {formatDate(donation.date)}
                          </Text>
                          <Text fontSize="lg" mt={2} mb={2}>
                            <strong>Amount of Donation:</strong> $
                            {donation.amount}
                          </Text>
                          {donation.status === "Pending" && (
                            <Flex justify="flex-end">
                              <IconButton
                                icon={<CheckIcon />}
                                onClick={() =>
                                  handleManageDonation(donation._id, "approve")
                                }
                                aria-label="Accept Donation"
                                variant="outline"
                                colorScheme="green"
                              />
                              <IconButton
                                icon={<CloseIcon />}
                                onClick={() =>
                                  handleManageDonation(donation._id, "reject")
                                }
                                aria-label="Reject Donation"
                                variant="outline"
                                colorScheme="red"
                              />
                            </Flex>
                          )}
                          {donation.status === "approved" && (
                            <Text fontSize="lg" mt={2} color="green">
                              Donation Approved
                            </Text>
                          )}
                          {donation.status === "rejected" && (
                            <Text fontSize="lg" mt={2} color="red">
                              Donation Rejected
                            </Text>
                          )}
                        </Box>
                      ))
                    ) : (
                      <Text fontSize="lg">No Donations Requested.</Text>
                    )}
                  </Wrap>
                </>
              ) : (
                <Text>Loading RFP Details...</Text>
              )}
            </Box>
          </Container>
        </div>
      </Box>
    </div>
  );
};

export default RFPCompanyDetails;

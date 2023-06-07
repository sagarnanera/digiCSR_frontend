import React, { useEffect, useState } from "react";
import "../../../CSS/RFPDetails.css";
import {
  Box,
  Container,
  Divider,
  Flex,
  Image,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
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

  return (
    <div>
      <CompanyNavigation />
      <div className="company-details-container">
        <Container centerContent>
          <Box
            d="flex"
            textAlign="center"
            p={3}
            bg="#f2f2f2"
            w={{ base: "100%", md: "95vw" }}
            m="30px 0 10px 0"
            borderRadius="10px"
          >
            <Text fontSize="3xl" fontFamily="Work sans">
              RFP Details
            </Text>
          </Box>
          <Box
            d="flex"
            m="25px 0 10px 0"
            p={3}
            bg="#f2f2f2"
            w={{ base: "100%", md: "95vw" }}
            borderRadius="10px"
          >
            {rfpDetails ? (
              <>
                <Box>
                  <Flex
                    w="90%"
                    flexWrap="wrap"
                    justifyContent={{ base: "center", md: "flex-start" }}
                  >
                    <Image src="/rfppic.jpg" alt="RFP Picture" />
                    <VStack mt={4} ml={4} align="flex-start" spacing={2}>
                      <Text mt={2} fontSize="xl">
                        <strong>Title of RFP:</strong> {rfpDetails.title}
                      </Text>
                      <Text mt={2} fontSize="xl">
                        <strong>Creation Date:</strong>
                        {formatDate(rfpDetails.date)}
                      </Text>
                      <Text mt={2} fontSize="xl">
                        <strong>Budget:</strong> ${rfpDetails.amount}
                      </Text>
                      <Text mt={2} fontSize="xl">
                        <strong>Expiry Date:</strong>{" "}
                        {addMonths(rfpDetails.date, rfpDetails.timeline)}
                      </Text>
                    </VStack>
                  </Flex>
                </Box>
                <br />
                <Divider borderBottomWidth="4px" borderColor="red" />
                <br />
                <strong>Work Location:</strong>
                <p>{rfpDetails.states.join(", ")}</p>
                <br />
                <strong>Cause Area(CSR Sectors):</strong>
                <p>{rfpDetails.sectors.join(", ")}</p>
                <br />
                <Box width="98%" backgroundColor={"orange"} height={"10%"}>
                  <strong style={{ backgroundColor: "orange" }}>
                    Donation Request:
                  </strong>
                  <Divider borderBottomWidth="4px" borderColor="red" />
                </Box>
                <br />
                {/* {rfpDetails.donations} */}
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
                        <Divider borderBottomWidth="2 px" borderColor="red" />
                        {/* <HStack> */}
                        <Text fontSize="lg" mb={2}>
                          <strong>NGO Name:</strong> {donation.ngo}
                        </Text>
                        <Text fontSize="lg" mb={2}>
                          <strong>Request Date:</strong>{" "}
                          {formatDate(donation.date)}
                        </Text>
                        <Text fontSize="lg" mt={2} mb={2}>
                          <strong>Amount of Donation:</strong>${donation.amount}
                        </Text>
                        {/* </HStack> */}
                      </Box>
                    ))
                  ) : (
                    <Text fontSize="lg">No Donations Requested.</Text>
                  )}
                </Wrap>
                {/* <br /> */}
              </>
            ) : (
              <Text>Loading Rfp Details...</Text>
            )}
          </Box>
        </Container>
      </div>
    </div>
  );
};

export default RFPCompanyDetails;

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
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import NgoNavigation from "../ngoNavigation";

const RFPDetails = () => {
  const location = useLocation();
  const rfpID = location.state?.rfpID;
  const [rfpDetails, setRfpDetails] = useState(null);
  const [companyDetails, setCompanyDetails] = useState(null);

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
      <NgoNavigation />
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
                      <Text fontSize="xl">
                        <strong>Created by:</strong>{" "}
                        {companyDetails.company_name}
                      </Text>
                      <Text mt={2} fontSize="xl">
                        <strong>Title of RFP:</strong> {rfpDetails.title}
                      </Text>
                      <Text mt={2} fontSize="xl">
                        <strong>Creation Date:</strong>
                        {formatDate(rfpDetails.date)}
                      </Text>
                      <Text mt={2} fontSize="xl">
                        <strong>Budget:</strong> ${rfpDetails.remaining_amount}
                      </Text>
                      <Text mt={2} fontSize="xl">
                        <strong>Expiry Date:</strong>{" "}
                        {addMonths(rfpDetails.date, rfpDetails.timeline)}
                      </Text>
                      <Text mt={2} fontSize="xl">
                        <strong>Communication Person:</strong>{" "}
                        {companyDetails.profile.comunication_person.cp_name}
                      </Text>
                      <Text mt={2} fontSize="xl">
                        <strong>Email:</strong>{" "}
                        {companyDetails.profile.comunication_person.cp_email}
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
                    Corporate(Company Summary):
                  </strong>
                  <Divider borderBottomWidth="4px" borderColor="red" />
                </Box>
                <p>{JSON.parse(companyDetails.profile.summary)}</p>
                {/* <br /> */}
                <VStack mt={4} align="flex-start" spacing={2}>
                  <Text>
                    <strong>Registered Office:</strong>{" "}
                    {companyDetails.profile.location.city},
                    {companyDetails.profile.location.state}{" "}
                    {companyDetails.profile.location.pincode}
                  </Text>
                  <Text>
                    <strong>Cause Area(CSR Sector Prefered):</strong>{" "}
                    {JSON.parse(companyDetails.profile.sectors).join(", ")}
                  </Text>
                </VStack>
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

export default RFPDetails;

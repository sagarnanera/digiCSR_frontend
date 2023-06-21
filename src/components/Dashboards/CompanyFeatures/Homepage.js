import React from "react";
// import "../../../CSS/homepage.css";
import PieChart from "./Piechart";
import { BsFacebook, BsTwitter, BsInstagram, BsLinkedin, BsGeoAlt, BsPhone, BsEnvelope } from "react-icons/bs";
import { Box, Button, Flex, HStack, Icon, Image, Spacer, Text, VStack } from "@chakra-ui/react";

import Carousel from 'react-elastic-carousel';
import MapChart from "./MapChart";
import HexGrid from "./HexChart";
import YearChart from "./YearChart";

function Homepage({ userType }) {

  const breakPoints = [
    { width: 500, itemsToShow: 1 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];

  return (
    <>
      <Box w="100vw" h="100vh" pos="relative">
        <Image
          className="background-img"
          src="../HOME.png"
          alt="home"
          w="100vw"
          h="100vh"
          pos="absolute"
          zIndex={-1}
        />
        <Box
          className="text-container"
          maxWidth="600px" // Set a maximum width for the text container
          mx={4} // Added horizontal margin to create space on the left side
          pt={20}
        >
          <Flex
            flexDir="column"
            justifyContent="center"
            alignItems="flex-start"
            // px={2}
            px={{ base: 2, sm: 4, md: 6, lg: 8 }}
            height="100%"
          >
            <Text
              fontFamily="Hind Vadodara"
              fontWeight="700"
              fontSize="50px"
              lineHeight="60px"
              // letterSpacing="0.8px"
              textTransform="capitalize"
              color="#000000"
            // textAlign="center"
            >
              Corporate Social Responsibility
            </Text>
            <Text
              className="second-header"
              fontSize="50px"
              fontFamily="Hind Vadodara"
              fontWeight="normal"
              mt={5}
            // textAlign="center"
            >
              with <u style={{ textDecorationColor: "#29B5E2", textDecorationThickness: "4px" }}> DigiCSR </u>
            </Text>
            <Text mt={8}
            // textAlign="center"
            >
              DigiCSR will help companies to ease their companies by generating annual report, project & auditor's report
            </Text>
          </Flex>
        </Box>
      </Box>

      <Box my={8} borderRadius="0 450px 0 0"
        bg="#CDEBFF">
        <Text className="font1" fontFamily="Hind Vadodara" fontWeight="400" fontSize="30px" pl={2} pt={2} maxWidth={"80%"}>
          CSR Expenditure <u style={{ textDecorationColor: "#29B5E2", textDecorationThickness: "2px" }}> Summary </u>
        </Text>
        {/* <Flex className="card" mt="100px" ml="50px" w="90vw" h="auto" gap="10px" gridColumn="repeat(5, 1fr)"> */}
        <Box mt={4} maxWidth={"95%"}>
          <Carousel
            breakPoints={breakPoints}
          >
            <Box w="80%" h="100px" bg="#ffffff" boxShadow="0px 4px 45px rgba(0, 0, 0, 0.25)" borderRadius="10px" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
              <Text fontSize="30px" fontFamily="Hind Vadodara" fontWeight="700">
                0
              </Text>
              <Text fontSize="15px" fontFamily="Hind Vadodara" fontWeight="400">
                Companies
              </Text>
            </Box>
            <Box w="80%" h="100px" bg="#ffffff" boxShadow="0px 4px 45px rgba(0, 0, 0, 0.25)" borderRadius="10px" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
              <Text fontSize="30px" fontFamily="Hind Vadodara" fontWeight="700">
                0
              </Text>
              <Text fontSize="15px" fontFamily="Hind Vadodara" fontWeight="400">
                Reports Generated
              </Text>
            </Box>
            <Box w="80%" h="100px" bg="#ffffff" boxShadow="0px 4px 45px rgba(0, 0, 0, 0.25)" borderRadius="10px" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
              <Text fontSize="30px" fontFamily="Hind Vadodara" fontWeight="700">
                0
              </Text>
              <Text fontSize="15px" fontFamily="Hind Vadodara" fontWeight="400">
                Auditors
              </Text>
            </Box>
            <Box w="80%" h="100px" bg="#ffffff" boxShadow="0px 4px 45px rgba(0, 0, 0, 0.25)" borderRadius="10px" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
              <Text fontSize="30px" fontFamily="Hind Vadodara" fontWeight="700">
                0
              </Text>
              <Text fontSize="15px" fontFamily="Hind Vadodara" fontWeight="400">
                Users
              </Text>
            </Box>
            <Box w="80%" h="100px" bg="#ffffff" boxShadow="0px 4px 45px rgba(0, 0, 0, 0.25)" borderRadius="10px" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
              <Text fontSize="30px" fontFamily="Hind Vadodara" fontWeight="700">
                0
              </Text>
              <Text fontSize="15px" fontFamily="Hind Vadodara" fontWeight="400">
                Active Users
              </Text>
            </Box>
          </Carousel>
        </Box>
        {/* </Flex> */}
      </Box >


      {/* <MapChart userType={userType} /> */}
      <div className="mapchart">
        <HStack>
          <VStack>
            <MapChart userType={userType} />
          </VStack>
          <HexGrid userType={userType} />
        </HStack>
      </div>
      <div className="pie">
        <YearChart userType={userType} />
      </div>

      {/* <PieChart /> */}

      < Box
        my={8} borderRadius="0 450px 0 0"
        bg="#0CB6F047" >
        <Box className="social-icons" maxW={"80%"} mx={5}>
          <Text as="h1" fontWeight={"bold"} pt={8} fontSize={"2xl"}>
            About Us
          </Text>
          <Text as="p" fontSize={"sm"} textAlign={"justify"} py={4}>
            At <b>DigiCSR</b> , we believe in the power of Corporate Social Responsibility (CSR) to make a positive impact on society and the environment. As a leading provider of CSR management solutions, we are dedicated to helping companies navigate the complex world of social and environmental responsibility.
          </Text>
        </Box>
      </Box >

      <Box my={8} borderRadius="0 450px 0 0" bg="#DAF0FC" mb={0}>
        <Box maxW={"80%"}>
          <Flex alignItems="center" p={4} justifyContent={"space-between"} wrap={"wrap"}>
            {/* <Flex alignItems="center"  */}
            <Image src="../image 7.png" pt={4} />
            <Flex justifyContent="space-between" flexDirection={"column"} mx={1} mt={4}>
              <Text>
                <Icon as={BsGeoAlt} boxSize={4} mr={2} fill="black" />
                123 Street, City
              </Text>
              <Text>
                <Icon as={BsPhone} boxSize={4} mr={2} fill="black" />
                +1 123 456 7890
              </Text>
              <Text>
                <Icon as={BsEnvelope} boxSize={4} mr={2} fill="black" />
                example@example.com
              </Text>
            </Flex>
            {/* </Flex> */}
            <Flex justifyContent="space-between" flexDirection={"column"} mt={4} mx={1}>
              <Text>Home</Text>
              <Text>RFP</Text>
              <Text>Review</Text>
              <Text>About Us</Text>
            </Flex>
            <Flex justifyContent="" mt={4} flexDirection={"column"} mx={1}>
              <Text>
                <Icon as={BsFacebook} boxSize={4} mr={2} fill="black" />
                FaceBook
              </Text>
              <Text><Icon as={BsTwitter} boxSize={4} mr={2} fill="black" />
                Twitter
              </Text>
              <Text><Icon as={BsLinkedin} boxSize={4} mr={2} fill="black" />
                LinkedIn
              </Text>
              <Text><Icon as={BsInstagram} boxSize={4} mr={2} fill="black" />
                Instagram
              </Text>
            </Flex>
          </Flex>
        </Box>
        <Flex justify={"center"} alignItems={"center"}>
          <Text justifyContent={"center"} alignItems={"center"} p={4}>&copy; 2023 DigiCSR. All Rights reserved</Text>
        </Flex>
      </Box>
    </>
  );
}

export default Homepage;

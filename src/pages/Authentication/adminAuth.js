import React from "react";
import {
  Box,
  Container,
  Divider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import AdminLogin from "../../components/Authentication/AdminLogin";

const AdminAuth = () => {
  return (
    <div
      style={{
        backgroundImage: "url('bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        minWidth: "100vw",
      }}
    >
      <Container
        maxW="xl"
        style={{
          zoom: "0.75",
          width: "125vw",
        }}
        backdropBlur={"lg"}
      >
        <Box
          d="flex"
          textAlign="center"
          p={3}
          bg="white"
          w="100%"
          m="150px 0 0 0"
          // borderRadius="lg"
          borderWidth="1px"
          backgroundColor={"skyblue"}
        >
          <Text fontSize="3xl" fontFamily="Work Sans" color={"white"}>
            DigiCSR
          </Text>
        </Box>
        <Box p={4} bg="rgba(255, 255, 255, 0.1)" w="100%" borderWidth="1px">
          <Box
            p={4}
            bg="rgba(255, 255, 255, 0.8)"
            w="100%"
            borderRadius="lg"
            borderWidth="1px"
          >
            <Tabs variant="soft-rounded" colorScheme="blue">
              <TabList mb={"1em"}>
                <Tab w={"100%"}>Login</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <strong style={{ display: "flex", justifyContent: "center" }}>
                    Welcome Back Beneficiary
                  </strong>
                  <Divider></Divider>
                  <AdminLogin />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default AdminAuth;

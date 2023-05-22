import React from "react";
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
// import Login from "../components/Authentication/Login";
import NgoAndComSignup from "../../components/Authentication/ngo_and_com_signup";
import AllUserLogin from "../../components/Authentication/AllUserLogin";

const NgoAuth = () => {
  return (
    <Box p={4} bg="white" w="100%" borderRadius="lg" borderWidth="1px">
      <Tabs variant="soft-rounded" colorScheme="orange">
        <TabList mb={"1em"}>
          <Tab w={"50%"}>Login</Tab>
          <Tab w={"50%"}>Sign Up</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <AllUserLogin />
          </TabPanel>

          <TabPanel>
            <NgoAndComSignup />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default NgoAuth;

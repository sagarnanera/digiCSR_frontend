import React from "react";
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import BenificiarySignup from "../../components/Authentication/benificiarySignup";
import AllUserLogin from "../../components/Authentication/AllUserLogin";

const BenificiaryAuth = () => {
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
            <BenificiarySignup />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default BenificiaryAuth;

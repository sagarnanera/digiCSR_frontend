import React from "react";
import {
  Box,
  Divider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import BenificiarySignup from "../../components/Authentication/benificiarySignup";
import AllUserLogin from "../../components/Authentication/AllUserLogin";

const BenificiaryAuth = () => {
  return (
    <Box
      p={4}
      bg="rgba(255, 255, 255, 0.8)"
      w="100%"
      borderRadius="lg"
      borderWidth="1px"
    >
      <Tabs variant="soft-rounded" colorScheme="blue">
        <TabList mb={"1em"}>
          <Tab w={"50%"}>Login</Tab>
          <Tab w={"50%"}>Sign Up</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <strong style={{ display: "flex", justifyContent: "center" }}>
              Welcome Back Beneficiary
            </strong>
            <Divider></Divider>
            <AllUserLogin />
          </TabPanel>

          <TabPanel>
            <strong style={{ display: "flex", justifyContent: "center" }}>
              Welcome Beneficiary
            </strong>
            <Divider></Divider>
            <BenificiarySignup />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default BenificiaryAuth;

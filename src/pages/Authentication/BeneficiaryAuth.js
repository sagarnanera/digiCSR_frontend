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
import BeneficiarySignup from "../../components/Authentication/BeneficiarySignup";
import AllUserLogin from "../../components/Authentication/AllUserLogin";

const BeneficiaryAuth = () => {
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
            <BeneficiarySignup />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default BeneficiaryAuth;

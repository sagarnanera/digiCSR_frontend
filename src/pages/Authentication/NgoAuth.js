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
import NgoAndComSignup from "../../components/Authentication/ngo_and_com_signup";
import AllUserLogin from "../../components/Authentication/AllUserLogin";

const NgoAuth = () => {
  return (
    <Box
      p={4}
      bg="rgba(255, 255, 255, 0.8)"
      w="100%"
      borderWidth="1px"
      borderRadius="lg"
    >
      <Tabs variant="soft-rounded" colorScheme="blue">
        <TabList mb={"1em"}>
          <Tab w={"50%"}>Login</Tab>
          <Tab w={"50%"}>Sign Up</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <strong style={{ display: "flex", justifyContent: "center" }}>
              Welcome back Ngo
            </strong>
            <Divider></Divider>
            <AllUserLogin />
          </TabPanel>

          <TabPanel>
            <strong style={{ display: "flex", justifyContent: "center" }}>
              Welcome Ngo
            </strong>
            <Divider></Divider>
            <NgoAndComSignup />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default NgoAuth;

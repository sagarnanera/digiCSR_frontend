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

const CompanyAuth = () => {
  return (
    <Box
      p={4}
      bg="rgba(255, 255, 255, 0.8)"
      w="100%"
      borderWidth="1px"
      // background={"transparent"}
      borderRadius={"lg"}
    >
      <Tabs variant="soft-rounded" colorScheme="blue">
        <TabList mb={"1em"}>
          <Tab w={"50%"}>Login</Tab>
          <Tab w={"50%"}>Sign Up</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <strong style={{ display: "flex", justifyContent: "center" }}>
              Welcome back Company
            </strong>
            <Divider />
            <AllUserLogin />
          </TabPanel>

          <TabPanel>
            <strong style={{ display: "flex", justifyContent: "center" }}>
              Welcome Company
            </strong>
            <Divider />
            <NgoAndComSignup />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default CompanyAuth;

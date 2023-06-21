import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import AdminNavigation from "../../Navigation/adminNavigation";
import BeneficiaryTable from "./BeneficiaryTable";

const AdminBeneficiaries = () => {
  return (
    <div
      style={{
        backgroundImage: "url('../bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        minWidth: "100vw",
      }}>
      <AdminNavigation />
      <Flex>
        <Box flex="1" p="4" marginLeft="auto">
          <Box display="flex" p="4">
            <BeneficiaryTable />
          </Box>
        </Box>
      </Flex>
    </div>
  );
};

export default AdminBeneficiaries;

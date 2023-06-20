import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import AdminNavigation from "../adminNavigation";
import BeneficiaryTable from "./BeneficiaryTable";

const AdminBeneficiaries = () => {
  return (
    <Box>
      <AdminNavigation />
      <Flex>
        <Box flex="1" p="4" marginLeft="auto">
          <Box display="flex" p="4">
            <BeneficiaryTable />
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default AdminBeneficiaries;

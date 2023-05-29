import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, IconButton } from "@chakra-ui/react";
import { FiEye, FiShare } from "react-icons/fi";

const RFPRequest = () => {
  const proposals = [
    {
      id: 1,
      proposalName: "Proposal 1",
      developmentSector: "Sector 1",
      states: ["State 1", "State 2"],
      company: "Company 1",
    },
    {
      id: 2,
      proposalName: "Proposal 2",
      developmentSector: "Sector 2",
      states: ["State 3"],
      company: "Company 2",
    },
    {
      id: 3,
      proposalName: "Proposal 3",
      developmentSector: "Sector 3",
      states: ["State 4", "State 5", "State 6"],
      company: "Company 3",
    },
  ];

  return (
    <div>
      <h1>List of Request for Proposals</h1>
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>Sr. No.</Th>
            <Th>Proposal Name</Th>
            <Th>Development Sector</Th>
            <Th>States</Th>
            <Th>Company</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {proposals.map((proposal) => (
            <Tr key={proposal.id}>
              <Td>{proposal.id}</Td>
              <Td>{proposal.proposalName}</Td>
              <Td>{proposal.developmentSector}</Td>
              <Td>{proposal.states.join(", ")}</Td>
              <Td>{proposal.company}</Td>
              <Td>
                <IconButton
                  aria-label="View proposal"
                  icon={<FiEye />}
                  marginRight="0.5rem"
                />
                <IconButton aria-label="Share proposal" icon={<FiShare />} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default RFPRequest;

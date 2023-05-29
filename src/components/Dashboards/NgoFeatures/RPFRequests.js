import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Container,
  Input,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import { FiEye, FiShare } from "react-icons/fi";
import NgoNavigation from "../ngoNavigation";

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
    {
      id: 4,
      proposalName: "Proposal 4",
      developmentSector: "Sector 3",
      states: ["State 4", "State 5", "State 6"],
      company: "Company 4",
    },
    {
      id: 5,
      proposalName: "Proposal 5",
      developmentSector: "Sector 3",
      states: ["State 4", "State 5", "State 6"],
      company: "Company 5",
    },
    {
      id: 6,
      proposalName: "Proposal 6",
      developmentSector: "Sector 3",
      states: ["State 4", "State 5", "State 6"],
      company: "Company 6",
    },
    {
      id: 7,
      proposalName: "Proposal 7",
      developmentSector: "Sector 3",
      states: ["State 4", "State 5", "State 6"],
      company: "Company 7",
    },
    {
      id: 8,
      proposalName: "Proposal 7",
      developmentSector: "Sector 3",
      states: ["State 4", "State 5", "State 6"],
      company: "Company 8",
    },
    {
      id: 9,
      proposalName: "Proposal 7",
      developmentSector: "Sector 3",
      states: ["State 4", "State 5", "State 6"],
      company: "Company 9",
    },
    {
      id: 10,
      proposalName: "Proposal 7",
      developmentSector: "Sector 3",
      states: ["State 4", "State 5", "State 6"],
      company: "Company 10",
    },
    {
      id: 11,
      proposalName: "Proposal 7",
      developmentSector: "Sector 3",
      states: ["State 4", "State 5", "State 6"],
      company: "Company 11",
    },
    {
      id: 12,
      proposalName: "Proposal 7",
      developmentSector: "Sector 3",
      states: ["State 4", "State 5", "State 6"],
      company: "Company 12",
    },
    {
      id: 13,
      proposalName: "Proposal 7",
      developmentSector: "Sector 3",
      states: ["State 4", "State 5", "State 6"],
      company: "Company 13",
    },
  ];

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const pageCount = Math.ceil(proposals.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = proposals.slice(indexOfFirstRow, indexOfLastRow);

  const handleRowsPerPageChange = (event) => {
    const value = parseInt(event.target.value);
    setRowsPerPage(value);
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  // const renderPageNumbers = () => {
  //   const pageNumbers = [];
  //   for (let i = 1; i <= pageCount; i++) {
  //     pageNumbers.push(
  //       <Button
  //         key={i}
  //         onClick={() => setCurrentPage(i)}
  //         variant={currentPage === i ? "solid" : "outline"}
  //       >
  //         {i}
  //       </Button>
  //     );
  //   }
  //   return pageNumbers;
  // };
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageIcons = 3; // Maximum number of page icons to display

    if (pageCount <= maxPageIcons) {
      // If total pages are less than or equal to maxPageIcons, display all page numbers
      for (let i = 1; i <= pageCount; i++) {
        pageNumbers.push(
          <Button
            key={i}
            onClick={() => setCurrentPage(i)}
            variant={currentPage === i ? "solid" : "ghost"}
          >
            {i}
          </Button>
        );
      }
    } else {
      // Display page numbers with ellipsis
      const visiblePageNumbers = Math.min(maxPageIcons - 2, pageCount - 2); // Number of page numbers to show excluding first and last page
      const startPage = Math.max(
        2,
        currentPage - Math.floor(visiblePageNumbers / 2)
      );
      const endPage = Math.min(
        pageCount - 1,
        startPage + visiblePageNumbers - 1
      );

      // Display first page number
      pageNumbers.push(
        <Button
          key={1}
          onClick={() => setCurrentPage(1)}
          variant={currentPage === 1 ? "solid" : "ghost"}
        >
          1
        </Button>
      );

      // Display ellipsis before the first visible page number
      if (startPage > 2) {
        pageNumbers.push(<Button key="ellipsis-prev" variant={"ghost"}>...</Button>);
      }

      // Display visible page numbers
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <Button
            key={i}
            onClick={() => setCurrentPage(i)}
            variant={currentPage === i ? "solid" : "ghost"}
          >
            {i}
          </Button>
        );
      }

      // Display ellipsis after the last visible page number
      if (endPage < pageCount - 1) {
        pageNumbers.push(
          <Button key="ellipsis-next" variant={"ghost"}>
            ...
          </Button>
        );
      }

      // Display last page number
      pageNumbers.push(
        <Button
          key={pageCount}
          onClick={() => setCurrentPage(pageCount)}
          variant={currentPage === pageCount ? "solid" : "ghost"}
        >
          {pageCount}
        </Button>
      );
    }

    return pageNumbers;
  };
  return (
    <Container centerContent>
      <NgoNavigation />
      <div
        style={{
          marginTop: "10vh",
          backgroundColor: "white",
          width: "70vw",
          paddingBottom: "2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "2rem",
          }}
        >
          <div style={{ width: "80%" }}>
            <h1 style={{ color: "white", textAlign: "center" }}>
              List of Request for Proposals
            </h1>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Input
                type="number"
                min={1}
                max={proposals.length}
                value={rowsPerPage}
                onChange={handleRowsPerPageChange}
                style={{ width: "120px", marginRight: "1rem" }}
              />
              <span>Rows per page</span>
            </div>
            <Table variant="striped" colorScheme="gray" size="sm">
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
                {currentRows.map((proposal, index) => (
                  <Tr key={proposal.id}>
                    <Td>{indexOfFirstRow + index + 1}</Td>
                    <Td>{proposal.proposalName}</Td>
                    <Td>{proposal.developmentSector}</Td>
                    <Td>{proposal.states.join(", ")}</Td>
                    <Td>{proposal.company}</Td>
                    <Td>
                      <IconButton
                        aria-label="View proposal"
                        icon={<FiEye />}
                        marginRight="0.5rem"
                        variant={"ghost"}
                      />
                      <IconButton
                        aria-label="Share proposal"
                        variant={"ghost"}
                        icon={<FiShare />}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "1rem",
              }}
            >
              <ButtonGroup variant="outline" spacing="4">
                <Button
                  disabled={currentPage === 1}
                  onClick={handlePrevPage}
                  variant={"ghost"}
                >
                  Previous
                </Button>
                {renderPageNumbers()}
                <Button
                  disabled={currentPage === pageCount}
                  onClick={handleNextPage}
                  variant={"ghost"}
                >
                  Next
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default RFPRequest;

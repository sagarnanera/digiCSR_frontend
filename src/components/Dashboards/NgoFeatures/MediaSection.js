// import React from "react";
// import NgoNavigation from "../ngoNavigation";

// const MediaSection = () => {
//   return (
//     <div>
//       <NgoNavigation />
//       MediaSection
//     </div>
//   );
// };

// export default MediaSection;
import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Container,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import { FiEye, FiShare } from "react-icons/fi";
import NgoNavigation from "../ngoNavigation";
import { proposals } from "../../rfpData";
const RFPRequest = () => {
  const rowsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const pageCount = Math.ceil(proposals.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const [currentRows, setCurrentRows] = useState(
    proposals.slice(indexOfFirstRow, indexOfLastRow)
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/rfps?page=${currentPage}`
        );
        const data = await response.json();
        if (data === []) {
          setCurrentPage(currentPage === 1 ? currentPage : currentPage - 1);
        }
        setCurrentRows(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePrevPage = () => {
    if (currentPage === 1) {
      return;
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentRows.length < 10) {
      return;
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

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
        pageNumbers.push(
          <Button key='ellipsis-prev' variant={"ghost"}>
            ...
          </Button>
        );
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
          <Button key='ellipsis-next' variant={"ghost"}>
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
            <Table variant='striped' colorScheme='gray' size='sm'>
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
                    <Td>{proposal.title}</Td>
                    <Td>{proposal.sectors}</Td>
                    <Td>{proposal.states.join(",")}</Td>
                    <Td>{proposal.company_name}</Td>
                    <Td>
                      <IconButton
                        aria-label='View proposal'
                        icon={<FiEye />}
                        marginRight='0.5rem'
                        variant={"ghost"}
                      />
                      <IconButton
                        aria-label='Share proposal'
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
              <ButtonGroup variant='outline' spacing='4'>
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
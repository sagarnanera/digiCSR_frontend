import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Container,
  // Input,
  Button,
  ButtonGroup,
  Tooltip,
} from "@chakra-ui/react";
import { FiEye, FiShare } from "react-icons/fi";
import NgoNavigation from "../ngoNavigation";
import { proposals } from "../../rfpData";
import "../../../CSS/rfpTable.css";
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
  // const handleRowsPerPageChange = (event) => {
  //   const value = parseInt(event.target.value);
  //   setRowsPerPage(value);
  //   setCurrentPage(1);
  // };

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
          <Button key="ellipsis-prev" variant={"ghost"}>
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
      <div className="container">
        <h1 className="title">List of Request for Proposals</h1>
        {/* <div className="input-container">
          <Input
            type="number"
            min={1}
            max={proposals.length}
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            style={{ width: "120px", marginRight: "1rem" }}
          />
          <span className="label">Rows per page</span>
        </div> */}
        <div className="table-container">
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
                  <Td>{proposal.title}</Td>
                  <Td maxW={"20vw"}>
                    {proposal.sectors && proposal.sectors.length > 5 ? (
                      <Tooltip label={proposal.sectors.join(", ")}>
                        <span>
                          {proposal.sectors.slice(0, 5).join(", ")}
                          {proposal.sectors.length > 5 ? ", ..+ more" : ""}
                        </span>
                      </Tooltip>
                    ) : (
                      <span>
                        {proposal.sectors && proposal.sectors.join(", ")}
                      </span>
                    )}
                  </Td>
                  <Td>
                    {proposal.states.length > 5 ? (
                      <Tooltip label={proposal.states.join(", ")}>
                        <span>
                          {proposal.states.slice(0, 5).join(", ")}
                          {", ..+" + (proposal.states.length - 5) + " more"}
                        </span>
                      </Tooltip>
                    ) : (
                      <span>
                        {proposal.states.map((state, stateIndex) => (
                          <span key={stateIndex}>
                            {state}
                            {stateIndex !== proposal.states.length - 1
                              ? ", "
                              : ""}
                          </span>
                        ))}
                      </span>
                    )}
                  </Td>
                  <Td>{proposal.company_name}</Td>
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
        </div>
        <div className="pagination">
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
    </Container>
  );
};

export default RFPRequest;

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
  HStack,
  Input,
  Box,
} from "@chakra-ui/react";
import { FiEye, FiShare } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "../../../CSS/rfpTable.css";
import RequestAmount from "./requestAmount";
import NgoNavigation from "../ngoNavigation";
// import config from "../../config";

const RFPRequest = () => {
  const navigate = useNavigate();
  // const rowsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const [currentRows, setCurrentRows] = useState([]);
  const [showShareForm, setShowShareForm] = useState(false);
  const [showRFPDetails, setShowRFPDetails] = useState(false);

  const [selectedRowData, setSelectedRowData] = useState(null);
  const [selectedRFPId, setSelectedRFPId] = useState(null);
  // const [documentCount, setDocumentCount] = useState(0);
  const pageCount = Math.ceil(20 / rowsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/rfps?page=${currentPage}`,
          {
            headers: {
              authorization: `${localStorage.getItem("NgoAuthToken")}`,
            },
          }
        );
        const data = await response.json();
        if (data === []) {
          setCurrentPage(currentPage === 1 ? currentPage : currentPage - 1);
        }
        setCurrentRows(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [currentPage]);
  // useEffect(() => {
  //   const fetchDocumentCount = async () => {
  //     try {
  //       const response = await fetch("http://localhost:4000/rfp-count");
  //       const data = await response.json();
  //       setDocumentCount(data.count);
  //       console.log(documentCount);
  //     } catch (error) {
  //       console.error("Error fetching document count:", error);
  //     }
  //   };

  //   fetchDocumentCount();
  // });
  const handleRowsPerPageChange = (event) => {
    const value = parseInt(event.target.value);
    setRowsPerPage(value);
    setCurrentPage(1);
  };

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

  const handleShareClick = (rowData) => {
    setSelectedRowData(rowData);
    console.log(rowData);
    setSelectedRFPId(rowData._id);
    console.log(selectedRFPId);
    setShowShareForm(true);
  };

  const handleShowDetails = (rowData) => {
    setSelectedRFPId(rowData._id);
    console.log(selectedRFPId);
    // navigate("/Ngo/rfpdetails", {
    //   state: { rfpID: selectedRFPId },
    //   replace: true,
    // });
    setShowRFPDetails(true);
  };
  return (
    <div
      style={{
        backgroundImage: "url('../bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        minWidth: "100vw",
      }}
    >
      <Container centerContent>
        <NgoNavigation />
        <Box
          d="flex"
          textAlign="center"
          p={3}
          bg="white"
          w="100%"
          m="6% 0 0px 0"
          borderRadius="lg"
          borderWidth="1px"
          backgroundColor={"skyblue"}
        >
          <h1 className="title">List of Request for Proposals</h1>
        </Box>
        <div className="container">
          <HStack w={"100%"} justifyContent="space-between">
            <div className="input-container">
              <Input
                type="number"
                min={1}
                ml={"5vw"}
                value={rowsPerPage}
                onChange={handleRowsPerPageChange}
                style={{ width: "120px", marginRight: "1rem" }}
              />
              <span className="label">Rows per page</span>
            </div>
          </HStack>

          <div className="table-container">
            <Table variant="simple" colorScheme="blue" size="sm">
              <Thead style={{ background: "skyblue", marginBottom: "1rem" }}>
                <Tr>
                  <Th>Sr. No.</Th>
                  <Th>Proposal Name</Th>
                  <Th>Development Sector</Th>
                  <Th>States</Th>
                  <Th>Company Name</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody style={{ zoom: 0.85 }}>
                {currentRows.map((proposal, index) => (
                  <Tr key={proposal._id}>
                    <Td className="divider">{indexOfFirstRow + index + 1}</Td>
                    <Td className="divider">{proposal.title}</Td>
                    <Td className="divider" maxW={"20vw"}>
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
                    <Td className="divider">
                      {proposal.states.length > 3 ? (
                        <Tooltip label={proposal.states.join(", ")}>
                          <span>
                            {proposal.states.slice(0, 3).join(", ")}
                            {", ..+" + (proposal.states.length - 3) + " more"}
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
                    <Td className="divider">{proposal.company_name}</Td>
                    <Td>
                      <IconButton
                        aria-label="View proposal"
                        icon={<FiEye />}
                        marginLeft="0.5rem"
                        variant={"ghost"}
                        onClick={() => {
                          // setSelectedRFPId(proposal._id);
                          handleShowDetails(proposal);
                        }}
                        colorScheme="blue"
                        color={"blue"}
                      />
                      <IconButton
                        aria-label="Share proposal"
                        marginLeft="0.5rem"
                        variant={"ghost"}
                        icon={<FiShare />}
                        colorScheme="blue"
                        color={"blue"}
                        onClick={() => {
                          handleShareClick(proposal);
                        }}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            {showShareForm && (
              <RequestAmount
                rfpID={selectedRFPId}
                rowData={selectedRowData}
                onClose={() => setShowShareForm(false)}
              />
            )}
            {showRFPDetails &&
              navigate("/Ngo/rfpdetails", {
                state: {
                  rfpID: selectedRFPId,
                },
              })}
          </div>
          <div className="pagination">
            <ButtonGroup variant="outline" spacing="4">
              <Button
                disabled={currentPage === 1}
                onClick={handlePrevPage}
                variant={"ghost"}
                color={"skyblue"}
                colorScheme="blue"
              >
                Previous
              </Button>
              {renderPageNumbers()}
              <Button
                disabled={currentPage === pageCount}
                onClick={handleNextPage}
                variant={"ghost"}
                color={"skyblue"}
                colorScheme="blue"
              >
                Next
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default RFPRequest;

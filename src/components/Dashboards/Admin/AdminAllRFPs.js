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
  Button,
  ButtonGroup,
  Tooltip,
  HStack,
  Input,
  Box,
  Select,
  VStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FiEye, FiTrash } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "../../../CSS/rfpTable.css";
import NgoNavigation from "../NgoNavigation";
import { fetchStateName, fetchStates } from "../../geoData";
import { sectorOptions } from "../../sectorData";
import DeleteConfirmationDialog from "../CompanyFeatures/RFPDeleteAlert";
// import config from "../../config";

const AdminRFP = () => {
  const navigate = useNavigate();
  // const rowsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentRows, setCurrentRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [documentCount, setDocumentCount] = useState(1);
  const pageCount = Math.ceil(documentCount / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const [showRFPDetails, setShowRFPDetails] = useState(false);
  const [selectedRFPId, setSelectedRFPId] = useState(null);
  const [states, setStates] = useState([]);
  const [selectedstates, setselectedStates] = useState("");
  const [selectedsector, setselectedSector] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const toast = useToast();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRFP, setSelectedRFP] = useState(null);
  useEffect(() => {
    const getStates = async () => {
      const fetchedStates = await fetchStates();
      setStates(fetchedStates);
    };
    getStates();
  }, []);
  const handleStateChange = async (stateId) => {
    const fetchedstateName = await fetchStateName(stateId);
    setselectedStates(fetchedstateName);
  };
  const handleSectorChange = async (selectedSector) => {
    setselectedSector(selectedSector);
  };

  const fetchData = async () => {
    try {
      const result = localStorage.getItem("AdminAuthToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          authorization: result,
        },
      };
      const response = await fetch(`http://localhost:4000/rfps`, {
        headers: config.headers,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch RFPs.");
      }
      const data = await response.json();

      // Apply filtering based on selected state and sector
      let filteredData = data;

      if (selectedstates !== "") {
        console.log(selectedstates);
        filteredData = filteredData.filter((proposal) =>
          proposal.states.includes(selectedstates)
        );
      }

      if (selectedsector !== "") {
        console.log(selectedsector);
        filteredData = filteredData.filter((proposal) =>
          proposal.sectors.includes(selectedsector)
        );
      }

      if (filteredData.length === 0) {
        setCurrentPage((prevPage) =>
          prevPage === 1 ? prevPage : prevPage - 1
        );
      }

      setFilteredData(filteredData); // Update the filteredData state once all filters have been applied
      setDocumentCount(filteredData.length);
      setCurrentRows(
        filteredData.slice(
          (currentPage - 1) * rowsPerPage,
          currentPage * rowsPerPage
        )
      );
      console.log(filteredData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [currentPage, rowsPerPage, selectedsector, selectedstates]);

  const handleRowsPerPageChange = (event) => {
    const value = parseInt(event.target.value);
    setRowsPerPage(value);
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    if (currentPage === 1) {
      return;
    } else {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    const remainingData = documentCount - currentPage * rowsPerPage;
    if (remainingData <= 0) {
      return;
    } else {
      setCurrentPage((prevPage) => prevPage + 1);
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
          <Button key="ellipsis-prev" variant="ghost">
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
          <Button key="ellipsis-next" variant="ghost">
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

  const handleShowDetails = (rowData) => {
    setSelectedRFPId(rowData._id);
    console.log(selectedRFPId);
    // navigate("/Ngo/rfpdetails", {
    //   state: { rfpID: selectedRFPId },
    //   replace: true,
    // });
    setShowRFPDetails(true);
  };
  const handleDeleteRFP = (rfp) => {
    setSelectedRFP(rfp);
    setIsDeleteDialogOpen(true);
  };
  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
  };
  const handleDeleteConfirmation = async () => {
    setIsDeleteDialogOpen(false);
    const rfpID = selectedRFP._id;

    // Perform the delete operation here
    try {
      const response = await fetch(
        `http://localhost:4000/rfp/delete/${rfpID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `${localStorage.getItem("AdminAuthToken")}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        toast({
          title: "RFP Deleted Successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        fetchData();
      } else {
        console.error("Failed to delete RFP:", data.message);
      }
    } catch (error) {
      console.error("Failed to delete RFP:", error);
    }
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
          <HStack w={"90%"} justifyContent="space-between" mb={"1%"}>
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
            <Box>
              <HStack
                mt={"-5"}
                display={"flex"}
                justifyContent={"center"}
                flexWrap={"wrap"}
              >
                <VStack>
                  <Text ml={"-18vw"}> State Filter </Text>
                  <Select
                    id="state"
                    onChange={(e) => handleStateChange(e.target.value)}
                    size={"sm"}
                    style={{ maxWidth: "20rem" }}
                    // value={selectedstates}
                  >
                    <option value="">Select a state</option>
                    {states.map((state) => (
                      <option key={state.geonameId} value={state.geonameId}>
                        {state.name}
                      </option>
                    ))}
                  </Select>
                </VStack>
                <VStack>
                  <Text ml={"-18vw"}> Sector Filter </Text>
                  <Select
                    id="sector"
                    onChange={(e) => handleSectorChange(e.target.value)}
                    size="sm"
                    style={{ maxWidth: "20rem" }}
                    value={selectedsector}
                  >
                    <option value="">Select a sector</option>
                    {sectorOptions.map((option) => (
                      <option key={option.id} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                </VStack>
              </HStack>
            </Box>
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
                        aria-label="View proposal"
                        icon={<FiTrash />}
                        marginLeft="0.5rem"
                        variant={"ghost"}
                        onClick={() => {
                          handleDeleteRFP(proposal);
                        }}
                        colorScheme="blue"
                        color={"blue"}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            {showRFPDetails &&
              navigate("/Ngo/rfpdetails", {
                state: {
                  rfpID: selectedRFPId,
                },
              })}
            {isDeleteDialogOpen && (
              <DeleteConfirmationDialog
                isOpen={isDeleteDialogOpen}
                onClose={handleDeleteCancel}
                onDelete={handleDeleteConfirmation}
              />
            )}
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

export default AdminRFP;

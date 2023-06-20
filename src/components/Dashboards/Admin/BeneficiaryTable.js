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
  HStack,
  Input,
  Box,
  useToast,
} from "@chakra-ui/react";
import { FiTrash } from "react-icons/fi";
import "../../../CSS/rfpTable.css";
import DeleteConfirmationDialog from "../CompanyFeatures/RFPDeleteAlert";

const BeneficiaryTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentRows, setCurrentRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [documentCount, setDocumentCount] = useState(1);
  const pageCount = Math.ceil(documentCount / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const toast = useToast();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userId, setuserId] = useState("");

  const fetchData = async () => {
    try {
      const result = localStorage.getItem("AdminAuthToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          authorization: result,
        },
      };
      const response = await fetch(`http://localhost:4000/Beneficiaries`, {
        headers: config.headers,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch Beneficiaries.");
      }
      const data = await response.json();
      console.log(data.beneficiary);
      // Apply filtering based on selected state and sector
      if (data.beneficiary.length === 0) {
        setCurrentPage((prevPage) =>
          prevPage === 1 ? prevPage : prevPage - 1
        );
      }

      setDocumentCount(data.beneficiary.length);
      setCurrentRows(
        data.beneficiary.slice(
          (currentPage - 1) * rowsPerPage,
          currentPage * rowsPerPage
        )
      );
      console.log(data.beneficiary);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [currentPage, rowsPerPage]);

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

  const handleDeleteRFP = (user) => {
    setuserId(user._id);
    setIsDeleteDialogOpen(true);
  };
  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
  };
  const handleDeleteConfirmation = async () => {
    console.log(userId);
    setIsDeleteDialogOpen(false);

    // Perform the delete operation here
    try {
      const response = await fetch(`http://localhost:4000/Beneficiary/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `${localStorage.getItem("AdminAuthToken")}`,
        },
        body: JSON.stringify({
          _id: userId,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        toast({
          title: "Beneficiary Deleted Successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        fetchData();
      } else {
        console.error("Failed to delete Beneficiary:", data.message);
      }
    } catch (error) {
      console.error("Failed to delete Beneficiary:", error);
    }
  };
  return (
    <>
      <Container centerContent>
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
          <h1 className="title">List of Beneficiaries</h1>
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
          </HStack>

          <div className="table-container">
            <Table variant="simple" colorScheme="blue" size="sm">
              <Thead style={{ background: "skyblue", marginBottom: "1rem" }}>
                <Tr>
                  <Th>Sr. No.</Th>
                  <Th>User Name</Th>
                  <Th>Email</Th>
                  <Th>Phone No.</Th>
                  <Th>Addhar No.</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody style={{ zoom: 0.85 }}>
                {currentRows.map((user, index) => (
                  <Tr key={user._id}>
                    <Td className="divider">{indexOfFirstRow + index + 1}</Td>
                    <Td className="divider">{user.name}</Td>
                    <Td className="divider" maxW={"20vw"}>
                      {user.email}
                    </Td>
                    <Td className="divider">{user.mobile_no}</Td>
                    <Td className="divider">{user.aadhar_no}</Td>
                    <Td>
                      <IconButton
                        aria-label="View user"
                        icon={<FiTrash />}
                        marginLeft="0.5rem"
                        variant={"ghost"}
                        onClick={() => {
                          handleDeleteRFP(user);
                        }}
                        colorScheme="blue"
                        color={"blue"}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
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
    </>
  );
};

export default BeneficiaryTable;

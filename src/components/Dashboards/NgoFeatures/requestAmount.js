import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import jwt_decode from "jwt-decode";

const RequestAmount = ({ rfpID, rowData, onClose }) => {
  const [amount, setAmount] = useState("");
  const [ngoId, setNgoId] = useState("");
  const { isOpen, onOpen, onClose: onAlertDialogClose } = useDisclosure();
  const cancelRef = React.useRef();
  const toast = useToast();
  useEffect(() => {
    const token = localStorage.getItem("NgoAuthToken");
    const decodedToken = jwt_decode(token);
    setNgoId(decodedToken._id);
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    onOpen();
  };
  const handleConfirmRequest = async () => {
    try {
      const requestBody = {
        rfpID: rfpID,
        amount: parseFloat(amount),
        ngoId: ngoId,
      };

      const response = await fetch("http://localhost:4000/accept-rfp", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `${localStorage.getItem("NgoAuthToken")}`,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        // Success message
        toast({
          title: "Donation requested Successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        console.log(data.message);
      } else {
        // Error message
        console.error(data.message);
      }

      // Close the form
      onClose();
    } catch (error) {
      console.error("Error accepting RFP:", error);
      // Handle the error
    } finally {
      onAlertDialogClose();
    }
  };

  return (
    <>
      <Modal isOpen={true} onClose={onClose} size={"sm"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Request For Donation</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            style={{
              zoom: "0.75",
            }}
          >
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Proposal Name</FormLabel>
                <Input type="text" value={rowData.rfp.title} isReadOnly />
              </FormControl>

              <FormControl>
                <FormLabel>Company's Name</FormLabel>
                <Input
                  type="text"
                  value={rowData.company.company_name}
                  isReadOnly
                />
              </FormControl>
              <FormControl>
                <FormLabel>Development Sector</FormLabel>
                <Input
                  type="text"
                  value={rowData.rfp.sectors && rowData.rfp.sectors.join(", ")}
                  isReadOnly
                />
              </FormControl>
              <FormControl>
                <FormLabel>States</FormLabel>
                <Input
                  type="text"
                  value={rowData.rfp.states && rowData.rfp.states.join(", ")}
                  isReadOnly
                />
              </FormControl>
              <FormControl>
                <FormLabel>Amount</FormLabel>
                <Input
                  type="number"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                />
              </FormControl>

              {/* Display the relevant data from the rowData */}

              {/* Add other form fields as needed */}
              <Button type="submit" mt={4} colorScheme="blue">
                Request
              </Button>
            </form>
          </ModalBody>
          <ModalFooter>
            {/* Add additional footer content if needed */}
          </ModalFooter>
        </ModalContent>
      </Modal>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onAlertDialogClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirm Request
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to request the specified amount as a
              donation?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onAlertDialogClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={handleConfirmRequest} ml={3}>
                Request
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default RequestAmount;

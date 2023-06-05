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
} from "@chakra-ui/react";
import jwt_decode from "jwt-decode";

const RequestAmount = ({ rfpID,rowData, onClose }) => {
  const [amount, setAmount] = useState("");
  const [ngoId, setNgoId] = useState("");
  // const toast = useToast();
  useEffect(() => {
    const token = localStorage.getItem("NgoAuthToken");
    const decodedToken = jwt_decode(token);
    setNgoId(decodedToken._id);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const requestBody = {
      rfpID: rfpID,
      amount: parseFloat(amount),
      ngoId: ngoId, // Replace with the actual NGO ID
    };
    console.log(rfpID,ngoId);
    try {
      const response = await fetch("http://localhost:4000/accept-rfp", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        // Success message
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
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Share Proposal</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Proposal Name</FormLabel>
              <Input type="text" value={rowData.title} isReadOnly />
            </FormControl>

            <FormControl>
              <FormLabel>Company's Name</FormLabel>
              <Input type="text" value={rowData.company_name} isReadOnly />
            </FormControl>
            <FormControl>
              <FormLabel>Development Sector</FormLabel>
              <Input
                type="text"
                value={rowData.sectors && rowData.sectors.join(", ")}
                isReadOnly
              />
            </FormControl>
            <FormControl>
              <FormLabel>Development Sector</FormLabel>
              <Input
                type="text"
                value={rowData.states && rowData.states.join(", ")}
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
  );
};

export default RequestAmount;

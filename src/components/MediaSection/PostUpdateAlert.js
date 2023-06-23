import React, { useRef } from "react";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
} from "@chakra-ui/react";

const PostUpdateAlert = ({ isOpen, onClose, onDelete }) => {
    const cancelRef = useRef();

    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Update Post
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Are you sure you want to Update Post ?
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="blue" onClick={onDelete} ml={3}>
                            Update
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};

export default PostUpdateAlert;

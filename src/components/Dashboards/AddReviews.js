import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Textarea,
  HStack,
  IconButton,
  Box,
  Heading,
  Text,
  useToast,
  Flex,
  VStack,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
// import jwt_decode from "jwt-decode";

const ReviewComponent = ({ ngoID, userType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingCounts, setRatingCounts] = useState(
    Array.from({ length: 5 }, () => 0)
  );
  const toast = useToast();
  // const [ngoId, setNgoId] = useState("");
  const [showAllReviews, setShowAllReviews] = useState(false);

  const handleViewAllReviews = () => {
    setShowAllReviews(true);
  };

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);
  useEffect(() => {
    fetchReviews();
  }, [ngoID, userType]);

  const fetchReviews = async () => {
    var options;

    if (userType === "company" || userType === "beneficiary") {
      const token =
        userType === "company"
          ? localStorage.getItem("CompanyAuthToken")
          : localStorage.getItem("BenificiaryAuthToken");

      options = {
        headers: {
          "Content-type": "application/json",
          authorization: token,
        },
      };
    } else if (userType === "admin") {
      const token = localStorage.getItem("AdminAuthToken");
      options = {
        headers: {
          "Content-type": "application/json",
          authorization: token,
        },
      };
      console.log(options);
    } else {
      const token = localStorage.getItem("NgoAuthToken");
      options = {
        headers: {
          "Content-type": "application/json",
          authorization: token,
        },
      };
      console.log(options);
      // setNgoId(jwt_decode(token)._id);
    }
    try {
      console.log(ngoID);
      const response = await fetch(
        `http://localhost:4000/get-reviews/${ngoID}`,
        {
          method: "GET",
          headers: options.headers,
        }
      );
      const data = await response.json();
      if (!response.ok) {
        console.log(data);
        throw new Error("Failed to fetch the reviews.");
      }
      setReviews(data.reviews);
      calculateAverageRating(data.reviews);
    } catch (error) {
      console.log(error);
    }
  };

  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) {
      setAverageRating(0);
      setRatingCounts(Array.from({ length: 5 }, () => 0));
      return;
    }

    const newRatingCounts = Array.from({ length: 5 }, () => 0);
    let totalRating = 0;

    reviews.forEach((review) => {
      totalRating += review.rating;
      if (review.rating >= 1 && review.rating <= 5) {
        newRatingCounts[review.rating - 1]++;
      }
    });

    const averageRating = totalRating / reviews.length;

    setAverageRating(averageRating);
    setRatingCounts(newRatingCounts);
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleReviewTextChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleSubmitReview = async () => {
    var options;

    if (userType === "company" || userType === "beneficiary") {
      const token =
        userType === "company"
          ? localStorage.getItem("CompanyAuthToken")
          : localStorage.getItem("BenificiaryAuthToken");

      options = {
        headers: {
          "Content-type": "application/json",
          authorization: token,
        },
      };
    }
    try {
      const response = await fetch("http://localhost:4000/add-review", {
        method: "POST",
        headers: options.headers,
        body: JSON.stringify({
          ngo: ngoID,
          rating: rating,
          review: reviewText,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to submit the review.");
      }
      const data = await response.json();
      console.log("Review submitted:", data);
      toast({
        title: "Review Added Succesfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      // Reset the state
      setRating(0);
      setReviewText("");

      // Close the modal
      fetchReviews();
      handleCloseModal();
    } catch (error) {
      console.log(error);
      // Handle the error (e.g., display an error message)
    }
  };

  return (
    <Box display={"flex"} justifyContent={"center"}>
      <Box
        mt={"2%"}
        width={"76%"}
        mb={"2%"}
        borderRadius={"10px"}
        borderWidth={"1px"}
        boxShadow="2px 4px 6px black"
        borderColor={"skyblue"}
        bgColor={"white"}
        height={"80vh"}
        maxH={"80vh"}
        fontFamily={"serif"}
        overflowY={"auto"}
      >
        <Box
          display={"flex"}
          justifyContent={"flex-start"}
          ml={"5%"}
          mt={"3%"}
          // mb={"3%"}
        >
          <Text fontSize={"2xl"}>
            <strong>Reviews</strong>
          </Text>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"flex-end"}
          mr={"5%"}
          mt={"-3%"}
          mb={"3%"}
        >
          {(userType === "company" || userType === "beneficiary") && (
            <Button
              bg="skyblue"
              color="white"
              w={"fit-content"}
              boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
              _hover={{ boxShadow: "0px 4px 6px skyblue" }}
              _active={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}
              onClick={handleOpenModal}
              ml={"70%"}
            >
              Add Review
            </Button>
          )}
        </Box>
        <HStack>
          <Box
            left={0}
            top={0}
            h="100%"
            overflow="auto"
            padding="1%"
            w={"25%"}
            maxW="25%"
            bg="linear-gradient(174.6deg, rgba(255, 255, 255, 0.6825) 1.74%, rgba(255, 255, 255, 0.75) 53.41%, rgba(255, 255, 255, 0.739748) 76.16%, rgba(255, 255, 255, 0.6075) 97.17%)"
          >
            <Text>Average Rating: </Text>
            <Heading
              color="skyblue"
              fontSize="4xl"
              marginBottom="0.7rem"
              ml={"35%"}
            >
              {averageRating.toFixed(1)}
            </Heading>
            <HStack ml={"20%"}>
              {Array.from({ length: 5 }).map((_, index) => (
                <StarIcon
                  key={index}
                  color={index < averageRating ? "gold" : "gray.200"}
                />
              ))}
            </HStack>
            <Box mt="4" ml={"4"}>
              {ratingCounts.map((count, index) => (
                <Flex key={index} align="center" mb="2">
                  <Text minWidth="50px" mr="2">{`${index + 1} Stars${
                    count > 1 ? "s" : ""
                  }`}</Text>
                  <Box w={`${count * 20}%`} h="20px" bg="yellow.400"></Box>
                  <Text ml="2"></Text>
                </Flex>
              ))}
            </Box>
          </Box>
          <VStack>
            <Text mr={"40vw"}>
              <strong>Top Reviews:</strong>
            </Text>
            <Box>
              {displayedReviews.map((review) => (
                <Box
                  key={review._id}
                  borderWidth="1px"
                  borderRadius="10px"
                  bgColor="rgba(135, 206, 235, 0.05)"
                  borderColor="skyblue"
                  p="4"
                  my="2"
                  w="50vw"
                >
                  <HStack>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <StarIcon
                        key={index}
                        color={index < review.rating ? "gold" : "gray.200"}
                      />
                    ))}
                  </HStack>
                  <Text
                    fontSize="13"
                    color="gray.500"
                    display="flex"
                    justifyContent="flex-start"
                  >
                    {review.companyReviewer ? "by company" : "by beneficiary"}
                  </Text>
                  <Text>{review.review}</Text>
                </Box>
              ))}
              {!showAllReviews && (
                <Button
                  bg="skyblue"
                  color="white"
                  w="fit-content"
                  boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
                  _hover={{ boxShadow: "0px 4px 6px skyblue" }}
                  _active={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}
                  mt={5}
                  onClick={handleViewAllReviews}
                >
                  View All Reviews
                </Button>
              )}
            </Box>
          </VStack>
        </HStack>
        <Modal isOpen={isOpen} onClose={handleCloseModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Write a Review</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <HStack spacing={2} mb={4}>
                {[1, 2, 3, 4, 5].map((value) => (
                  <IconButton
                    key={value}
                    aria-label={`Star ${value}`}
                    icon={<StarIcon />}
                    color={value <= rating ? "yellow.500" : "gray.200"}
                    onClick={() => handleStarClick(value)}
                  />
                ))}
              </HStack>
              <Textarea
                value={reviewText}
                onChange={handleReviewTextChange}
                placeholder="Write your review..."
                size="lg"
                height="200px"
              />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={handleSubmitReview}>
                Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};

export default ReviewComponent;

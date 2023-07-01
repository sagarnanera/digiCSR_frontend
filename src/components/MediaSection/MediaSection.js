import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  useMediaQuery,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import PostCard from "./PostCard";
import NavBar from "../NavBar";
import { FiPlus } from "react-icons/fi";

const MediaSection = ({ userType }) => {
  const [blogs, setBlogs] = useState([]);

  const [isLSmallScreen] = useMediaQuery("(max-width: 800px)");

  const navigate = useNavigate();
  // const toast = useToast();

  useEffect(() => {
    // Fetch all blogs when the component mounts
    const fetchBlogs = async () => {
      const url = "http://localhost:4000/media/posts";
      var options;

      if (userType === "company" || userType === "beneficiary") {
        const token =
          userType === "company"
            ? localStorage.getItem("CompanyAuthToken")
            : localStorage.getItem("BeneficiaryAuthToken");

        options = {
          headers: {
            "Content-type": "application/json",
            Authorization: token,
          },
        };
      } else {
        const token =
          userType === "ngo"
            ? localStorage.getItem("NgoAuthToken")
            : localStorage.getItem("AdminAuthToken");

        options = {
          headers: {
            "Content-type": "application/json",
            Authorization: token,
          },
        };
      }

      try {
        const res = await fetch(url, options);
        const blogsData = await res.json();
        console.log(blogsData);
        setBlogs(blogsData.postsData);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  if (!blogs || blogs.length === 0) {
    return (
      <div
        style={{
          backgroundImage: "url('../bg.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <NavBar userType={userType} />

        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
          maxWidth={{ base: "95vw", lg: "80vw" }}
          height={"85vh"}
          mx="auto"
          borderWidth="1px"
          p={2}
          bg={"white"}
          borderRadius="md"
          boxShadow="md"
          mt={4}
          mb={2}
          bgColor={"rgba(186, 182, 182, 0.4)"}
        >
          <Heading as={"h1"} mb={4}>NO Blogs</Heading>
          <Button
            onClick={() =>
              userType !== "ngo" ? navigate(-1) : navigate("/Ngo/media/create")
            }
            colorScheme="teal"
            mb={4}
            bg="white"
            color="skyblue"
            // w={"15vw"}
            boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
            _hover={{ boxShadow: "0px 4px 6px skyblue" }}
            _active={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}
          >
            {userType !== "ngo" ? "Back" : "Create New Blog"}
          </Button>
        </Box>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundImage: "url('../bg.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <NavBar userType={userType} />
      <Box
        maxWidth={{ base: "95vw", lg: "90vw" }}
        mx="auto"
        height={"85vh"}
        overflowY={"scroll"}
        scrollBehavior={"smooth"}
        mt={4}
        mb={2}
        borderWidth="1px"
        p={2}
        bgColor={"rgba(186, 182, 182, 0.4)"}
        backdropFilter="auto"
        backdropBlur="8px"
        borderRadius="md"
        boxShadow="xl"
        css={{
          "&::-webkit-scrollbar": { width: "5px" },
          "&::-webkit-scrollbar-track": { background: "#f1f1f1" },
          "&::-webkit-scrollbar-thumb": { background: "rgba(107,164,245, 0.6)" },
          "&::-webkit-scrollbar-thumb:hover": { background: "rgba(107,164,245,1)" },
        }}
      >
        <Flex justifyContent={userType === "ngo" ? "space-between" : "center"}>
          <Heading
            as="h1"
            mb={4}
            style={{
              textDecorationLine: "underline",
              textDecorationColor: "#29B5E2",
              textDecorationThickness: "4px",
            }}
          >
            All Blogs
          </Heading>

          {userType === "ngo" && <Button
            onClick={() => navigate("/Ngo/media/create")}
            bg="white"
            color="skyblue"
            boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
            _hover={{ boxShadow: "0px 4px 6px skyblue" }}
            _active={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}
          >
            {/* Create New */}
            {!isLSmallScreen ? (
              "Create New"
            ) : (
              <IconButton as={FiPlus} boxSize={6} bg={"transparent"} />
            )}
          </Button>
          }
        </Flex>
        <Flex justifyContent={"center"}>
          <Flex flexWrap="wrap" justifyContent={"center"} gap={2}>
            {blogs &&
              blogs.map((blog) => {
                return (
                  <PostCard
                    setBlogs={setBlogs}
                    blog={blog}
                    userType={userType}
                    key={blog._id}
                  />
                );
              })}
          </Flex>
        </Flex>
      </Box>
    </div>
  );
};

export default MediaSection;

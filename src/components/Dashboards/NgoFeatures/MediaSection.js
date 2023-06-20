import React, { useEffect, useState } from "react";
import NgoNavigation from "../../Navigation/NgoNavigation";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import PostCard from "./PostCard";
import CompanyNavigation from "../../Navigation/companyNavigation";
import BenificiaryNavigation from "../../Navigation/beneficiaryNavigation";
import NavBar from "../../NavBar";

const MediaSection = ({ userType }) => {
  const [blogs, setBlogs] = useState([]);

  const navigate = useNavigate();
  // const toast = useToast();

  useEffect(() => {
    // Fetch all blogs when the component mounts
    const fetchBlogs = async () => {
      const url = "http://localhost:4000/media/posts";
      var options;

      if (userType === "company" || userType === "Beneficiary") {
        const token =
          userType === "company"
            ? localStorage.getItem("CompanyAuthToken")
            : localStorage.getItem("BenificiaryAuthToken");

        options = {
          headers: {
            "Content-type": "application/json",
            Authorization: token,
          },
        };
      } else {
        const token = localStorage.getItem("NgoAuthToken");

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
        setBlogs(blogsData.postsData);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  if (!blogs || blogs.length === 0) {
    return (
      <div style={{
        backgroundImage: "url('../bg.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      }}>
        {/* {userType !== "company" && userType !== "beneficiary" ? (
          <NgoNavigation />
        ) : userType === "company" ? (
          <CompanyNavigation />
        ) : (
          <BenificiaryNavigation />
        )} */}

        <NavBar userType={userType} />

        <Box
          maxWidth={{ base: "95vw", lg: "80vw" }}
          mx="auto"
          mt={8}
          borderWidth="1px"
          p={2}
          bg={"white"}
          borderRadius="md"
          boxShadow="md"
        >
          <h2>NO Blogs</h2>
          {/* <Button
            onClick={() => navigate("/Ngo/media/create")}
            colorScheme="teal"
            mb={4}
          >
            Create New Blog
          </Button> */}
          <Button
            onClick={() =>
              userType !== "ngo" ? navigate(-1) : navigate("/Ngo/media/create")
            }
            colorScheme="teal"
            mb={4}
          >
            {userType !== "ngo" ? "Back" : "Create New Blog"}
          </Button>
        </Box>
      </div>
    );
  }

  return (
    <div style={{
      backgroundImage: "url('../bg.png')",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover"
    }}>
      <NavBar userType={userType} />
      <Box
        maxWidth={{ base: "95vw", lg: "80vw" }}
        mx="auto"
        height={"85vh"}
        overflowY={"scroll"}
        scrollBehavior={"smooth"}
        mt={4}
        mb={2}
        borderWidth="1px"
        p={2}
        backdropFilter="auto"
        backdropBlur="8px"
        borderRadius="md"
        boxShadow="md"
      >
        <Flex justifyContent={userType === "ngo" ? "space-between" : "center"}>
          <Heading as="h1" mb={4}>
            All Blogs
          </Heading>

          {userType === "ngo" && <Button
            onClick={() => navigate("/Ngo/media/create")}
            bg="white"
            color="skyblue"
            w={"15vw"}
            boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
            _hover={{ boxShadow: "0px 4px 6px skyblue" }}
            _active={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}
          >
            Create New Blog
          </Button>
          }
        </Flex>
        <Box>
          <Flex flexWrap="wrap" justifyContent={"space-around"}>
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
        </Box>
      </Box>
    </div >
  );
};

export default MediaSection;

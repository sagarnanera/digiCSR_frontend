import React, { useEffect, useState } from "react";
import NgoNavigation from "../NgoNavigation";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import PostCard from "./PostCard";
import CompanyNavigation from "../companyNavigation";
import BenificiaryNavigation from "../beneficiaryNavigation";

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
      <div>
        {userType !== "company" && userType !== "beneficiary" ? (
          <NgoNavigation />
        ) : userType === "company" ? (
          <CompanyNavigation />
        ) : (
          <BenificiaryNavigation />
        )}
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
          <Button
            onClick={() => navigate("/Ngo/media/create")}
            colorScheme="teal"
            mb={4}
          >
            Create New Blog
          </Button>
        </Box>
      </div>
    );
  }

  return (
    <div>
      <NgoNavigation />
      <Box
        maxWidth={{ base: "95vw", lg: "80vw" }}
        mx="auto"
        mt={8}
        mb={2}
        borderWidth="1px"
        p={2}
        backdropFilter="auto"
        backdropBlur="8px"
        borderRadius="md"
        boxShadow="md"
      >
        <Flex justifyContent={"space-between"}>
          <Heading as="h1" mb={4}>
            All Blogs
          </Heading>

          <Button
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
                // const htmlDoc = parser.parseFromString(blog.content, "text/html");

                // // Extract text from HTML content
                // const textContent = htmlDoc.documentElement.textContent || "";

                // // Limit the text to a certain number of lines
                // const maxLines = 4;
                // const content = textContent
                //   .split("\n")
                //   .map((line) => line.trim())
                //   .filter((line) => line !== "")
                //   .slice(0, maxLines)
                //   .join(" ");

                // const images = htmlDoc.getElementsByTagName("img");
                // const thumbnail = images.length > 0 ? images[0].src : null;

                // return (
                //   <Box
                //     key={blog._id}
                //     borderWidth="1px"
                //     p={4}
                //     mb={4}
                //     borderRadius="md"
                //     _hover={{ boxShadow: "md", cursor: "pointer" }}
                //     onClick={() => handleBlogClick(blog._id)}
                //     width={{ base: "100%", md: "50%", lg: "33%" }}
                //     height="auto"
                //     position="relative"
                //   >
                //     {thumbnail && (
                //       <Box
                //         mb={2}
                //         width="100%"
                //         height="150px"
                //         borderRadius="md"
                //         overflow="hidden"
                //       >
                //         <Image
                //           src={thumbnail}
                //           alt="Thumbnail"
                //           width="100%"
                //           height="100%"
                //           objectFit="cover"
                //         />
                //       </Box>
                //     )}

                //     {userType === "ngo" &&

                //       <Flex
                //         position="absolute"
                //         top={5}
                //         right={5}
                //         alignItems="center"
                //         justifyContent="center"
                //         // opacity={0} // Initially hidden
                //         // transition="opacity 0.2s"
                //         _groupHover={{ opacity: 1 }} // Visible on hover
                //       >
                //         <IconButton
                //           icon={<DeleteIcon />}
                //           variant="ghost"
                //           _hover={{ color: "black", bgColor: "red" }}
                //           color="red"
                //           aria-label="Delete"
                //           size="md"
                //           mr={2}
                //           onClick={() => handleDeleteBlog(blog._id)}
                //         />
                //         <IconButton
                //           icon={<EditIcon />}
                //           variant="ghost"
                //           _hover={{ color: "black", bgColor: "beige" }}
                //           color="beige"
                //           aria-label="Edit"
                //           size="md"
                //           onClick={() => handleEditBlog(blog._id)}
                //         />
                //       </Flex>
                //     }

                //     <Heading as="h2" size="lg" mb={2}>
                //       {blog.title}
                //     </Heading>
                //     <Text color="gray.600" mb={2}>
                //       {blog.author} -{" "}
                //       {new Date(blog.createdAt).toLocaleString("en-US", {
                //         month: "short",
                //         day: "numeric",
                //         year: "numeric",
                //       })}
                //     </Text>
                //     <Text noOfLines={4} overflow="hidden" textOverflow="ellipsis">
                //       {content}
                //     </Text>

                //   </Box>
                // );
              })}
          </Flex>
        </Box>
      </Box>
    </div>
  );
};

export default MediaSection;

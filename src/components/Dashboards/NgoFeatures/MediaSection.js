// import React, { useEffect, useState } from "react";
import NgoNavigation from "../ngoNavigation";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const MediaSection = () => {
  // const [blogs, setBlogs] = useState([]);

  const navigate = useNavigate();

  const Blogs = [
    {
      id: 1,
      title: "Getting Started with React",
      author: "John Doe",
      date: "2023-05-30",
      excerpt:
        "Learn the basics of React and how to build interactive web applications.",
    },
    {
      id: 2,
      title: "Mastering CSS Grid Layout",
      author: "Jane Smith",
      date: "2023-06-05",
      excerpt:
        "Discover the power of CSS Grid Layout and create complex responsive layouts.",
    },
    {
      id: 3,
      title: "JavaScript Best Practices",
      author: "David Williams",
      date: "2023-06-12",
      excerpt:
        "Improve your JavaScript skills with these coding best practices and tips.",
    },
  ];

  // useEffect(() => {
  //   // Fetch all blogs when the component mounts
  //   const fetchBlogs = async () => {
  //     try {
  //       const blogsData = await getAllBlogs();
  //       setBlogs(blogsData);
  //     } catch (error) {
  //       console.error('Error fetching blogs:', error);
  //     }
  //   };

  //   fetchBlogs();
  // }, []);

  return (
    <div>
      <NgoNavigation />
      <Box maxWidth="800px" mx="auto" mt={8}>
        <Heading as="h1" mb={4}>
          All Blogs
        </Heading>

        {Blogs.length === 0 ? (
          <Box>
            <h2>NO Blogs</h2>
            {/* <Button onClick={navigate("/create")} colorScheme="teal" mb={4}>Create New Blog</Button> */}
            <Button
              onClick={() => navigate("/Ngo/media/create")}
              colorScheme="teal"
              mb={4}
            >
              Create New Blog
            </Button>
          </Box>
        ) : (
          Blogs.map((blog) => (
            <Box key={blog.id} borderWidth="1px" p={4} mb={4} borderRadius="md">
              <Heading as="h2" size="lg" mb={2}>
                {blog.title}
              </Heading>
              <Text color="gray.600" mb={2}>
                {blog.author} - {blog.date}
              </Text>
              <Text>{blog.excerpt}</Text>
            </Box>
          ))
        )}
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
};

export default MediaSection;

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


  useEffect(() => {
    // Fetch all blogs when the component mounts
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`http://localhost:4000/NGO/media/allPosts`);
        const blogsData = await res.json();
        setBlogs(blogsData.postsData);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const handleBlogClick = (blogId) => {
    // Redirect to the single blog page with the blog ID as a parameter
    // Example: /blog/:id
    // Replace ":id" with the actual blog ID
    // You can use a routing library like react-router-dom to handle the redirection
    // Here, we are using the navigate function from useNavigate hook
    // Make sure to import useNavigate from "react-router-dom" at the top of your file
    // Replace "/single-blog" with the actual route/path for the single blog page
    navigate(`/Ngo/media/post/${blogId}`);
  };

  return (
    <div>
      <NgoNavigation />
      <Box maxWidth="800px" mx="auto" mt={8}>
        <Heading as="h1" mb={4}>
          All Blogs
        </Heading>

        {blogs.length === 0 ? <Box>
          <h2>NO Blogs</h2>
          <Button onClick={() => navigate("/Ngo/media/create")} colorScheme="teal" mb={4}>Create New Blog</Button>
        </Box>
          :
          <Box>
            <Button onClick={() => navigate("/Ngo/media/create")} colorScheme="teal" mb={4}>Create New Blog</Button>
            <Flex flexWrap="wrap" gap={4}>
              {blogs.map((blog) => (

                <Box key={blog._id} borderWidth="1px" p={4} mb={4} borderRadius="md"
                  _hover={{ boxShadow: "md", cursor: "pointer" }}
                  onClick={() => handleBlogClick(blog._id)}
                  width={{ base: "100%", md: "50%", lg: "33.33%" }} height="300px"
                >
                  <Heading as="h2" size="lg" mb={2}>
                    {blog.title}
                  </Heading>
                  <Text color="gray.600" mb={2}>
                    {blog.author} - {blog.createdAt}
                  </Text>
                  <Text noOfLines={2} dangerouslySetInnerHTML={{ __html: blog.content }} />
                </Box>
              ))}
            </Flex>
          </Box>
        }

      </Box>
    </div>
  );
};

export default MediaSection;

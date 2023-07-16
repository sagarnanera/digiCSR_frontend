import React, { useEffect, useState } from "react";
import NgoNavigation from "../Navigation/NgoNavigation";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import PostEditor from "../PostEditor";

const UpdateBlog = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchBlog = async () => {
      const url = `http://localhost:4000/media/post/${id}`;
      const token = localStorage.getItem("NgoAuthToken");
      const options = {
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
      };

      try {
        // Replace this with your logic to fetch the blog post using the id
        const response = await fetch(url, options);
        const Data = await response.json();
        console.log(Data);

        // setBlog(Data.postData);
        setTitle(Data.postData.title);
        setContent(Data.postData.content);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [id]);

  const handleSubmit = async () => {
    let errorMessage = "";

    if (!title.trim() && !content.trim()) {
      errorMessage = "Please provide a title and content!";
    } else if (!title.trim()) {
      errorMessage = "Post title is required!";
    } else if (!content.trim()) {
      errorMessage = "Post content is required!";
    }

    if (errorMessage) {
      toast({
        title: errorMessage,
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    // Perform submission logic here
    console.log("Title:", title);
    console.log("Content:", content);

    const token = localStorage.getItem("NgoAuthToken");

    try {
      const response = await fetch(`http://localhost:4000/media/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Post updated :", data);
        // Perform any additional actions after successful post creation
        toast({
          title: "Successfully updated the post.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        // Reset form fields
        setTitle("");
        setContent("");

        navigate(`/Ngo/media/${data.postData._id}`);
      } else {
        console.log("Post updation failed");
        // Handle error case
        errorMessage = "Error updating post else case.";

        toast({
          title: errorMessage,
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error updating post:", error);

      errorMessage = "Error updating post";

      toast({
        title: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }

    // Reset form fields
    setTitle("");
    setContent("");
  };

  const handlePreview = () => {
    console.log("preview button clicked");
  };

  return (
    <div>
      <NgoNavigation />

      <Box
        mx={{ base: 2, md: "auto" }}
        maxW={{ base: "none", md: "80vw" }}
        mt={8}
        borderWidth="1px"
        p={2}
        bg={"white"}
        borderRadius="md"
        boxShadow="md"
      >
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Content</FormLabel>

          <PostEditor content={content} setContent={setContent} />
        </FormControl>

        <Flex justifyContent="center" mt={4}>
          <Button onClick={handlePreview} mx={1}>
            preview
          </Button>
          <Button onClick={handleSubmit} mx={1}>
            Submit
          </Button>
        </Flex>
      </Box>
    </div>
  );
};

export default UpdateBlog;

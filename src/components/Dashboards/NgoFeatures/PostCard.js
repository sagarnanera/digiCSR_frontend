import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading, IconButton, Image, Text, useToast } from "@chakra-ui/react";

const PostCard = ({ blog, userType, setBlogs }) => {


    const navigate = useNavigate();
    const toast = useToast();

    const [content, setContent] = useState("");
    const [thumbnail, setThumbnail] = useState("");

    useEffect(() => {

        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(blog.content, "text/html");

        // Extract text from HTML content
        const textContent = htmlDoc.documentElement.textContent || "";

        // Limit the text to a certain number of lines
        const maxLines = 4;
        const txt = textContent
            .split("\n")
            .map((line) => line.trim())
            .filter((line) => line !== "")
            .slice(0, maxLines)
            .join(" ");

        setContent(txt);

        const images = htmlDoc.getElementsByTagName("img");
        const thumbimg = images.length > 0 ? images[0].src : null;

        setThumbnail(thumbimg);

    }, [])

    const handleBlogClick = blogId => {

        console.log(userType === "company" || "beneficiary");

        return userType === "company" || "beneficiary"
            ? navigate(`/${userType}/media/${blogId}`)
            : navigate(`/Ngo/media/post/${blogId}`);

    };

    const handleDeleteBlog = async (blogId, event) => {

        event.stopPropagation();

        if (userType !== "ngo") {
            toast({
                title: "Not Allowed",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-right"
            });
            return
        }

        const token = localStorage.getItem("NgoAuthToken");

        if (!token) {
            navigate('/');
        }

        try {
            // Replace this with your logic to fetch the blog post using the id
            const response = await fetch(`http://localhost:4000/media/delete/${blogId}`, {
                method: 'DELETE',
                headers: {
                    "Content-type": "application/json",
                    "Authorization": token,
                }
            });
            const Data = await response.json();
            console.log(Data);

            if (!Data.success) {
                toast({
                    title: "Error deleting blog",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right"
                });
                return
            }

            setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
            toast({
                title: "Successfully deleted Post !!!",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top-right"
            });
            navigate("/Ngo/media");

        } catch (error) {
            console.error('Error fetching blog:', error);
            toast({
                title: "Error fetching blog",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-right"
            });
        }

    }
    const handleEditBlog = (blogId, event) => {

        event.stopPropagation();

        if (userType !== "ngo") {
            toast({
                title: "Not Allowed",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-right"
            });
            return
        }

        navigate(`/Ngo/media/update/${blogId}`, { replace: true });

    }


    return (
        <Box
            key={blog._id}
            borderWidth="1px"
            p={4}
            mb={4}
            borderRadius="md"
            _hover={{ boxShadow: "md", cursor: "pointer" }}
            onClick={() => handleBlogClick(blog._id)}
            width={{ base: "100%", md: "50%", lg: "33%" }}
            height="auto"
            position="relative"
            bg={"#FFF"}
        >
            {thumbnail && (
                <Box
                    mb={2}
                    width="100%"
                    height="150px"
                    borderRadius="md"
                    overflow="hidden"
                >
                    <Image
                        src={thumbnail}
                        alt="Thumbnail"
                        width="100%"
                        height="100%"
                        objectFit="cover"
                    />
                </Box>
            )}

            {userType === "ngo" &&

                <Flex
                    position="absolute"
                    top={5}
                    right={5}
                    alignItems="center"
                    justifyContent="center"
                    // opacity={0} // Initially hidden
                    // transition="opacity 0.2s"
                    _groupHover={{ opacity: 1 }} // Visible on hover
                >
                    <IconButton
                        icon={<DeleteIcon />}
                        variant="ghost"
                        _hover={{ color: "black", bgColor: "red" }}
                        color="red"
                        aria-label="Delete"
                        size="md"
                        mr={2}
                        onClick={(e) => handleDeleteBlog(blog._id, e)}
                    />
                    <IconButton
                        icon={<EditIcon />}
                        variant="ghost"
                        _hover={{ color: "black", bgColor: "beige" }}
                        color="beige"
                        aria-label="Edit"
                        size="md"
                        onClick={(e) => handleEditBlog(blog._id, e)}
                    />
                </Flex>
            }

            <Heading as="h2" size="lg" mb={2} noOfLines={1} textOverflow={"ellipsis"}>
                {blog.title}
            </Heading>
            <Text color="gray.600" mb={2}>
                {blog.author} -{" "}
                {new Date(blog.createdAt).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                })}
            </Text>
            <Text noOfLines={3} overflow="hidden" textOverflow="ellipsis">
                {content}
            </Text>

        </Box>
    )
}

export default PostCard

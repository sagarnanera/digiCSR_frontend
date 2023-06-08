import React, { useEffect, useState } from "react";
import NgoNavigation from "../ngoNavigation";
import { Box, Heading, Text, Image, CSSReset, ChakraProvider } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { extendTheme } from "@chakra-ui/react";

const Post = () => {

    const { id } = useParams();
    const [blog, setBlog] = useState({});



    const theme = extendTheme({
        styles: {
            global: {
                h1: {
                    fontSize: '2em',
                    fontWeight: 'bolder',
                    marginTop: '32px',
                    marginBottom: '16px',
                },
                h2: {
                    fontSize: '1.5em',
                    fontWeight: 'bolder',
                    marginTop: '24px',
                    marginBottom: '16px',
                },
                h3: {
                    fontSize: '1.17em',
                    fontWeight: 'bolder',
                    marginTop: '18.72px',
                    marginBottom: '16px',
                },
                h4: {
                    fontSize: '1em',
                    fontWeight: 'bolder',
                    marginTop: '16px',
                    marginBottom: '16px',
                },
                h5: {
                    fontSize: '.83em',
                    fontWeight: 'bolder',
                    marginTop: '13.28px',
                    marginBottom: '16px',
                },
                h6: {
                    fontSize: '.67em',
                    fontWeight: 'bolder',
                    marginTop: '10.72px',
                    marginBottom: '16px',
                },
                p: {
                    fontSize: 'md',
                },
                a: {
                    color: 'blue.500',
                    textDecoration: 'underline',
                },
            }
        }
    });


    const blogData = {
        id: 3,
        title: 'JavaScript Best Practices',
        author: 'David Williams',
        authorLogoUrl: "path/to/author-logo.png", // Replace with the actual URL of the author's logo image
        date: '2023-06-12',
        excerpt: 'Improve your JavaScript skills with these coding best practices and tips.',
    };

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                // Replace this with your logic to fetch the blog post using the id
                const response = await fetch(`http://localhost:4000/NGO/media/post/${id}`);
                const blogData = await response.json();
                console.log(blogData);
                setBlog(blogData.postData);
            } catch (error) {
                console.error('Error fetching blog:', error);
            }
        }
        fetchBlog();
    }, []);

    return (
        <div>
            <NgoNavigation />
            <Box maxWidth="800px" mx="auto" mt={8} p={4}>
                <Heading as="h1" mb={4}>
                    {blog.title}
                </Heading>
                <Box display="flex" alignItems="center" mb={4}>
                    <Image src={blog.authorLogoUrl} alt={blog.author} boxSize="40px" borderRadius="full" mr={2} />
                    <Text>{blog.author}</Text>
                </Box>
                <Text color="gray.600" mb={4}>
                    Published on {blog.createdAt}
                </Text>
                <ChakraProvider theme={theme}>
                    <Text dangerouslySetInnerHTML={{ __html: blog.content }} />
                </ChakraProvider>
            </Box>
        </div>
    );
};

export default Post;

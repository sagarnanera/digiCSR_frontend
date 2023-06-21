import React, { useEffect, useState } from "react";
import NgoNavigation from "../../Navigation/NgoNavigation";
import {
  Box,
  Heading,
  Text,
  Image,
  ChakraProvider,
  Button,
  Flex,
  IconButton,
  useToast,
  background,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { extendTheme } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import NavBar from "../../NavBar";

const Post = ({ userType }) => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});

  const navigate = useNavigate();
  const toast = useToast();

  const theme = extendTheme({
    styles: {
      global: {
        h1: {
          fontSize: "2em",
          fontWeight: "bolder",
          marginTop: "32px",
          marginBottom: "16px",
        },
        h2: {
          fontSize: "1.5em",
          fontWeight: "bolder",
          marginTop: "24px",
          marginBottom: "16px",
        },
        h3: {
          fontSize: "1.17em",
          fontWeight: "bolder",
          marginTop: "18.72px",
          marginBottom: "16px",
        },
        h4: {
          fontSize: "1em",
          fontWeight: "bolder",
          marginTop: "16px",
          marginBottom: "16px",
        },
        h5: {
          fontSize: ".83em",
          fontWeight: "bolder",
          marginTop: "13.28px",
          marginBottom: "16px",
        },
        h6: {
          fontSize: ".67em",
          fontWeight: "bolder",
          marginTop: "10.72px",
          marginBottom: "16px",
        },
        p: {
          fontSize: "md",
          textAlign: "justify",
        },
        a: {
          color: "blue.500",
          textDecoration: "underline",
        },
        ul: {
          paddingLeft: "1.5rem",
          marginBottom: "1rem",
        },
        ol: {
          paddingLeft: "1.5rem",
          marginBottom: "1rem",
        },
        li: {
          marginBottom: "0.5rem",
        },
        img: {
          display: "block",
          margin: "0 auto",
        },
      },
    },
  });

  var options;

  if (userType === "company" || userType == "Beneficiary") {
    const token =
      userType === "company"
        ? localStorage.getItem("CompanyAuthToken")
        : localStorage.getItem("NgoAuthToken");

    options = {
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
    };
  } else {
    const token = userType === "ngo" ? localStorage.getItem("NgoAuthToken") : localStorage.getItem("AdminAuthToken");

    options = {
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
    };
  }

  useEffect(() => {
    const fetchBlog = async () => {
      const url = `http://localhost:4000/media/post/${id}`;

      try {
        // Replace this with your logic to fetch the blog post using the id
        const response = await fetch(url, options);
        const Data = await response.json();
        console.log(Data);

        if (!Data.success) {
          setBlog({});
          toast({
            title: "Error fetching blog",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top-right",
          });
          return;
        }

        setBlog(Data.postData);
      } catch (error) {
        console.error("Error fetching blog:", error);
        toast({
          title: "Error fetching blog",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      }
    };
    fetchBlog();
  }, [id]);

  const handleDeleteBlog = async (blogId) => {
    console.log({
      method: "DELETE",
      ...options,
    });

    if (userType !== "ngo" && userType !== "admin") {
      toast({
        title: "Not Allowed",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    try {
      // Replace this with your logic to fetch the blog post using the id
      const response = await fetch(
        `http://localhost:4000/media/delete/${blogId}`,
        {
          method: "DELETE",
          ...options,
        }
      );
      const Data = await response.json();
      console.log(Data);

      if (!Data.success) {
        toast({
          title: "Error deleting blog",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        return;
      }

      setBlog({});
      navigate(`/${userType}/media`);
    } catch (error) {
      console.error("Error fetching blog:", error);
      toast({
        title: "Error fetching blog",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const handleEditBlog = (blogId) => {
    if (userType !== "ngo") {
      toast({
        title: "Not Allowed",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    navigate(`/Ngo/media/update/${blogId}`, { replace: true });
  };

  if (!blog) {
    return (
      <div style={{
        backgroundImage: "url('../bg.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      }}>
        <NgoNavigation />
        <Box
          maxWidth={{ base: "95vw", lg: "80vw" }}
          mx="auto"
          mt={8}
          mb={2}
          borderWidth="1px"
          p={2}
          bg={"white"}
          borderRadius="md"
          boxShadow="md"
        >
          <h2>Blog Not Found</h2>
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
      backgroundImage: "url('/bg.png')",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    }}>
      <NavBar userType={userType} />
      <Box
        maxWidth={{ base: "95vw", lg: "80vw" }}
        height={"80vh"}
        mx="auto"
        mt={8}
        mb={2}
        p={4}
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        backdropFilter="auto"
        backdropBlur="8px"
        overflowX={"scroll"}
      >
        <Heading as="h1" mb={5} fontSize={"5xl"}>
          {blog.title}
        </Heading>
        <Box
          display="flex"
          alignItems="center"
          justifyContent={"space-between"}
          mb={4}
        >
          <Box display="flex" alignItems="center">
            <Image
              src={blog.authorLogoUrl}
              alt={blog.author}
              boxSize="40px"
              borderRadius="full"
              m={0}
              mr={2}
            />
            <Text>{blog.author}</Text>
          </Box>

          {(userType === "ngo" || userType === "admin") && (
            <Flex
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
                onClick={() => handleDeleteBlog(blog._id)}
              />
              {userType === "ngo" && <IconButton
                icon={<EditIcon />}
                variant="ghost"
                _hover={{ color: "white", bgColor: "gray" }}
                color="black"
                aria-label="Edit"
                size="md"
                onClick={() => handleEditBlog(blog._id)}
              />}
            </Flex>
          )}
        </Box>
        <Text color="gray.600" mb={4}>
          Published on -{" "}
          {new Date(blog.createdAt).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </Text>
        <Box width="100%" overflowWrap="break-word">
          <ChakraProvider theme={theme}>
            <Text dangerouslySetInnerHTML={{ __html: blog.content }} />
          </ChakraProvider>
        </Box>
      </Box>
    </div>
  );
};

export default Post;

import React, { useState } from "react";
import NgoNavigation from "../ngoNavigation";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  useToast
} from "@chakra-ui/react";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate } from "react-router-dom";

const PostBlogs = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();
  const toast = useToast();

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
        position: "top-right"
      });
      return;
    }

    // Perform submission logic here
    console.log("Title:", title);
    console.log("Content:", content);

    const token = localStorage.getItem("NgoAuthToken");

    try {
      const response = await fetch("http://localhost:4000/NGO/media/createPost", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Authorization": token,
        },
        body: JSON.stringify({ title, content })
      });

      if (response.ok) {
        const createdPost = await response.json();
        console.log("Post created:", createdPost);
        // Perform any additional actions after successful post creation
        toast({
          title: "Successfully created the post.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right"
        });
        // Reset form fields
        setTitle("");
        setContent("");

        navigate(`/Ngo/media/post/${createdPost._id}`);

      } else {
        console.log("Post creation failed");
        // Handle error case
        errorMessage = "Error creating post else case.";

        toast({
          title: errorMessage,
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top-right"
        });

      }
    } catch (error) {
      console.error("Error creating post:", error);

      errorMessage = "Error creating post";

      toast({
        title: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right"
      });
      // Handle error case
    }

    // Reset form fields
    setTitle("");
    setContent("");
  };

  const handlePreview = () => {
    console.log("preview button clicked");
  };

  const handleFileUpload = (blobInfo, progress) => new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    // xhr.withCredentials = false;
    xhr.open('POST', 'http://localhost:4000/NGO/media/upload');

    xhr.upload.onprogress = (e) => {
      progress(e.loaded / e.total * 100);
    };

    xhr.onload = () => {
      if (xhr.status === 403) {
        reject({ message: 'HTTP Error: ' + xhr.status, remove: true });
        return;
      }

      if (xhr.status < 200 || xhr.status >= 300) {
        reject('HTTP Error: ' + xhr.status);
        return;
      }

      const json = JSON.parse(xhr.responseText);

      console.log(json);

      if (!json || typeof json.url != 'string') {
        reject('Invalid JSON: ' + xhr.responseText);
        return;
      }

      resolve(json.url);
    };

    xhr.onerror = () => {
      reject('Image upload failed due to a XHR Transport error. Code: ' + xhr.status);
    };

    const formData = new FormData();
    formData.append('file', blobInfo.blob(), blobInfo.filename());

    xhr.send(formData);
  });

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
          <Input value={title} onChange={e => setTitle(e.target.value)} />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Content</FormLabel>
          <Editor
            initialValue="<h1>start typing</h1>"
            apiKey="737ctk8spome1abtlmdn1d8968z1badiw4l81la080r6c6xb"
            value={content}
            onEditorChange={(newContent, Editor) => {
              setContent(newContent);
            }}
            init={{
              height: 300,
              menubar: false,
              plugins:
                "anchor autolink charmap codesample code emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed  tinymcespellchecker permanentpen powerpaste advtable advcode editimage  tableofcontents footnotes mergetags autocorrect inlinecss fullscreen",

              toolbar:
                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough codesample code | link image media table mergetags | fullscreen | spellcheckdialog | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",

              images_upload_url: "http://localhost:4000/NGO/media/upload",
              images_upload_handler: handleFileUpload
            }}
          />
        </FormControl>

        {/* Add other relevant fields here */}

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

export default PostBlogs;

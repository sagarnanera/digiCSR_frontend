import React from "react";
import CompanyNavigation from "../companyNavigation";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ShowProfile = () => {
  const navigate = useNavigate();
  const submitHandler = async () => {
    navigate("/Company/editprofile", { replace: true });
  };
  return (
    <div>
      <CompanyNavigation />
      <Button
        colorScheme="teal"
        w={"10%"}
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Edit Profile
      </Button>
    </div>
  );
};

export default ShowProfile;

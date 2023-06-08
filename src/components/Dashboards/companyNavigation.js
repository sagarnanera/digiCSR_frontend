import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import classes from "../../CSS/ComCss.module.css";
import jwt_decode from "jwt-decode";

const CompanyNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [companyId, setCompanyId] = useState("");
  const [image, setImage] = useState("/user-avatar.jpg"); // State to store the selected image

  const handleClick = () => {
    localStorage.removeItem("CompanyAuthToken");
    navigate("/", { replace: true });
  };
  useEffect(() => {
    const token = localStorage.getItem("CompanyAuthToken");
    const decodedToken = jwt_decode(token);
    setCompanyId(decodedToken._id);
  }, []);

  // only executes when id is set
  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/company/logo/${companyId}`
        );

        const base64Data = await response.text();

        const byteCharacters = atob(base64Data.split(",")[1]);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);

        const blob = new Blob([byteArray], { type: "image/png" });
        const imageUrl = URL.createObjectURL(blob);
        setImage(imageUrl);
      } catch (error) {
        console.error(error);
      }
    };
    if (companyId && companyId !== "") {
      fetchLogo();
    }
    // return () => {
    //   // Clean up the created object URL
    //   URL.revokeObjectURL(image);
    // };
  }, [companyId]);
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Company Dashboard</div>
      <nav>
        <ul className={classes.nav}>
          <li>
            <Link
              to="/Company"
              className={location.pathname === "/Company" ? classes.active : ""}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/Company/RaiseRFP"
              className={
                location.pathname === "/Company/RaiseRFP" ? classes.active : ""
              }
            >
              Raise RFPs
            </Link>
          </li>
          <li>
            <Link
              to="/Company/TrackRFP"
              className={
                location.pathname === "/Company/TrackRFP" ? classes.active : ""
              }
            >
              Track RFPs
            </Link>
          </li>
          <li>
            <Link
              to="/Company/FundingStats"
              className={
                location.pathname === "/Company/FundingStats"
                  ? classes.active
                  : ""
              }
            >
              Stats
            </Link>
          </li>
          <li>
            <Link
              to="/Company/NGOReviews"
              className={
                location.pathname === "/Company/NGOReviews"
                  ? classes.active
                  : ""
              }
            >
              NGO Reviews
            </Link>
          </li>
          <li>
            <Menu>
              <MenuButton
                as={Avatar}
                size="sm"
                src={image ? image : "/user-avatar"}
              />
              <MenuList>
                <Link to="/Company/profile">
                  <MenuItem>Show Company Profile</MenuItem>
                </Link>
                <MenuItem onClick={handleClick}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default CompanyNavigation;

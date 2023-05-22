import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import classes from "../../CSS/ComCss.module.css";

const CompanyNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/", {replace: true});
  };

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
              to="/Company/RaiseRPF"
              className={
                location.pathname === "/Company/RaiseRPF" ? classes.active : ""
              }
            >
              Raise RPFs
            </Link>
          </li>
          <li>
            <Link
              to="/Company/TrackRPF"
              className={
                location.pathname === "/Company/TrackRPF" ? classes.active : ""
              }
            >
              Track RPFs
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
                src="https://bit.ly/broken-link"
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

import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import classes from "../../CSS/ComCss.module.css";

const CompanyNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    // localStorage.removeItem("CompanyAuthToken");
    navigate("/", { replace: true });
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Company Dashboard</div>
      <nav>
        <ul className={classes.nav}>
          <li>
            <Link
              to="/Ngo"
              className={location.pathname === "/Ngo" ? classes.active : ""}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/Ngo/RPFs"
              className={
                location.pathname === "/Ngo/RPFs" ? classes.active : ""
              }
            >
              Raise RPFs
            </Link>
          </li>
          <li>
            <Link
              to="/Ngo/postblogs"
              className={
                location.pathname === "/Ngo/postblogs" ? classes.active : ""
              }
            >
              Track RPFs
            </Link>
          </li>
          <li>
            <Link
              to="/Ngo/acceptedrfps"
              className={
                location.pathname === "/Ngo/acceptedrfps" ? classes.active : ""
              }
            >
              Stats
            </Link>
          </li>
          <li>
            <Link
              to="/Ngo/media"
              className={
                location.pathname === "/Ngo/media" ? classes.active : ""
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
                <Link to="/Ngo/profile">
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

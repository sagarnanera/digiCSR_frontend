import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import classes from "../../CSS/ComCss.module.css";

const NgoNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.removeItem("NgoAuthToken");
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
              RPF Requests
            </Link>
          </li>
          <li>
            <Link
              to="/Ngo/postblogs"
              className={
                location.pathname === "/Ngo/postblogs" ? classes.active : ""
              }
            >
              Post Success
            </Link>
          </li>
          <li>
            <Link
              to="/Ngo/acceptedrfps"
              className={
                location.pathname === "/Ngo/acceptedrpfs" ? classes.active : ""
              }
            >
              Accepted RPFs
            </Link>
          </li>
          <li>
            <Link
              to="/Ngo/media"
              className={
                location.pathname === "/Ngo/media" ? classes.active : ""
              }
            >
              Media Section
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

export default NgoNavigation;

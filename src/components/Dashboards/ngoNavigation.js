import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar, Menu, MenuButton, MenuList, MenuItem, IconButton } from "@chakra-ui/react";
import classes from "../../CSS/ComCss.module.css";
import { FiBell } from "react-icons/fi";

const NgoNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.removeItem("NgoAuthToken");
    navigate("/", { replace: true });
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Ngo Dashboard</div>
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
              to="/Ngo/acceptedrpfs"
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
            <IconButton
              aria-label="Share proposal"
              variant={"ghost"}
              icon={<FiBell />}
            />
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
                  <MenuItem>Show Ngo Profile</MenuItem>
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

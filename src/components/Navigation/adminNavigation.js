import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useMediaQuery,
  HStack,
} from "@chakra-ui/react";
import classes from "../../CSS/ComCss.module.css";
import { FiMenu } from "react-icons/fi";
const AdminNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);
  const [isMobile] = useMediaQuery("(max-width: 800px)");
  
  const handleClick = () => {
    localStorage.removeItem("AdminAuthToken");
    navigate("/", { replace: true });
  };


  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <img src={"/image 7.png"} alt="Admin Logo" />
      </div>
      <nav>
        <HStack>
          {isMobile ? ( // Render menu drawer for mobile screens
            <>
              <IconButton
                aria-label="Open menu"
                icon={<FiMenu />}
                variant={"ghost"}
                color={"black"}
                colorScheme="blue"
                onClick={() => setIsMenuDrawerOpen(true)}
              />

              <Drawer
                isOpen={isMenuDrawerOpen}
                placement="right"
                onClose={() => setIsMenuDrawerOpen(false)}
              >
                <DrawerOverlay>
                  <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Menu</DrawerHeader>
                    <DrawerBody>
                      <ul className={classes.nav}>
                        <li>
                          <Link
                            to="/Admin"
                            className={
                              location.pathname === "/Admin"
                                ? classes.active
                                : ""
                            }
                          >
                            Home
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/Admin/RFP"
                            className={
                              location.pathname === "/Admin/RFP"
                                ? classes.active
                                : ""
                            }
                          >
                            RFPs
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/Admin/ngos"
                            className={
                              location.pathname === "/Admin/ngos"
                                ? classes.active
                                : ""
                            }
                          >
                            NGOs
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/Admin/companies"
                            className={
                              location.pathname === "/Admin/companies"
                                ? classes.active
                                : ""
                            }
                          >
                            Companies
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/Admin/beneficiaries"
                            className={
                              location.pathname === "/Admin/beneficiaries"
                                ? classes.active
                                : ""
                            }
                          >
                            Beneficiaries
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/Admin/media"
                            className={
                              location.pathname === "/Admin/media"
                                ? classes.active
                                : ""
                            }
                          >
                            Media
                          </Link>
                        </li>
                        {/* Rest of the navigation links */}
                      </ul>
                    </DrawerBody>
                  </DrawerContent>
                </DrawerOverlay>
              </Drawer>
            </>
          ) : (
            // Render regular navigation for larger screens
            <ul className={classes.nav}>
              <li>
                <Link
                  to="/Admin"
                  className={
                    location.pathname === "/Admin" ? classes.active : ""
                  }
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/Admin/RFP"
                  className={
                    location.pathname === "/Admin/RFP" ? classes.active : ""
                  }
                >
                  RFPs
                </Link>
              </li>
              <li>
                <Link
                  to="/Admin/ngos"
                  className={
                    location.pathname === "/Admin/ngos" ? classes.active : ""
                  }
                >
                  NGOs
                </Link>
              </li>
              <li>
                <Link
                  to="/Admin/companies"
                  className={
                    location.pathname === "/Admin/companies"
                      ? classes.active
                      : ""
                  }
                >
                  Companies
                </Link>
              </li>
              <li>
                <Link
                  to="/Admin/beneficiaries"
                  className={
                    location.pathname === "/Admin/beneficiaries"
                      ? classes.active
                      : ""
                  }
                >
                  Beneficiaries
                </Link>
              </li>
              <li>
                <Link
                  to="/Admin/media"
                  className={
                    location.pathname === "/Admin/media" ? classes.active : ""
                  }
                >
                  Media
                </Link>
              </li>
              {/* Rest of the navigation links */}
            </ul>
          )}
          <ul className={classes.navbutton}>
            <li>
              <Menu>
                <MenuButton as={Avatar} size="sm" src={"/user-avatar"} />
                <MenuList>
                  <MenuItem onClick={handleClick}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </li>
          </ul>
        </HStack>
      </nav>
    </header>
  );
};

export default AdminNavigation;

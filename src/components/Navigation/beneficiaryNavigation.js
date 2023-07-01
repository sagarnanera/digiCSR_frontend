import { Link, useLocation, useNavigate } from "react-router-dom";
import classes from "../../CSS/ComCss.module.css";
import {
  Avatar,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useMediaQuery,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { useState } from "react";

const BeneficiaryNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile] = useMediaQuery("(max-width: 800px)");
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);

  const handleClick = () => {
    localStorage.removeItem("BeneficiaryAuthToken");
    navigate("/", { replace: true });
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <img src={"/image 7.png"} alt="Company Logo" />
      </div>
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
                          to="/Beneficiary"
                          className={
                            location.pathname === "/Beneficiary"
                              ? classes.active
                              : ""
                          }
                        >
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/Beneficiary/ngos"
                          className={
                            location.pathname === "/Beneficiary/ngos"
                              ? classes.active
                              : ""
                          }
                        >
                          NGOs
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/Beneficiary/media"
                          className={
                            location.pathname === "/Beneficiary/media"
                              ? classes.active
                              : ""
                          }
                        >
                          Media Section
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
                to="/Beneficiary"
                className={
                  location.pathname === "/Beneficiary" ? classes.active : ""
                }
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/Beneficiary/ngos"
                className={
                  location.pathname === "/Beneficiary/ngos"
                    ? classes.active
                    : ""
                }
              >
                NGOs
              </Link>
            </li>
            <li>
              <Link
                to="/Beneficiary/media"
                className={
                  location.pathname === "/Beneficiary/media"
                    ? classes.active
                    : ""
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
    </header>
  );
};

export default BeneficiaryNavigation;

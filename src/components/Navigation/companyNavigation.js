import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Badge,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Flex,
  Button,
  Box,
  Text,
  useMediaQuery,
  HStack,
} from "@chakra-ui/react";
import classes from "../../CSS/ComCss.module.css";
import jwt_decode from "jwt-decode";
import { FiBell, FiCheck, FiMenu, FiTrash } from "react-icons/fi";
const CompanyNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [companyId, setCompanyId] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [image, setImage] = useState("/user-avatar.jpg"); // State to store the selected image
  const [isMobile] = useMediaQuery("(max-width: 800px)");

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

        const res = await response.json()
        // console.log(res);
        setImage(res.LogoURL);
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
  const fetchNotifications = async () => {
    try {
      const response = await fetch("http://localhost:4000/notifications", {
        headers: {
          "Content-type": "application/json",
          authorization: localStorage.getItem("CompanyAuthToken"),
        },
      });
      const data = await response.json();
      if (response.ok) {
        setNotifications(data.notifications);
        const unreadCount = data.notifications.filter(
          (notification) => !notification.read
        ).length;
        setUnreadCount(unreadCount);
      } else {
        throw new Error(
          data.message || "Failed to fetch notifications. Please try again."
        );
      }
    } catch (error) {
      console.log(error.message);
      // Handle error
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markNotificationAsRead = async (notificationId) => {
    try {
      const response = await fetch(
        "http://localhost:4000/notifications/updatestatus",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("CompanyAuthToken"),
          },
          body: JSON.stringify({
            notificationID: notificationId,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setNotifications((prevNotifications) =>
          prevNotifications.map((notification) =>
            notification._id === notificationId
              ? { ...notification, read: true }
              : notification
          )
        );
      } else {
        throw new Error(
          data.message ||
          "Failed to mark notification as read. Please try again."
        );
      }
    } catch (error) {
      console.log(error.message);
      // Handle error
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      const response = await fetch(
        "http://localhost:4000/notifications/delete",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("CompanyAuthToken"),
          },
          body: JSON.stringify({
            notificationID: notificationId,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setNotifications((prevNotifications) =>
          prevNotifications.filter(
            (notification) => notification._id !== notificationId
          )
        );
      } else {
        throw new Error(
          data.message || "Failed to delete notification. Please try again."
        );
      }
    } catch (error) {
      console.log(error.message);
      // Handle error
    }
  };

  const markAllAsRead = async () => {
    try {
      for (const notification of notifications) {
        await markNotificationAsRead(notification._id);
      }
      const updatedNotifications = notifications.map((notification) => ({
        ...notification,
        read: true,
      }));
      setNotifications(updatedNotifications);
      setUnreadCount(0);
    } catch (error) {
      console.log(error.message);
      // Handle error
    }
  };

  const deleteAllRead = async () => {
    try {
      const readNotifications = notifications.filter(
        (notification) => notification.read
      );
      for (const notification of readNotifications) {
        await deleteNotification(notification._id);
      }
      const updatedNotifications = notifications.filter(
        (notification) => !notification.read
      );
      setNotifications(updatedNotifications);
    } catch (error) {
      console.log(error.message);
      // Handle error
    }
  };

  const handleBellIconClick = () => {
    setIsDrawerOpen(true);
  };
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <img src={"/image 7.png"} alt="Company Logo" />
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
                      <ul className={classes.nav} style={{ fontSize: "2em" }}>
                        <li>
                          <Link
                            to="/Company"
                            className={
                              location.pathname === "/Company" ? classes.active : ""
                            }
                          >
                            Home
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/Company/TrackRFP"
                            className={
                              location.pathname === "/Company/TrackRFP"
                                ? classes.active
                                : ""
                            }
                          >
                            RFPs
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
            <ul className={classes.nav} style={{ fontSize: "2em" }}>
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
                  to="/Company/TrackRFP"
                  className={
                    location.pathname === "/Company/TrackRFP" ? classes.active : ""
                  }
                >
                  RFPs
                </Link>
              </li>
              <li>
                <Link
                  to="/Company/ngos"
                  className={
                    location.pathname === "/Company/ngos" ? classes.active : ""
                  }
                >
                  NGOs
                </Link>
              </li>
              <li>
                <Link
                  to="/Company/media"
                  className={
                    location.pathname === "/Company/media" ? classes.active : ""
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
              <IconButton
                aria-label="Share proposal"
                variant={"ghost"}
                icon={<FiBell />}
                onClick={handleBellIconClick}
                color={"skyblue"}
                size={"lg"}
                colorScheme="blue"
              />
              {unreadCount > 0 && (
                <Badge colorScheme="red" borderRadius="full" ml={-5} mb={5}>
                  {unreadCount}
                </Badge>
              )}
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
        </HStack>
        <Drawer
          isOpen={isDrawerOpen}
          placement="right"
          onClose={() => setIsDrawerOpen(false)}
          size="xs"
        >
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Notifications</DrawerHeader>
              <DrawerBody>
                {notifications.length > 0 ? (
                  <>
                    <Flex justify="flex-end">
                      <Button
                        variant="outline"
                        colorScheme="green"
                        onClick={markAllAsRead}
                        disabled={notifications.length === 0}
                        size={"sm"}
                      >
                        Mark All as Read
                      </Button>
                      <Button
                        variant="outline"
                        colorScheme="red"
                        onClick={deleteAllRead}
                        disabled={notifications.length === 0}
                        ml={2}
                        size={"sm"}
                      >
                        Delete All Read
                      </Button>
                    </Flex>
                    {notifications
                      .sort((a, b) => {
                        if (a.read && !b.read) {
                          return 1; // Place read notifications after unread notifications
                        } else if (!a.read && b.read) {
                          return -1; // Place unread notifications before read notifications
                        } else {
                          // Sort by timestamp if read statuses are the same
                          return a.timestamp - b.timestamp;
                        }
                      })
                      .map((notification) => (
                        <Box
                          key={notification._id}
                          borderWidth="1px"
                          borderRadius="md"
                          p={4}
                          mb={4}
                          boxSize={"sm"}
                          maxW={"100%"}
                          h={"fit-content"}
                        >
                          {notification.read ? (
                            <>
                              <Text fontSize="sm" fontWeight="hairline" mb={2}>
                                {notification.content}
                              </Text>
                              <br />
                              <Text fontSize="xs" color="gray.500" mb={2}>
                                {notification.timestamp}
                              </Text>
                              <Text
                                fontSize="xs"
                                color="green"
                                ml={"65%"}
                                mb={2}
                              >
                                Status: Readed
                              </Text>
                              <Flex justify="flex-end">
                                <IconButton
                                  aria-label="Delete Notification"
                                  icon={<FiTrash />}
                                  onClick={() =>
                                    deleteNotification(notification._id)
                                  }
                                  variant="solid"
                                  colorScheme="red"
                                  size={"sm"}
                                />
                              </Flex>
                            </>
                          ) : (
                            <>
                              <Text fontSize="sm" fontWeight="bold" mb={2}>
                                {notification.content}
                              </Text>
                              <br />
                              <Text fontSize="xs" color="gray.500" mb={2}>
                                {notification.timestamp}
                              </Text>
                              <Text fontSize="xs" color="red" ml={"55%"} mb={2}>
                                Status: Not Readed
                              </Text>
                              <Flex justify="flex-end">
                                <IconButton
                                  aria-label="Mark as Read"
                                  icon={<FiCheck />}
                                  onClick={() =>
                                    markNotificationAsRead(notification._id)
                                  }
                                  variant="solid"
                                  colorScheme="green"
                                  size={"sm"}
                                  mr={2}
                                />
                                <IconButton
                                  aria-label="Delete Notification"
                                  icon={<FiTrash />}
                                  onClick={() =>
                                    deleteNotification(notification._id)
                                  }
                                  variant="solid"
                                  size={"sm"}
                                  colorScheme="red"
                                />
                              </Flex>
                            </>
                          )}
                        </Box>
                      ))}
                  </>
                ) : (
                  <Text>No notifications found.</Text>
                )}
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
        {/* Rest of the code */}
      </nav>
    </header>
  );
};

export default CompanyNavigation;

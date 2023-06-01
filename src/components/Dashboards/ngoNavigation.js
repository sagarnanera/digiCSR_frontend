import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Button,
  Text,
  Box,
} from "@chakra-ui/react";
import classes from "../../CSS/ComCss.module.css";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { FiBell } from "react-icons/fi";

import jwt_decode from "jwt-decode";

const NgoNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [ngoId, setNgoId] = useState("");
  // const toast = useToast();
  useEffect(() => {
    const token = localStorage.getItem("NgoAuthToken");
    const decodedToken = jwt_decode(token);
    setNgoId(decodedToken._id);
  }, []);
  const fetchNotifications = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/ngo/notifications/${ngoId}`
      );
      const data = await response.json();
      if (data.success) {
        setNotifications(data.notifications);
      } else {
        console.log(data.message);
        throw new Error("Failed to fetch notifications. Please try again.");
      }
    } catch (error) {
      console.log(error.message);
      // Handle error
    }
  };
  useEffect(() => {
    fetchNotifications();
  });

  const markNotificationAsRead = async (notificationId) => {
    try {
      const response = await fetch(
        "http://localhost:4000/ngo/notifications/updatestatus",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            notificationID: notificationId,
            recipientID: ngoId,
          }),
        }
      );
      const data = await response.json();
      if (data.success) {
        // Update the read status in the local state
        setNotifications((prevNotifications) =>
          prevNotifications.map((notification) =>
            notification._id === notificationId
              ? { ...notification, read: true }
              : notification
          )
        );
      } else {
        console.log(data.message);
        throw new Error(
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
        "http://localhost:4000/ngo/notifications/delete",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            notificationID: notificationId,
            recipientID: ngoId,
          }),
        }
      );
      const data = await response.json();
      if (data.success) {
        // Remove the notification from the local state
        setNotifications((prevNotifications) =>
          prevNotifications.filter(
            (notification) => notification._id !== notificationId
          )
        );
      } else {
        console.log(data.message);
        throw new Error("Failed to delete notification. Please try again.");
      }
    } catch (error) {
      console.log(error.message);
      // Handle error
    }
  };
  const handleBellIconClick = () => {
    setIsDrawerOpen(true);
  };

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
              onClick={handleBellIconClick}
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
        <Drawer
          isOpen={isDrawerOpen}
          placement="right"
          onClose={() => setIsDrawerOpen(false)}
          size="sm"
        >
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Notifications</DrawerHeader>
              <DrawerBody>
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <Box
                      key={notification._id}
                      borderWidth="1px"
                      borderRadius="md"
                      p={4}
                      mb={4}
                    >
                      <Text fontSize="lg" fontWeight="bold" mb={2}>
                        {notification.content}
                      </Text>
                      <br />
                      <Text fontSize="sm" color="gray.500" mb={2}>
                        {notification.timestamp}
                      </Text>
                      {notification.read ? (
                        <Text fontSize="sm" color="green" ml={2} mb={2}>
                          Status: Readed
                        </Text>
                      ) : (
                        <>
                          <Text fontSize="sm" color="red" ml={2} mb={2}>
                            Status: Not Readed
                          </Text>
                          <Button
                            colorScheme="blue"
                            size="sm"
                            onClick={() =>
                              markNotificationAsRead(notification._id)
                            }
                            // mb={2}
                          >
                            Mark as Read
                          </Button>
                        </>
                      )}
                      {/* <Divider /> */}
                      <Button
                        colorScheme="red"
                        size="sm"
                        onClick={() => deleteNotification(notification._id)}
                        ml={2}
                      >
                        Delete
                      </Button>
                    </Box>
                  ))
                ) : (
                  <Text>No notifications found.</Text>
                )}
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </nav>
    </header>
  );
};

export default NgoNavigation;

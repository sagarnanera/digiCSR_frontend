import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Text,
  Box,
  Flex,
  Badge,
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
import { FiBell, FiCheck, FiTrash } from "react-icons/fi";

// import jwt_decode from "jwt-decode";

const NgoNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  // const toast = useToast();

  const fetchNotifications = async () => {
    try {
      const result = localStorage.getItem("NgoAuthToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          authorization: result,
        },
      };
      const response = await fetch(`http://localhost:4000/notifications`, {
        headers: config.headers,
      });
      const data = await response.json();
      if (data.success) {
        setNotifications(data.notifications);
        const unreadCount = data.notifications.filter(
          (notification) => !notification.read
        ).length;

        // Update the unread count state
        setUnreadCount(unreadCount);
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
  }, []);

  const markNotificationAsRead = async (notificationId) => {
    try {
      const response = await fetch(
        "http://localhost:4000/notifications/updatestatus",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `${localStorage.getItem("NgoAuthToken")}`, // Add authorization header
          },
          body: JSON.stringify({
            notificationID: notificationId,
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
        "http://localhost:4000/notifications/delete",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            notificationID: notificationId,
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
              to="/Ngo/RFPs"
              className={
                location.pathname === "/Ngo/RFPs" ? classes.active : ""
              }
            >
              RFP Requests
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
              to="/Ngo/acceptedRFPs"
              className={
                location.pathname === "/Ngo/acceptedRFPs" ? classes.active : ""
              }
            >
              Accepted RFPs
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
              ml={-5}
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
                  <>
                    {notifications
                      .sort((a, b) => {
                        if (a.read && !b.read) {
                          return 1; // Place read notifications after unread notifications
                        } else if (!a.read && b.read) {
                          return -1; // Place unread notifications before read notifications
                        } else {
                          // Sort by timestamp if read statuses are the same
                          return b.timestamp - a.timestamp;
                        }
                      })
                      .map((notification) => (
                        <Box
                          key={notification._id}
                          borderWidth="1px"
                          borderRadius="md"
                          p={4}
                          mb={4}
                        >
                          {notification.read ? (
                            <>
                              <Text fontSize="lg" fontWeight="hairline" mb={2}>
                                {notification.content}
                              </Text>
                              <br />
                              <Text fontSize="sm" color="gray.500" mb={2}>
                                {notification.timestamp}
                              </Text>
                              <Text fontSize="sm" color="green" ml={2} mb={2}>
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
                                />
                              </Flex>
                            </>
                          ) : (
                            <>
                              <Text fontSize="lg" fontWeight="bold" mb={2}>
                                {notification.content}
                              </Text>
                              <br />
                              <Text fontSize="sm" color="gray.500" mb={2}>
                                {notification.timestamp}
                              </Text>
                              <Text fontSize="sm" color="red" ml={2} mb={2}>
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
                                  mr={2}
                                />
                                <IconButton
                                  aria-label="Delete Notification"
                                  icon={<FiTrash />}
                                  onClick={() =>
                                    deleteNotification(notification._id)
                                  }
                                  variant="solid"
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
      </nav>
    </header>
  );
};

export default NgoNavigation;

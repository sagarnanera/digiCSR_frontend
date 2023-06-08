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
  Button,
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
import jwt_decode from "jwt-decode";

// import jwt_decode from "jwt-decode";

const NgoNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [ngoId, setNgoId] = useState("");

  // const toast = useToast();
  const [image, setImage] = useState("/user-avatar.jpg"); // State to store the selected image
useEffect(() => {
  const token = localStorage.getItem("NgoAuthToken");
  const decodedToken = jwt_decode(token);
  setNgoId(decodedToken._id);
}, []);
   useEffect(() => {
     const fetchLogo = async () => {
       try {
         const response = await fetch(
           `http://localhost:4000/NGO/logo/${ngoId}`
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
     if (ngoId && ngoId !== "") {
       fetchLogo();
     }
     // return () => {
     //   // Clean up the created object URL
     //   URL.revokeObjectURL(image);
     // };
   }, [ngoId]);
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
            authorization: `${localStorage.getItem("NgoAuthToken")}`,
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
  const markAllAsRead = async () => {
    try {
      // Iterate over each notification and mark it as read
      for (const notification of notifications) {
        await markNotificationAsRead(notification._id);
      }

      // After marking all notifications as read, update the local state
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
      // Filter out the read notifications
      const readNotifications = notifications.filter(
        (notification) => notification.read
      );

      // Iterate over each read notification and delete it
      for (const notification of readNotifications) {
        await deleteNotification(notification._id);
      }

      // After deleting all read notifications, update the local state
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
          {/* <li>
            <Link
              to="/Ngo/postblogs"
              className={
                location.pathname === "/Ngo/postblogs" ? classes.active : ""
              }
            >
              Post Success
            </Link>
          </li> */}
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
                src={image ? image : "/user-avatar"}
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
                    <Flex justify="flex-end">
                      <Button
                        variant="outline"
                        colorScheme="green"
                        onClick={markAllAsRead}
                        disabled={notifications.length === 0}
                      >
                        Mark All as Read
                      </Button>
                      <Button
                        variant="outline"
                        colorScheme="red"
                        onClick={deleteAllRead}
                        disabled={notifications.length === 0}
                        ml={2}
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

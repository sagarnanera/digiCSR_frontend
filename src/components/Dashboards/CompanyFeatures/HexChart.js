import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "../../../CSS/HexGrid.css";

const HexGrid = ({ userType }) => {
  const [items, setItems] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    console.log(userType);
    if (userType === "company") {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:4000/charts/sector", {
            headers: {
              authorization: localStorage.getItem("CompanyAuthToken"),
            },
          });
          const data = await response.json();
          if (data.success) {
            setItems(data.result);
          } else {
            console.error(data.message);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
      fetchData();
    } else if (userType === "ngo") {
      const fetchData = async () => {
        try {
          const response = await fetch(
            "http://localhost:4000/charts/ngo/sector",
            {
              headers: {
                authorization: localStorage.getItem("NgoAuthToken"),
              },
            }
          );
          const data = await response.json();
          if (data.success) {
            setItems(data.result);
          } else {
            console.error(data.message);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
      fetchData();
    }
  }, [userType]);

  const handleItemHover = (item) => {
    setHoveredItem(item);
  };

  return (
    <div style={{ marginLeft: "50vw", marginTop: "10vh" }}>
      <div className="hex-grid">
        {items.map((item, index) => (
          <Popover
            key={index}
            placement="top"
            isLazy
            closeOnBlur={false}
            onClose={() => handleItemHover(null)}
          >
            <PopoverTrigger>
              <div
                className={`hex-item ${hoveredItem === item ? "hovered" : ""}`}
                onMouseEnter={() => handleItemHover(item)}
                onMouseLeave={() => handleItemHover(null)}
              >
                {item._id}
              </div>
            </PopoverTrigger>
            <PopoverContent
              bg="white"
              border="none"
              boxShadow="md"
              p={3}
              borderRadius="md"
            >
              <h3>{item._id}</h3>
              <p>Total Amount: {item.totalAmount}</p>
            </PopoverContent>
          </Popover>
        ))}
        <Text display={"flex"} justifyContent={"flex-start"} ml={"8"} mt={10} width={"25vw"}>
          <strong>Donations in each Sectors</strong>
        </Text>
      </div>
    </div>
  );
};

export default HexGrid;

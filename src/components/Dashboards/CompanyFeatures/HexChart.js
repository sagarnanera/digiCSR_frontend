import { Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const HexGrid = () => {
  const [items, setItems] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

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

  const handleItemHover = (item) => {
    setHoveredItem(item);
  };

  return (
    <div style={{marginLeft:"50vw",marginTop:"10vh"}}>
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
      </div>
    </div>
  );
};

export default HexGrid;

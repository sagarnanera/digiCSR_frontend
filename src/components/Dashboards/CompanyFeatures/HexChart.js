import { Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const PieChartComponent = ({ userType }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
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
            setData(data.result);
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
            setData(data.result);
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

  const chartOptions = {
    labels: data.map((item) => item._id),
    colors: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"],
    legend: {
      textWrap: "wrap",
    },
  };

  return (
    <div style={{ marginLeft: "40vw", marginTop: "10vh" }}>
      <Chart
        options={chartOptions}
        series={data.map((item) => item.totalAmount)}
        type="pie"
        width={"200%"}
        height={"150%"}
      />
      <Text
        display={"flex"}
        justifyContent={"flex-start"}
        ml={"8"}
        pl={12}
        mt={10}
        width={"25vw"}
      >
        <strong>Donations in each Sectors</strong>
      </Text>
    </div>
  );
};

export default PieChartComponent;

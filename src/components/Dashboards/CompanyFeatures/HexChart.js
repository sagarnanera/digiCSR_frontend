import { Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const PieChartComponent = ({ userType }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    var options;
    if (userType === "company" || userType === "beneficiary") {
      const token =
        userType === "company"
          ? localStorage.getItem("CompanyAuthToken")
          : localStorage.getItem("BeneficiaryAuthToken");

      options = {
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
      };
    } else {
      const token =
        userType === "ngo"
          ? localStorage.getItem("NgoAuthToken")
          : localStorage.getItem("AdminAuthToken");

      options = {
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
      };
    }
    if (userType === "company") {
      const fetchData = async () => {
        try {
          const response = await fetch(
            "http://localhost:4000/charts/sector",
            options
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
    } else if (userType !== "company") {
      const fetchData = async () => {
        try {
          const response = await fetch(
            "http://localhost:4000/charts/ngo/sector",
            options
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
      {data.length > 0 ? (
        <>
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
        </>
      ) : (
        <>
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
            <br />
          </Text>
        </>
      )}
    </div>
  );
};

export default PieChartComponent;

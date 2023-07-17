import { Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const YearChart = ({ userType }) => {
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "year-chart",
        width: "100%",
      },
      xaxis: {
        categories: [],
      },
    },
    barSeries: [],
  });

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
      console.log(userType);
      const fetchYearChartData = async () => {
        try {
          const response = await fetch(
            "http://localhost:4000/charts/year",
            options
          );
          const data = await response.json();
          if (response.ok) {
            const results = data.result;
            const chartOptions = {
              chart: {
                width: 600, // Specify the desired width of the chart
              },
              xaxis: {
                categories: results.map((result) => result._id), // Use the years as categories
              },
            };
            console.log(results);
            const barSeries = [
              {
                name: "Total Amount",
                data: Object.values(results).map(
                  (result) => result.totalAmount
                ),
              },
            ];
            setChartData({ options: chartOptions, barSeries });
          } else {
            console.error("Failed to fetch year chart data:", data.message);
          }
        } catch (error) {
          console.error("Failed to fetch year chart data:", error);
        }
      };

      fetchYearChartData();
    } else if (userType !== "company") {
      const fetchYearChartData = async () => {
        try {
          const response = await fetch(
            "http://localhost:4000/charts/ngo/year",
            options
          );
          const data = await response.json();
          if (response.ok) {
            const results = data.result;
            const chartOptions = {
              chart: {
                width: 600, // Specify the desired width of the chart
              },
              xaxis: {
                categories: results.map((result) => result._id), // Use the years as categories
              },
            };
            const barSeries = [
              {
                name: "Total Amount",
                data: Object.values(results).map(
                  (result) => result.totalAmount
                ),
              },
            ];
            setChartData({ options: chartOptions, barSeries });
          } else {
            console.error("Failed to fetch year chart data:", data.message);
          }
        } catch (error) {
          console.error("Failed to fetch year chart data:", error);
        }
      };

      fetchYearChartData();
    }
  }, [userType]);

  return (
    <VStack ml={"-900px"} mt={"-550px"}>
      {chartData.barSeries.length > 0 ? (
        <>
          <Chart
            options={chartData.options}
            series={chartData.barSeries}
            type="bar"
            width={chartData.options.chart.width}
          />
          <Text pt={5}>
            <strong>Donations per Year</strong>
            <br />
            <br />
          </Text>
        </>
      ) : (
        <Text style={{ marginLeft:"55vw" }}>
          No Data Available for chart
        </Text>
      )}
    </VStack>
  );
};

export default YearChart;

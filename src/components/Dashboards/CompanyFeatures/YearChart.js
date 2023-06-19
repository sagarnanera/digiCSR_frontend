import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const YearChart = () => {
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
  const fetchYearChartData = async () => {
    try {
      const response = await fetch("http://localhost:4000/charts/year", {
        headers: {
          authorization: localStorage.getItem("CompanyAuthToken"),
        },
      });
      const data = await response.json();
      if (response.ok) {
        const results = data.result;
        const chartOptions = {
          chart: {
            width: 600, // Specify the desired width of the chart
          },
          xaxis: {
            categories: Object.keys(results), // Use the years as categories
          },
        };
        const barSeries = [
          {
            name: "Total Amount",
            data: Object.values(results).map((result) => result.totalAmount),
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
}, []);



  return (
    <Chart
      options={chartData.options}
      series={chartData.barSeries}
      type="bar"
      width={chartData.options.chart.width}
    />
  );
};

export default YearChart;

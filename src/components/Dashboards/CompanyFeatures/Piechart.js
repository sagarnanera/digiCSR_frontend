import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
// import "../../../CSS/piechart.css";
import DatamapsIndia from "react-datamaps-india";
import "../../../CSS/styles.css";
import "../../../CSS/HexGrid.css";
import { HStack } from "@chakra-ui/react";
import HexGrid from "./HexChart";
import YearChart from "./YearChart";
function PieChart() {
  const [regionData, setRegionData] = useState(null);
  useEffect(() => {
    const fetchStateChartData = async () => {
      try {
        const response = await fetch("http://localhost:4000/charts/state", {
          headers: {
            authorization: localStorage.getItem("CompanyAuthToken"),
          },
        });
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          const results = data.result;
          const mappedData = {};
          results.forEach((result) => {
            mappedData[result._id] = {
              value: result.totalAmount,
            };
          });
          setRegionData(mappedData);
        } else {
          console.error("Failed to fetch state chart data:", data.message);
        }
      } catch (error) {
        console.error("Failed to fetch state chart data:", error);
      }
    };
    fetchStateChartData();
  }, []);
  // Sample data for the pie and bar charts
  const chartData = {
    pieSeries: [44, 55, 13, 43],
    barSeries: [30, 40, 45, 50],
    options: {
      colors: ["#237AAA", "#4895C6", "#85CCFF", "#A3E9FF"],
      labels: ["Label 1", "Label 2", "Label 3", "Label 4"],
      chart: {
        background: "#343a40",
        foreColor: "#ffffff",
        width: 565,
        type: "donut",
      },
      legend: {
        position: "bottom",
      },
      responsive: [
        {
          breakpoint: 520,
          options: {
            chart: {
              width: "100%",
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
      plotOptions: {
        pie: {
          donut: {
            labels: {
              width: 565,
            },
          },
        },
      },
    },
  };

  return (
    <>
      <div className="mapchart">
        {regionData ? (
          <HStack>
            <DatamapsIndia
              style={{
                postion: "relative",
                left: "25%",
              }}
              regionData={regionData}
              hoverComponent={({ value }) => {
                return (
                  <div>
                    <div>
                      {value.name} {value.value} $
                    </div>
                  </div>
                );
              }}
              mapLayout={{
                legendTitle: "Number of $s",
                startColor: "#b3d1ff",
                endColor: "#005ce6",
                hoverTitle: "Count",
                noDataColor: "#f5f5f5",
                borderColor: "#8D8D8D",
                hoverColor: "blue",
                hoverBorderColor: "green",
                height: 10,
                weight: 30,
              }}
            />
            <HexGrid />
          </HStack>
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <div className="pie"></div>
      <div className="pie">
        <YearChart />
        {/* <Chart
          options={chartData.options}
          series={chartData.pieSeries}
          type="pie"
          width={chartData.options.chart.width}
        /> */}
      </div>
    </>
  );
}

export default PieChart;

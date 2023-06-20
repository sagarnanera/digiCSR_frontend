import React, { useEffect, useState } from "react";
// import "../../../CSS/piechart.css";
import DatamapsIndia from "react-datamaps-india";
import "../../../CSS/styles.css";

function MapChart(userType) {
  const [regionData, setRegionData] = useState(null);
  useEffect(() => {
    if (userType.userType.userType === "company") {
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
    } else if (userType.userType.userType === "NGO") {
      const fetchStateChartData = async () => {
        try {
          const response = await fetch(
            "http://localhost:4000/charts/ngo/state",
            {
              headers: {
                authorization: localStorage.getItem("NgoAuthToken"),
              },
            }
          );
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
    }
  }, [userType]);

  return (
    <div className="map">
      <div className="map-container">
        {regionData ? (
          <DatamapsIndia
            style={{
              postion: "relative",
              left: "25%",
              width: "30px", // Adjust the width as desired
              height: "20px", // Adjust the height as desired
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
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}

export default MapChart;
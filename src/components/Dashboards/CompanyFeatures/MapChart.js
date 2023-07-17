import React, { useEffect, useState } from "react";
// import "../../../CSS/piechart.css";
// import jwt_decode from "jwt-decode";
import DatamapsIndia from "react-datamaps-india";
import "../../../CSS/styles.css";

function MapChart({ userType }) {
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
  const [regionData, setRegionData] = useState(null);
  useEffect(() => {
    if (userType === "company") {
      const fetchStateChartData = async () => {
        try {
          const response = await fetch(
            "http://localhost:4000/charts/state",
            options
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
    } else if (userType !== "company") {
      const fetchStateChartData = async () => {
        try {
          const response = await fetch(
            "http://localhost:4000/charts/ngo/state",
            options
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
              // width: "30px", // Adjust the width as desired
              // height: "20px", // Adjust the height as desired
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
              labels: {
                0: "0",
                20: "20",
                40: "40",
                60: "60",
                80: "80+",
              },
            }}
          />
        ) : (
          <>
            {/* <div className="no-data-message">No Data Available for chart</div>
            <br />
            <strong style={{ marginLeft: "15vw" }} className="no-data-message">
              Donatoin per State
            </strong> */}
          </>
        )}
        {regionData && (
          <div
            style={{
              marginLeft: "65vw",
              marginTop: "-55vh",
              marginBottom: "50vh",
            }}
          >
            <div>
              <span
                className="color-box"
                style={{ backgroundColor: "#b3d1ff" }}
              />
              <span>Lowest Donations</span>
            </div>
            <div>
              <span
                className="color-box"
                style={{ backgroundColor: "#88a7f7" }}
              />
              <span>Less than Average Donations</span>
            </div>
            <div>
              <span
                className="color-box"
                style={{ backgroundColor: "#5d86ef" }}
              />
              <span>Average Donations</span>
            </div>
            <div>
              <span
                className="color-box"
                style={{ backgroundColor: "#1a7cfc" }}
              />
              <span>More than Average Donations</span>
            </div>
            <div>
              <span
                className="color-box"
                style={{ backgroundColor: "#005ce6" }}
              />
              <span>Highest Donations</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MapChart;

import React, { useEffect, useState } from "react";
import DatamapsIndia from "react-datamaps-india";

const MapChart = () => {
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

  return (
    <div>
      {regionData ? (
        <div style={{
          height: "100%", display: "flex", justifyContent: "center"
        }}>
          <DatamapsIndia
            style={{ width: "100%", height: "100vh !impotent" }}
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
              title: "OCs Deployed per State in India",
              legendTitle: "Number of OCs",
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
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default MapChart;

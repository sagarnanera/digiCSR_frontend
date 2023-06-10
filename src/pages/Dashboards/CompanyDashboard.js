import React from "react";
// import CompanyNavigation from "../../components/Dashboards/companyNavigation";
import "../../CSS/styles.css";
import MapChart from "../../components/Dashboards/CompanyFeatures/MapChart";

function CompanyDashboard() {
  return (
    <div style={{ position: "relative" }}>
      <MapChart style={{ position: "relative" }} />
    </div>
  );
}

export default CompanyDashboard;

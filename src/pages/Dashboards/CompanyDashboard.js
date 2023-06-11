import React from "react";
// import CompanyNavigation from "../../components/Dashboards/companyNavigation";
import "../../CSS/styles.css";
import MapChart from "../../components/Dashboards/CompanyFeatures/MapChart";
import CompanyNavigation from "../../components/Dashboards/companyNavigation";

function CompanyDashboard() {
  return (
    <div style={{ position: "relative" }}>
      <CompanyNavigation />
      <MapChart style={{ position: "relative" }} />
    </div>
  );
}

export default CompanyDashboard;

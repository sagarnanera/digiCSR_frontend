import React from "react";
// import CompanyNavigation from "../../components/Dashboards/companyNavigation";
// import "../../CSS/styles.css";
// import MapChart from "../../components/Dashboards/CompanyFeatures/MapChart";
import Homepage from "../../components/Dashboards/CompanyFeatures/Homepage";
import CompanyNavigation from "../../components/Navigation/companyNavigation";


function CompanyDashboard() {
  return (
    <div>
      <CompanyNavigation />
      <Homepage userType={"company"} />
      {/* <HexGrid /> */}
    </div>
  );
}

export default CompanyDashboard;

import React from "react";
import NgoNavigation from "../../components/Navigation/NgoNavigation";
import Homepage from "../../components/Dashboards/CompanyFeatures/Homepage"

const NgoDashboard = () => {
  return (
    <div>
      <NgoNavigation />
      <Homepage userType={"ngo"} />
    </div>
  );
};

export default NgoDashboard;

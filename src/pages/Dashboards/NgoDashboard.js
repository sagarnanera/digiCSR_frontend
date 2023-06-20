import React from "react";
import NgoNavigation from "../../components/Navigation/NgoNavigation";

const NgoDashboard = () => {
  return (
    <div>
      <NgoNavigation />
      <Homepage userType={"NGO"} />
    </div>
  );
};

export default NgoDashboard;

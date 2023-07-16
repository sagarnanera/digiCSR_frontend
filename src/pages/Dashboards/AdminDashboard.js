import React from "react";
import AdminNavigation from "../../components/Navigation/adminNavigation";
import Homepage from "../../components/Dashboards/CompanyFeatures/Homepage";

const AdminDashboard = () => {
  return (
    <div>
      <AdminNavigation />
      <Homepage userType={"Admin"} />
    </div>
  );
};

export default AdminDashboard;

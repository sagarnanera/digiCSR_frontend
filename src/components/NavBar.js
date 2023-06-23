import React from "react";
import NgoNavigation from "./Navigation/NgoNavigation";
import CompanyNavigation from "./Navigation/companyNavigation";
import BeneficiaryNavigation from "./Navigation/beneficiaryNavigation";
import AdminNavigation from "./Navigation/adminNavigation";

const NavBar = ({ userType }) => {
  switch (userType) {
    case "ngo":
      return <NgoNavigation />;
    case "company":
      return <CompanyNavigation />;
    case "beneficiary":
      return <BeneficiaryNavigation />;
    case "admin":
      return <AdminNavigation />;
    default:
      return null;
  }
};

export default NavBar;

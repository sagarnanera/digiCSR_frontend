import React from "react";
import "./App.css";
import ChooseUserComponent from "./components/chooseUserComponent";
import { Route, Routes } from "react-router-dom";
import CompanyDashboard from "./pages/Dashboards/CompanyDashboard";
import TrackRPF from "./components/Dashboards/CompanyFeatures/TrackRPF";
import FundingStats from "./components/Dashboards/CompanyFeatures/FundingStats";
import NGOReviews from "./components/Dashboards/CompanyFeatures/NGOReviews";
import RaiseRPF from "./components/Dashboards/CompanyFeatures/RaiseRPF";
import EditProfile from "./components/Dashboards/CompanyFeatures/EditProfile";
import ShowProfile from "./components/Dashboards/CompanyFeatures/showProfile";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ChooseUserComponent />} />
        <Route path="/Company" element={<CompanyDashboard />} />
        <Route path="/Company/RaiseRPF" element={<RaiseRPF />} />
        <Route path="/Company/TrackRPF" element={<TrackRPF />} />
        <Route path="/Company/FundingStats" element={<FundingStats />} />
        <Route path="/Company/NGOReviews" element={<NGOReviews />} />
        <Route path="/Company/editprofile" element={<EditProfile />} />
        <Route path="/Company/profile" element={<ShowProfile />} />
      </Routes>
    </div>
  );
}

export default App;

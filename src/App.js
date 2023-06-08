import React, { useEffect } from "react";
import "./App.css";
import ChooseUserComponent from "./components/chooseUserComponent";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import CompanyDashboard from "./pages/Dashboards/CompanyDashboard";
import TrackRFP from "./components/Dashboards/CompanyFeatures/TrackRFP";
import FundingStats from "./components/Dashboards/CompanyFeatures/FundingStats";
import NGOReviews from "./components/Dashboards/CompanyFeatures/NGOReviews";
import RaiseRFP from "./components/Dashboards/CompanyFeatures/RaiseRFP";
import AddProfile from "./components/Dashboards/CompanyFeatures/AddProfile";
import ShowProfile from "./components/Dashboards/CompanyFeatures/showProfile";
import NgoDashboard from "./pages/Dashboards/NgoDashboard";
import RFPRequests from "./components/Dashboards/NgoFeatures/RFPRequests";
import PostBlogs from "./components/Dashboards/NgoFeatures/PostBlogs";
import AcceptedRFP from "./components/Dashboards/NgoFeatures/AcceptedRFP";
import MediaSection from "./components/Dashboards/NgoFeatures/MediaSection";
import ShowNgoProfile from "./components/Dashboards/NgoFeatures/ShowNgoProfile";
import AddNgoProfile from "./components/Dashboards/NgoFeatures/AddNgoProfile";
import EditProfile from "./components/Dashboards/CompanyFeatures/EditProfile";
import EditNgoProfile from "./components/Dashboards/NgoFeatures/EditNgoProfile";
import RFPDetails from "./components/Dashboards/NgoFeatures/RFPDetails";
import RFPCompanyDetails from "./components/Dashboards/CompanyFeatures/RFPDetails";
import Post from "./components/Dashboards/NgoFeatures/Post";

function App() {
  const authToken = localStorage.getItem("CompanyAuthToken");
  const NgoauthToken = localStorage.getItem("NgoAuthToken");
  const isCompanyAuthenticated = authToken !== null;
  const isNgoAuthenticated = NgoauthToken !== null;

  const navigate = useNavigate();

  useEffect(() => {
    if (!isCompanyAuthenticated && !isNgoAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isCompanyAuthenticated, isNgoAuthenticated, navigate]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ChooseUserComponent />} />
        {isCompanyAuthenticated && (
          <Route path="/Company" element={<CompanyDashboard />} />
        )}
        {isNgoAuthenticated && <Route path="/Ngo" element={<NgoDashboard />} />}
        {isCompanyAuthenticated && (
          <>
            <Route path="/Company/RaiseRFP" element={<RaiseRFP />} />
            <Route path="/Company/TrackRFP" element={<TrackRFP />} />
            <Route path="/Company/FundingStats" element={<FundingStats />} />
            <Route path="/Company/NGOReviews" element={<NGOReviews />} />
            <Route path="/Company/addprofile" element={<AddProfile />} />
            <Route path="/Company/editprofile" element={<EditProfile />} />
            <Route path="/Company/rfpdetails" element={<RFPCompanyDetails />} />
            <Route path="/Company/profile" element={<ShowProfile />} />
          </>
        )}
        {isNgoAuthenticated && (
          <>
            <Route path="/Ngo/RFPs" element={<RFPRequests />} />
            <Route path="/Ngo/acceptedRFPs" element={<AcceptedRFP />} />
            <Route path="/Ngo/media" element={<MediaSection />} />
            <Route path="/Ngo/media/create" element={<PostBlogs />} />
            <Route path="/Ngo/profile" element={<ShowNgoProfile />} />
            <Route path="/Ngo/editprofile" element={<EditNgoProfile />} />
            <Route path="/Ngo/rfpdetails" element={<RFPDetails />} />
            <Route path="/Ngo/addprofile" element={<AddNgoProfile />} />
          </>
        )}
        <Route path="/Ngo/media/post/:id" element={<Post />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;

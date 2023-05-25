import React, { useContext, useEffect } from "react";
import "./App.css";
import ChooseUserComponent, {
  SelectedOptionContext,
} from "./components/chooseUserComponent";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import CompanyDashboard from "./pages/Dashboards/CompanyDashboard";
import TrackRPF from "./components/Dashboards/CompanyFeatures/TrackRPF";
import FundingStats from "./components/Dashboards/CompanyFeatures/FundingStats";
import NGOReviews from "./components/Dashboards/CompanyFeatures/NGOReviews";
import RaiseRPF from "./components/Dashboards/CompanyFeatures/RaiseRPF";
import EditProfile from "./components/Dashboards/CompanyFeatures/EditProfile";
import ShowProfile from "./components/Dashboards/CompanyFeatures/showProfile";
import NgoDashboard from "./pages/Dashboards/NgoDashboard";
import RPFRequests from "./components/Dashboards/NgoFeatures/RPFRequests";
import PostBlogs from "./components/Dashboards/NgoFeatures/PostBlogs";
import AcceptedRPF from "./components/Dashboards/NgoFeatures/AcceptedRPF";
import MediaSection from "./components/Dashboards/NgoFeatures/MediaSection";
import ShowNgoProfile from "./components/Dashboards/NgoFeatures/ShowNgoProfile";
import EditNgoProfile from "./components/Dashboards/NgoFeatures/EditNgoProfile";

function App() {
  const selectedOption = useContext(SelectedOptionContext);
  let authToken = null;
  if (selectedOption === "Company") {
    authToken = localStorage.getItem("CompanyAuthToken");
  } else if (selectedOption === "Ngo") {
    authToken = localStorage.getItem("NgoAuthToken");
  }
  const isAuthenticated = authToken !== null;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);
  return (
    <div className="App">
      <Routes>


        {isAuthenticated === "Company" ? (
          <>
            <Route path="/" element={<ChooseUserComponent />} />
            <Route path="/Company" element={<CompanyDashboard />} />
            <Route path="/Company/RaiseRPF" element={<RaiseRPF />} />
            <Route path="/Company/TrackRPF" element={<TrackRPF />} />
            <Route path="/Company/FundingStats" element={<FundingStats />} />
            <Route path="/Company/NGOReviews" element={<NGOReviews />} />
            <Route path="/Company/editprofile" element={<EditProfile />} />
            <Route path="/Company/profile" element={<ShowProfile />} />
          </>
        ) : (
          <>
            <Route path="/" element={<ChooseUserComponent />} />
          </>
        )}

        
        {isAuthenticated === "Ngo" ? (
          <>
            <Route path="/" element={<ChooseUserComponent />} />
            <Route path="/Ngo" element={<NgoDashboard />} />
            <Route path="/Ngo/RPFs" element={<RPFRequests />} />
            <Route path="/Ngo/postblogs" element={<PostBlogs />} />
            <Route path="/Ngo/acceptedrpfs" element={<AcceptedRPF />} />
            <Route path="/Ngo/media" element={<MediaSection />} />
            <Route path="/Ngo/profile" element={<ShowNgoProfile />} />
            <Route path="/Ngo/editprofile" element={<EditNgoProfile />} />
          </>
        ) : (
          <>
            <Route path="/" element={<ChooseUserComponent />} />
          </>
        )}
        {/* Redirect to home if not authenticated */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;

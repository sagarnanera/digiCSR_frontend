import React, { useEffect } from "react";
import "./App.css";
import ChooseUserComponent from "./components/chooseUserComponent";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import CompanyDashboard from "./pages/Dashboards/CompanyDashboard";
import TrackRFP from "./components/Dashboards/CompanyFeatures/TrackRFP";
import NGOReviews from "./components/Dashboards/CompanyFeatures/NGOReviews";
import RaiseRFP from "./components/Dashboards/CompanyFeatures/RaiseRFP";
import AddProfile from "./components/Dashboards/CompanyFeatures/AddProfile";
import ShowProfile from "./components/Dashboards/CompanyFeatures/showProfile";
import NgoDashboard from "./pages/Dashboards/NgoDashboard";
import RFPRequests from "./components/Dashboards/NgoFeatures/RFPRequests";
import PostBlogs from "./components/MediaSection/PostBlogs";
import AcceptedRFP from "./components/Dashboards/NgoFeatures/AcceptedRFP";
import MediaSection from "./components/MediaSection/MediaSection";
import ShowNgoProfile from "./components/Dashboards/NgoFeatures/ShowNgoProfile";
import AddNgoProfile from "./components/Dashboards/NgoFeatures/AddNgoProfile";
import EditProfile from "./components/Dashboards/CompanyFeatures/EditProfile";
import EditNgoProfile from "./components/Dashboards/NgoFeatures/EditNgoProfile";
import RFPDetails from "./components/Dashboards/NgoFeatures/RFPDetails";
import RFPCompanyDetails from "./components/Dashboards/CompanyFeatures/RFPDetails";
import Post from "./components/MediaSection/Post";
import BeneficiaryDashboard from "./pages/Dashboards/BeneficiaryDashboard";
import UpdateBlog from "./components/MediaSection/UpdateBlog";
import NGOs from "./components/Dashboards/NGOs";
import AdminAuth from "./pages/Authentication/adminAuth";
import AdminRFP from "./components/Dashboards/Admin/AdminAllRFPs";
import AdminCompanies from "./components/Dashboards/Admin/Companies";
import AdminBeneficiaries from "./components/Dashboards/Admin/Beneficiaries";
import AdminDashboard from "./pages/Dashboards/AdminDashboard";
import AdminNGOs from "./components/Dashboards/Admin/NGOs";

function App() {
  const authToken = localStorage.getItem("CompanyAuthToken");
  const NgoauthToken = localStorage.getItem("NgoAuthToken");
  const BeneficiaryauthToken = localStorage.getItem("BeneficiaryAuthToken");
  const AdminauthToken = localStorage.getItem("AdminAuthToken");
  // let selectedOption = "";
  const isCompanyAuthenticated = authToken !== null;
  const isNgoAuthenticated = NgoauthToken !== null;
  const isBeneficiaryAuthenticated = BeneficiaryauthToken !== null;
  const isAdminAuthenticated = AdminauthToken !== null;

  const navigate = useNavigate();

  useEffect(() => {
    if (
      !isCompanyAuthenticated &&
      !isNgoAuthenticated &&
      !isBeneficiaryAuthenticated &&
      !isAdminAuthenticated &&
      window.location.pathname !== "/admin"
    ) {
      navigate("/", { replace: true });
    }
  }, [
    isCompanyAuthenticated,
    isNgoAuthenticated,
    isBeneficiaryAuthenticated,
    isAdminAuthenticated,
    navigate,
  ]);

  return (
    <div className="App">
      <Routes>
        { }
        <Route path="/admin" element={<AdminAuth />} />
        <Route path="/" element={<ChooseUserComponent />} />
        {isCompanyAuthenticated && (
          <Route path="/Company" element={<CompanyDashboard />} />
        )}
        {isNgoAuthenticated && <Route path="/Ngo" element={<NgoDashboard />} />}
        {isAdminAuthenticated && (
          <Route path="/Admin/home" element={<AdminDashboard />} />
        )}
        {isBeneficiaryAuthenticated && (
          <Route path="/Beneficiary" element={<BeneficiaryDashboard />} />
        )}
        {isCompanyAuthenticated && (
          <>
            <Route path="/Company/RaiseRFP" element={<RaiseRFP />} />
            <Route path="/Company/TrackRFP" element={<TrackRFP />} />
            <Route path="/Company/NGOReviews" element={<NGOReviews />} />
            <Route path="/Company/addprofile" element={<AddProfile />} />
            <Route path="/Company/editprofile" element={<EditProfile />} />
            <Route path="/Company/rfpdetails" element={<RFPCompanyDetails />} />
            <Route path="/Company/profile" element={<ShowProfile />} />
            <Route
              path="/Company/media"
              element={<MediaSection userType={"company"} />}
            />
            <Route
              path="/Company/media/:id"
              element={<Post userType={"company"} />}
            />
            <Route
              path="/Company/ngos"
              element={<NGOs userType={"company"} />}
            />
            <Route
              path="/Company/ngo-profile/:id"
              element={<ShowNgoProfile userType={"company"} />}
            />
          </>
        )}
        {isNgoAuthenticated && (
          <>
            <Route path="/Ngo/RFPs" element={<RFPRequests />} />
            <Route path="/Ngo/acceptedRFPs" element={<AcceptedRFP />} />

            <Route
              path="/Ngo/media"
              element={<MediaSection userType={"ngo"} />}
            />
            <Route path="/Ngo/media/create" element={<PostBlogs />} />
            <Route path="/Ngo/media/:id" element={<Post userType={"ngo"} />} />
            <Route path="/Ngo/media/update/:id" element={<UpdateBlog />} />

            <Route path="/Ngo/profile" element={<ShowNgoProfile userType={"ngo"} />} />
            <Route path="/Ngo/editprofile" element={<EditNgoProfile />} />
            <Route path="/Ngo/rfpdetails" element={<RFPDetails />} />
            <Route path="/Ngo/addprofile" element={<AddNgoProfile />} />
          </>
        )}

        {isBeneficiaryAuthenticated && (
          <>
            <Route
              path="/Beneficiary/media"
              element={<MediaSection userType={"beneficiary"} />}
            />
            <Route
              path="/Beneficiary/media/:id"
              element={<Post userType={"beneficiary"} />}
            />
            <Route
              path="/Beneficiary/ngos"
              element={<NGOs userType={"beneficiary"} />}
            />
            <Route
              path="/Beneficiary/ngo-profile/:id"
              element={<ShowNgoProfile userType={"beneficiary"} />}
            />
          </>
        )}
        {isAdminAuthenticated && (
          <>
            <Route path="/Admin/RFP" element={<AdminRFP />} />
            <Route path="/Admin/ngos" element={<AdminNGOs />} />
            <Route path="/Admin/companies" element={<AdminCompanies />} />
            <Route
              path="/Admin/beneficiaries"
              element={<AdminBeneficiaries />}
            />
            <Route path="/Admin/ngo-profile/:id" element={<ShowNgoProfile userType={"admin"} />} />
            <Route
              path="/Admin/company-profile/:id"
              element={<ShowProfile />}
            />

            <Route
              path="/admin/media"
              element={<MediaSection userType={"admin"} />}
            />
            <Route
              path="/admin/media/:id"
              element={<Post userType={"admin"} />}
            />
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;

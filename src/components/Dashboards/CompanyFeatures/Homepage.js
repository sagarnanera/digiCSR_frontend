import React from "react";
// import Home from "./image_company-componant/HOME.png";
import "../../../CSS/homepage.css";
// import about from "./image_company-componant/about.png";
// import Rectangle from "./image_company-componant/Rectangle.png";
// import aboutp from "./image_company-componant/about-photo.png";
// import home3 from "../home3.png"
// import about2 from "./image_company-componant/about2.png"
// import facebook from "./image_company-componant/facebook.png";
// import instagram from "./image_company-componant/instagram.png";
// import twitter from "./image_company-componant/twitter.png";
// import Linkdin from "./image_company-componant/Linkdin.png";
// import PieChart from "./Piechart";
import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter } from "react-icons/fi";
import { HStack, Icon, VStack } from "@chakra-ui/react";
import MapChart from "./MapChart";
import HexGrid from "./HexChart";
import YearChart from "./YearChart";
import "../../../CSS/styles.css";
import "../../../CSS/HexGrid.css";
function Homepage(userType) {
  return (
    <>
      <div className="home-page-container">
        <img className="background-img" src={"../HOME.png"} alt="home"></img>
        <div className="block-about-container">
          <div className="main-header">Corporate Social Responsibility</div>
          <div className="second-header">with DigiCSR</div>
          <div className="font-header">
            Digicsr will help companies to ease their companies by genrating
            annual report,project & auditor's report
          </div>
          <div className="buttonsss">
            <button id="button-p">Login</button>
            <button id="button-s">FILL THE FORM</button>
          </div>
        </div>
      </div>
      <>
        <div className="mapchart">
          <HStack>
            <VStack>
              <MapChart userType={userType} />
            </VStack>
            <HexGrid userType={userType} />
          </HStack>
        </div>
        <div className="pie">
          <YearChart userType={userType} />
        </div>
      </>
      <div className="second-part" style={{ maxWidth: "99vw", top: "20vh" }}>
        <img src={"../Rectangle.png"} alt="home"></img>
        <div className="font">
          <div className="font1">CSR Expenditure:</div>
          <div className="font2">Summary</div>
        </div>
        <div className="card">
          <div className="card1">
            <p className="text-cards">20845</p>
            <p className="text-cards2">Total no. of Companies</p>
          </div>
          <div className="card1">
            <p className="text-cards">20845</p>
            <p className="text-cards2">Total no. of Companies</p>
          </div>
          <div className="card1">
            <p className="text-cards">20845</p>
            <p className="text-cards2">Total no. of Companies</p>
          </div>
          <div className="card1">
            <p className="text-cards">20845</p>
            <p className="text-cards2">Total no. of Companies</p>
          </div>
          <div className="card1">
            <p className="text-cards">20845</p>
            <p className="text-cards2">Total no. of Companies</p>
          </div>
        </div>
      </div>
      <div
        className="section-3"
        style={{
          // overflowX: "auto",
          maxWidth: "99vw",
          top: "20vh",
        }}
      >
        <img className="about-img" src={"/about.png"} alt="home"></img>
        <img className="about-img2" src={"../about-photo.png"} alt="home"></img>
        <div className="text-y">
          <p className="textus">About us</p>

          <p className="text-t">
            At DigiCSR , we believe in the power of Corporate Social
            Responsibility (CSR) to make a positive impact on society and the
            environment. As a leading provider of CSR management solutions, we
            are dedicated to helping companies navigate the complex world of
            social and environmental responsibility.
          </p>
        </div>
      </div>

      <div
        className="section-4"
        style={{
          // overflowX: "auto",
          maxWidth: "99vw",
          top: "21.9vh",
        }}
      >
        <img className="about-img3" src={"../about.png"} alt="home"></img>
        <div className="about5">
          <div className="about-first-part">
            <img src={"../image 7.png"} className="about4" alt="home"></img>
          </div>
          <div className="about-first-second">
            <div className="about-third">
              <p className="hj">
                123 Market St. #22B Charlottesville, California 44635
              </p>
              <p className="hj">(434) 546-4356</p>
              <p>contact@digicsr</p>
            </div>
            <div className="about-thirds">
              <p>Home</p>
              <p>Track</p>
              <p>Review</p>
              <p>About us</p>
            </div>
            <div className="about-third-images2">
              <div className="about-i">
                {/* <img src={"../facebook.png"} alt="home"></img> */}
                <Icon mt={"2"}>
                  <FiFacebook />
                </Icon>
                <p>facebook</p>
              </div>
              <div className="about-i">
                {/* <img src={"../twitter.png"} alt="home"></img> */}
                <Icon mt={"2"}>
                  <FiTwitter />
                </Icon>
                <p>Twitter</p>
              </div>
              <div className="about-i">
                <Icon mt={"2"}>
                  <FiLinkedin />
                </Icon>
                <p>Linkdin</p>
              </div>
              <div className="about-i">
                <Icon mt={"2"}>
                  <FiInstagram />
                </Icon>
                <p>Instagram</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;

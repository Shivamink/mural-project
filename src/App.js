import { useState, useEffect, createRef } from "react";
import axios from "axios";

import Ground from "./Assets/Ground.png";
import Airport from "./Assets/Airport.png";
import Building from "./Assets/Building.png";
import Building2 from "./Assets/Building-2.png";
import Building3 from "./Assets/Building-3.png";
import IREbuildings from "./Assets/I&RE buildings.png";
import TMTbuilding from "./Assets/TMT building.png";
import CMhospital from "./Assets/CM hospital.png";
import CMmall from "./Assets/CM mall.png";
import EDTech from "./Assets/EDTech Services school.png";
import ESGelectric from "./Assets/ESG electric lines.png";
import FSbank from "./Assets/FS bank.png";
import SLBCcoal from "./Assets/SL BC coal.png";
import IREdock from "./Assets/I&RE dock.png";
import SLBCbuilding from "./Assets/SL BC building.png";
import SLRAgovernment from "./Assets/SLRA government.png";
import SLRAhole from "./Assets/SLRA hole.png";
import IMAbuilding from "./Assets/IM&A building.png";
import TMTDrone from "./Assets/TMT Drone.png";
import TMTMovieposter from "./Assets/TMT Movie poster.png";
import TMTStadium from "./Assets/TMT Stadium.png";
import Mobileqr from "./Assets/Mobile qr.png";
import Consumermarkets from "./Assets/Consumer markets.png";
import EnergyNatural from "./Assets/Energy & Natural  Resources.png";
import FinancialServices from "./Assets/Financial Services.png";
import GovernmentPublic from "./Assets/Government &  Public Services.png";
import InfrastructureRealEstate from "./Assets/Infrastructure & Real Estate.png";
import IndustrialManufacturingAuto from "./Assets/Industrial Manufacturing  & Auto.png";
import TechnologyMediatelecom from "./Assets/Technology, Media & telecom.png";
import Services from "./Assets/Services.png";
import BusinessConsulting from "./Assets/Business Consulting.png";
import DigitalTrustCyber from "./Assets/Digital Trust- Cyber.png";
import RiskAdvisory from "./Assets/Risk Advisory.png";
import TechEnablement from "./Assets/Tech Enablement.png";
import OneMA from "./Assets/One M&A.png";
import ManagedServices from "./Assets/Managed Services.png";
import Tax from "./Assets/Tax.png";
import EnvironmentGovernance from "./Assets/Environment, Social and Governance.png";
import ESGtrees1 from "./Assets/ESG trees 1.png";
import ESGTree2 from "./Assets/ESG Tree 2.png";
import ESGtree3 from "./Assets/ESG tree 3.png";

const completemap = {
  sector1: ["CMhospital", "EDTech"],
  sector2: [],
  sector3: ["FSbank"],
  sector4: [],
  sector5: ["IREdock", "IREbuilding"],
  sector6: ["IMAbuilding"],
  sector7: [
    "TMTbuilding",
    "EDTech",
    "TMTStadium",
    "Mobileqr",
    "SLRAhole",
    "TMTDrone",
    "TMTMovieposter",
  ],
  service1: ["SLBCcoal", "SLBCbuilding", "Mobileqr"],
  service2: ["Mobileqr"],
  service3: ["SLRAhole", "SLRAgovernment"],
  service4: [],
  service5: [],
  service6: [],
  service7: [],
  service8: ["ESGelectric", "ESGtree3"],
  service9: [],
};

function App() {
  const [activeGroup, setActiveGroup] = useState({ prev: null, current: null });
  const [activeHotspot, setActiveHotspot] = useState({
    prev: null,
    current: null,
  });
  const [content, setContent] = useState([]);
  const [videoarr, setVideoarr] = useState([]);
  const [textarr, setTextarr] = useState([]);
  //Show hide content state
  const [modalbtn, setModalbtn] = useState(false);
  const [videomodal, setVideomodal] = useState(false);
  const [textmodal, setTextmodal] = useState(false);

  /**
   * @type{React.RefObject<HTMLDivElement>}
   */
  const backdropRef = createRef(null);
  let buttons = createRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(
        "https://experientialetc.com/KPMG-test/fetchMuralHotspotApi.php"
      );
      const data = await res.json();
      console.log(data);
      setContent(data.mural_hotspot);
    };
    fetchProducts();
  }, []);

  // Group Handler
  useEffect(() => {
    if (activeGroup.current === null) return;
    console.log(activeGroup);

    if (activeGroup.current && backdropRef)
      backdropRef.current.style.zIndex = 0;

    const currentGroup = completemap[activeGroup.current];
    if (currentGroup) {
      currentGroup.forEach((h) => {
        document.getElementById(h).style.zIndex = 1;
      });
    }

    if (activeGroup.current === activeGroup.prev) return;

    const prevGroup = completemap[activeGroup.prev];
    if (prevGroup) {
      prevGroup.forEach((h) => {
        document.getElementById(h).style.zIndex = 0;
      });
    }
  }, [activeGroup]);

  // Hotspot Handler
  useEffect(() => {
    if (activeHotspot.current === null) return;
    console.log(activeHotspot);

    if (activeGroup.current) {
      const currentGroup = completemap[activeGroup.current];
      currentGroup.forEach((h) => {
        if (h === activeHotspot.current) return;
        document.getElementById(h).style.zIndex = 0;
      });
    } else {
      document.getElementById(activeHotspot.current).style.zIndex = 1;
      backdropRef.current.style.zIndex = 0;
    }
  }, [activeHotspot]);

  function enablegroup(event) {
    console.log("Clicked on Group: ", event.target.id);
    setActiveGroup((state) => ({
      prev: state.current,
      current: event.target.id,
    }));
  }

  function individualitem(event) {
    console.log("Clicked on Hotspot: ", event.target.id);
    setActiveHotspot((state) => ({
      prev: state.current,
      current: event.target.id,
    }));

    const video = content.filter(
      (video) => video.hotspot_label == event.target.id
    );
    video.map((v) => console.log(v.content_url, v.content_type));
    setVideoarr(video);

    let itemval = document.getElementById(event.target.id);
    let itemin = itemval.getBoundingClientRect();
    console.log(itemin.top, itemin.left);
    let button = buttons.current;

    button.style.top = `${itemin.top.toFixed()}px`;
    button.style.left = `${itemin.left.toFixed() - 200}px`;
    if (itemin.left == 0 || itemin.top == 259.1964416503906) {
      console.log("fix");
      button.style.top = `${500}px`;
      button.style.left = `${1000}px`;
    }
    setModalbtn(true);
  }

  function videomodalfnc() {
    setVideomodal(true);
  }

  function textmodalfnc() {
    setTextmodal(true);
  }

  function reset() {
    const hostspots = document.getElementsByClassName("hotspot");
    for (let i = 0; i < hostspots.length; i++) {
      hostspots.item(i).style.zIndex = 0;
    }
    backdropRef.current.style.zIndex = -1;
    setActiveGroup((state) => ({
      prev: state.current,
      current: null,
    }));
    setActiveHotspot((state) => ({
      prev: state.current,
      current: null,
    }));

    console.log(videoarr, "videoarr");
    setModalbtn(false);
    setVideomodal(false);
    setTextmodal(false);
  }

  return (
    <div className="App">
      <div id="Parent">
        <img className="bg-image" src={Ground} />
        {/* <div className={isActive ? "backdrop" : ""}></div>
        <div className={isActive2 ? "backdrop2" : ""}></div> */}
        <img
          className="hotspot airport-image"
          id="Airport"
          src={Airport}
          onClick={individualitem}
        />
        <img
          className="hotspot building-image"
          id="Building"
          src={Building}
          onClick={individualitem}
        />
        <img
          className="hotspot building2-image"
          id="Building2"
          src={Building2}
          onClick={individualitem}
        />
        <img
          className="hotspot building3-image"
          id="Building3"
          src={Building3}
          onClick={individualitem}
        />
        <img
          className="hotspot IREbuilding-image"
          id="IREbuilding"
          src={IREbuildings}
          onClick={individualitem}
        />
        <img
          className="hotspot TMTbuilding-image"
          id="TMTbuilding"
          src={TMTbuilding}
          onClick={individualitem}
        />
        <img
          className="hotspot CMhospital-image"
          id="CMhospital"
          src={CMhospital}
          onClick={individualitem}
        />
        <img
          className="hotspot CMmall-image"
          id="CMmall"
          src={CMmall}
          onClick={individualitem}
        />
        <img
          className="hotspot EDTech-image"
          id="EDTech"
          src={EDTech}
          onClick={individualitem}
        />
        <img
          className="hotspot ESGelectric-image"
          id="ESGelectric"
          src={ESGelectric}
          onClick={individualitem}
        />
        <img
          className="hotspot FSbank-image"
          id="FSbank"
          src={FSbank}
          onClick={individualitem}
        />
        <img
          className="hotspot SLBCcoal-image"
          id="SLBCcoal"
          src={SLBCcoal}
          onClick={individualitem}
        />
        <img
          className="hotspot IREdock-image"
          id="IREdock"
          src={IREdock}
          onClick={individualitem}
        />
        <img
          className="hotspot SLBCbuilding-image"
          id="SLBCbuilding"
          src={SLBCbuilding}
          onClick={individualitem}
        />
        <img
          className="hotspot SLRAgovernment-image"
          id="SLRAgovernment"
          src={SLRAgovernment}
          onClick={individualitem}
        />
        <img
          className="hotspot SLRAhole-image"
          id="SLRAhole"
          src={SLRAhole}
          onClick={individualitem}
        />
        <img
          className="hotspot IMAbuilding-image"
          id="IMAbuilding"
          src={IMAbuilding}
          onClick={individualitem}
        />
        <img
          className="hotspot TMTDrone-image"
          id="TMTDrone"
          src={TMTDrone}
          onClick={individualitem}
        />
        <img
          className="hotspot TMTMovieposter-image"
          id="TMTMovieposter"
          src={TMTMovieposter}
          onClick={individualitem}
        />
        <img
          className="hotspot TMTMovieposter-image2"
          id="TMTMovieposter2"
          src={TMTMovieposter}
          onClick={individualitem}
        />
        <img
          className="hotspot TMTStadium-image"
          id="TMTStadium"
          src={TMTStadium}
          onClick={individualitem}
        />
        <img
          className="hotspot Mobileqr-image"
          id="Mobileqr"
          src={Mobileqr}
          onClick={individualitem}
        />
        <img
          className="hotspot ESGtrees1"
          id="ESGtrees1"
          src={ESGtrees1}
          onClick={individualitem}
        />
        <img
          className="hotspot ESGTree2"
          id="ESGTree2"
          src={ESGTree2}
          onClick={individualitem}
        />
        <img
          className="hotspot ESGtree3"
          id="ESGtree3"
          src={ESGtree3}
          onClick={individualitem}
        />
        <div id="primary">
          <button className="primary-btn" onClick={enablegroup}>
            <img
              className="primary-btnimage"
              id="sector1"
              src={Consumermarkets}
            />
          </button>
          <button className="primary-btn" onClick={enablegroup}>
            <img
              className="primary-btnimage"
              id="sector2"
              src={EnergyNatural}
            />
          </button>
          <button className="primary-btn" onClick={enablegroup}>
            <img
              className="primary-btnimage"
              id="sector3"
              src={FinancialServices}
            />
          </button>
          <button className="primary-btn" onClick={enablegroup}>
            <img
              className="primary-btnimage"
              id="sector4"
              src={GovernmentPublic}
            />
          </button>
          <button className="primary-btn" onClick={enablegroup}>
            <img
              className="primary-btnimage"
              id="sector5"
              src={InfrastructureRealEstate}
            />
          </button>
          <button className="primary-btn" onClick={enablegroup}>
            <img
              className="primary-btnimage"
              id="sector6"
              src={IndustrialManufacturingAuto}
            />
          </button>
          <button className="primary-btn" onClick={enablegroup}>
            <img
              className="primary-btnimage"
              id="sector7"
              src={TechnologyMediatelecom}
            />
          </button>
        </div>
        <div id="service">
          <button className="service-btn" onClick={enablegroup}>
            <img src={Services} className="service-btnimage" id="service1" />
          </button>
          <button className="service-btn" onClick={enablegroup}>
            <img
              src={BusinessConsulting}
              className="service-btnimage"
              id="service2"
            />
          </button>
          <button className="service-btn" onClick={enablegroup}>
            <img
              src={DigitalTrustCyber}
              className="service-btnimage"
              id="service3"
            />
          </button>
          <button className="service-btn" onClick={enablegroup}>
            <img
              src={RiskAdvisory}
              className="service-btnimage"
              id="service4"
            />
          </button>
          <button className="service-btn" onClick={enablegroup}>
            <img
              src={TechEnablement}
              className="service-btnimage"
              id="service5"
            />
          </button>
          <button className="service-btn" onClick={enablegroup}>
            <img src={OneMA} className="service-btnimage" id="service6" />
          </button>
          <button className="service-btn" onClick={enablegroup}>
            <img
              src={ManagedServices}
              className="service-btnimage"
              id="service7"
            />
          </button>
          <button className="service-btn" onClick={enablegroup}>
            <img src={Tax} className="service-btnimage" id="service8" />
          </button>
          <button className="service-btn" onClick={enablegroup}>
            <img
              src={EnvironmentGovernance}
              className="service-btnimage"
              id="service9"
            />
          </button>
        </div>
        <div
          className="modalbtns"
          ref={buttons}
          style={modalbtn ? { opacity: 1 } : { opacity: 0 }}
        >
          <button className="modalbtn" onClick={textmodalfnc}>
            Text
          </button>
          <button className="modalbtn" onClick={videomodalfnc}>
            Video
          </button>
          <button className="modalbtn">PDF</button>
        </div>
        <div
          id="video-container"
          style={videomodal ? { display: "block" } : { display: "none" }}
        >
          {videoarr.map((v) => (
            <video
              className="individualvideo"
              key={v.content_url}
              src={v.content_url}
              controls
            ></video>
          ))}
        </div>
        <div
          id="text-container"
          style={textmodal ? { display: "block" } : { display: "none" }}
        ></div>
        <div id="backdrop" ref={backdropRef} onClick={reset}></div>
      </div>
    </div>
  );
}

export default App;

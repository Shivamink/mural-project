import { useState, useEffect, createRef, useRef } from "react";
import Carousel from "./Carousel.jsx";
import Navigation from "./Navigation.jsx";
import base64 from "base-64";
import "./Mural.css";

//#region <Asset Imports>
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
import TMTDrone from "./Assets/Drone.webm";
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
import Damwater from "./Assets/Dam water.webm";
import Boat from "./Assets/Boat.webm";
import fire from "./Assets/fire2.webm";
//#endregion

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

const USERNAME = "kpmg_mural";
const PASSWORD = "password";
let itemTop = null;
let itemLeft = null;
let group = false;

function App() {
  const [activeGroup, setActiveGroup] = useState({ prev: null, current: null });
  const [activeHotspot, setActiveHotspot] = useState({
    prev: null,
    current: null,
  });
  const [content, setContent] = useState({});
  //Show hide content state
  const [modalbtn, setModalbtn] = useState(false);
  const [showlist, setShowlist] = useState(false); //shows list of sector and services
  const [showsub, Setshowsub] = useState(false); //shows sub part of sector or service
  const [infoModal, setInfoModal] = useState(null);
  const [animation, Setanimation] = useState(false);

  /**
   * @type{React.RefObject<HTMLDivElement>}
   */
  const backdropRef = createRef(null);
  let buttons = createRef(null);

  useEffect(() => {
    const fetchData = async () => {
      let jwt = localStorage.getItem("mural_jwt");
      const exp = jwt
        ? parseInt(JSON.parse(base64.decode(jwt.split(".")[1])).exp)
        : 0;

      // console.log({ jwt, exp });

      if (!(parseInt((Date.now() / 1000).toFixed(0)) < exp)) {
        const fd = new FormData();
        fd.append("user", USERNAME);
        fd.append("pass", PASSWORD);

        const authRes = await fetch(
          "https://experientialetc.com/KPMG-test/jwt/jwtAuthorize.php",
          {
            method: "POST",
            body: fd,
          }
        );
        jwt = (await authRes.json()).key;
        localStorage.setItem("mural_jwt", jwt);
      }

      const res = await fetch(
        "https://experientialetc.com/KPMG-test/fetchMuralHotspotApi.php",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + jwt,
          },
        }
      );
      const json = await res.json();
      /**
       * @type {{
       * content_type: string,
       * content_url: string,
       * hotspot_label: string
       * }[]}
       */
      const muralHotspot = json.mural_hotspot;
      let formattedData = {};
      muralHotspot.forEach((hotspot) => {
        if (!formattedData[hotspot.hotspot_label]) {
          formattedData[hotspot.hotspot_label] = {
            video: [],
            image: [],
            text: [],
            pdf: [],
          };
        }
        formattedData[hotspot.hotspot_label][hotspot.content_type].push(
          hotspot.content_url
        );
      });
      console.log(formattedData);
      setContent(formattedData);
    };

    fetchData();
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
    Setanimation(!animation);
    console.log("Clicked on Group: ", event.target.id);
    if (
      event.target.id.indexOf("sector") > -1 ||
      event.target.id.indexOf("service") > -1
    ) {
      group = true;
      console.log(group);
    }
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

    if (group) {
      setShowlist(false);
      Setshowsub(true);
    } else {
      setShowlist(true);
    }

    let itemval = document.getElementById(event.target.id);
    let itemin = itemval.getBoundingClientRect();
    itemTop = itemin.top;
    itemLeft = itemin.left;
    console.log(itemTop);
    console.log(itemin.top, itemin.left);
    let button = buttons.current;

    button.style.top = `${itemin.top.toFixed()}px`;
    button.style.left = `${itemin.left + 790}px`;

    let Sectorlist = document.getElementById("Sectorlist");
    Sectorlist.style.top = `${itemin.top.toFixed()}px`;
    Sectorlist.style.left = `${itemin.left.toFixed() - 300}px`;

    let Servicelist = document.getElementById("Servicelist");
    Servicelist.style.top = `${itemin.top.toFixed()}px`;
    Servicelist.style.left = `${itemin.left + 150}px`;

    let Subpart = document.getElementById("subpart");
    Subpart.style.top = `${itemin.top.toFixed()}px`;
    Subpart.style.left = `${itemin.left + 470}px`;

    if (itemin.left == 0 || itemin.top == 259.1964416503906) {
      button.style.top = `${500}px`;
      button.style.left = `${1500}px`;
      Sectorlist.style.top = `${500}px`;
      Sectorlist.style.left = `${500}px`;
      Servicelist.style.top = `${500}px`;
      Servicelist.style.left = `${900}px`;
      Subpart.style.top = `${500}px`;
      Subpart.style.left = `${1200}px`;
    }

    if (group) {
      Subpart.style.left = `${itemin.left + 150}px`;
      button.style.left = `${itemin.left + 450}px`;
    }
  }

  function showsubservice() {
    Setshowsub(true);
  }

  function showmainbtn() {
    setModalbtn(true);
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

    setModalbtn(false);
    setShowlist(false);
    Setshowsub(false);
    group = false;
  }

  const backdropClickHandler = () => {
    setInfoModal(null);
    console.log("Backdrop clicked");
  };

  return (
    <div className="App">
      <div id="Parent">
        <img className="bg-image" src={Ground} />
        {/* <div className={isActive ? "backdrop" : ""}></div>
        <div className={isActive2 ? "backdrop2" : ""}></div> */}
        <img className="hotspot airport-image" id="Airport" src={Airport} />
        <img className="hotspot building-image" id="Building" src={Building} />
        <img
          className="hotspot building2-image"
          id="Building2"
          src={Building2}
        />
        <img
          className="hotspot building3-image"
          id="Building3"
          src={Building3}
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
          // onClick={individualitem}
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
        <div>
          <img
            className="hotspot IREdock-image"
            id="IREdock"
            src={IREdock}
            onClick={individualitem}
          />
          <video className="boat" src={Boat} autoPlay loop muted />
        </div>

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
        <video className="damwater" src={Damwater} autoPlay loop muted />
        <video className="fire1" src={fire} autoPlay loop muted />
        <video className="fire2" src={fire} autoPlay loop muted />
        <img
          className="hotspot IMAbuilding-image"
          id="IMAbuilding"
          src={IMAbuilding}
          onClick={individualitem}
        />
        <video
          className="hotspot TMTDrone-image"
          id="TMTDrone"
          src={TMTDrone}
          onClick={individualitem}
          autoPlay
          loop
          muted
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
        <img className="hotspot ESGtrees1" id="ESGtrees1" src={ESGtrees1} />
        <img className="hotspot ESGTree2" id="ESGTree2" src={ESGTree2} />
        <img
          className="hotspot ESGtree3"
          id="ESGtree3"
          src={ESGtree3}
          // onClick={individualitem}
        />

        <div id="primary">
          <button className="primary-btn" onClick={enablegroup}>
            <img
              className="primary-btnimage7"
              id="sector7"
              src={TechnologyMediatelecom}
            />
          </button>
          <button className="primary-btn" onClick={enablegroup}>
            <img
              className="primary-btnimage2"
              id="sector2"
              src={EnergyNatural}
            />
          </button>
          <button className="primary-btn" onClick={enablegroup}>
            <img
              className="primary-btnimage5"
              id="sector5"
              src={InfrastructureRealEstate}
            />
          </button>
          <button className="primary-btn" onClick={enablegroup}>
            <img
              className="primary-btnimage1"
              id="sector1"
              src={Consumermarkets}
            />
          </button>
          <button className="primary-btn" onClick={enablegroup}>
            <img
              className="primary-btnimage3"
              id="sector3"
              src={FinancialServices}
            />
          </button>
          <button className="primary-btn" onClick={enablegroup}>
            <img
              className="primary-btnimage4"
              id="sector4"
              src={GovernmentPublic}
            />
          </button>
          <button className="primary-btn" onClick={enablegroup}>
            <img
              className="primary-btnimage6"
              id="sector6"
              src={IndustrialManufacturingAuto}
            />
          </button>
        </div>

        <div id="service">
          <button className="service-btn" onClick={enablegroup}>
            <img src={Services} className="service-btnimage" id="service1" />
          </button>
          <div id={animation ? "fixserviceanimation" : "serviceanimation"}>
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
        </div>

        <div
          className="modalbtns"
          ref={buttons}
          style={modalbtn ? { display: "flex" } : { display: "none" }}
        >
          <button
            className="modalbtn"
            onClick={() =>
              setInfoModal({
                type: "text",
                urls: content[activeHotspot.current]["text"],
              })
            }
            hidden={
              activeHotspot.current &&
              content[activeHotspot.current]["text"].length === 0
            }
          >
            Text
          </button>
          <button
            className="modalbtn"
            onClick={() =>
              setInfoModal({
                type: "video",
                urls: content[activeHotspot.current]["video"],
              })
            }
            hidden={
              activeHotspot.current &&
              content[activeHotspot.current]["video"].length === 0
            }
          >
            Video
          </button>
          <button
            className="modalbtn"
            onClick={() =>
              setInfoModal({
                type: "image",
                urls: content[activeHotspot.current]["image"],
              })
            }
            hidden={
              activeHotspot.current &&
              content[activeHotspot.current]["image"].length === 0
            }
          >
            Image
          </button>
          <button
            className="modalbtn"
            onClick={() =>
              setInfoModal({
                type: "pdf",
                urls: content[activeHotspot.current]["pdf"],
              })
            }
            hidden={
              activeHotspot.current &&
              content[activeHotspot.current]["pdf"].length === 0
            }
          >
            PDF
          </button>
        </div>

        <div style={showlist ? { display: "block" } : { display: "none" }}>
          <div id="Sectorlist">
            <button className="Highlightbtn" onClick={showsubservice}>
              Business Consulting
            </button>
            <button className="Highlightbtn" onClick={showsubservice}>
              Digital Trust-Cyber
            </button>
            <button className="Highlightbtn" onClick={showsubservice}>
              Tax
            </button>
            <button className="Highlightbtn" onClick={showsubservice}>
              Managed Service
            </button>
          </div>

          <div id="Servicelist">
            <button className="Highlightbtn" onClick={showsubservice}>
              TMT
            </button>
            <button className="Highlightbtn" onClick={showsubservice}>
              Consumer
            </button>
            <button className="Highlightbtn" onClick={showsubservice}>
              Energy & Natural Resources
            </button>
          </div>
        </div>

        <div
          id="subpart"
          style={showsub ? { display: "flex" } : { display: "none" }}
        >
          <button className="Highlightsubpart" onClick={showmainbtn}>
            5g Capability
          </button>
          <button className="Highlightsubpart" onClick={showmainbtn}>
            Passive infra Capability
          </button>
          <button className="Highlightsubpart" onClick={showmainbtn}>
            Drone-EAM
          </button>
        </div>

        {infoModal && (
          <Carousel
            onBackDropClick={backdropClickHandler}
            type={infoModal.type}
            urls={infoModal.urls}
            itemTop={itemTop}
            itemLeft={itemLeft}
          />
        )}
        <Navigation />
        <div id="backdrop" ref={backdropRef} onClick={reset}></div>
      </div>
    </div>
  );
}

export default App;

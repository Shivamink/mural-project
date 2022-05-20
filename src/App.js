import { useState } from "react";

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

function App() {
  const [isActive, setActive] = useState(false);
  const [child, Setchild] = useState(false);

  const [prevHotspotId, setPrevHotspotId] = useState(null);
  const [currentHotspotId, setCurrentHotspotId] = useState(null);

  // const [airport, setairport] = useState(false);
  // const [tmtStadium, setmtStadium] = useState(false);
  // const [cmhospital, setcmhospital] = useState(false);
  // const [edTech, setedTech] = useState(false);
  // const [fsbank, setfsbank] = useState(false);
  // const [iredock, setiredock] = useState(false);
  // const [irebuilding, setirebuilding] = useState(false);

  function handleblur(event) {
    // setActive(!isActive);
    setActive(true);
    // console.log(event.target.id);
  }

  // function cm(event) {
  //   console.log(event.target);
  //   setcmhospital(true);
  //   setedTech(true);
  //   setfsbank(false);
  // }

  // function fs() {
  //   setcmhospital(false);
  //   setedTech(false);
  //   setfsbank(true);
  // }

  // function re() {
  //   setcmhospital(false);
  //   setedTech(false);
  //   setfsbank(false);
  //   setiredock(true);
  //   setirebuilding(true);
  // }

  function showbutton() {
    Setchild(!child);
  }

  function tmtdisplay() {
    console.log("hello");
  }

  let completemap = {
    sector1: ["CMhospital", "EDTech"],
    sector2: [""],
    sector3: ["FSbank"],
    sector4: [""],
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
    service4: [""],
    service5: [""],
    service6: [""],
    service7: [""],
    service8: ["ESGelectric"],
    service9: [""],
  };

  function enablegroup(event) {
    setPrevHotspotId(currentHotspotId);
    setCurrentHotspotId(event.target.id);
    console.log({ currentHotspotId, prevHotspotId });

    /**
     * @type {string[]}
     */
    const currentHotspot = completemap[currentHotspotId];
    if (currentHotspot) {
      currentHotspot.forEach((h) => {
        document.getElementById(h).style.zIndex = 1;
      });
    }

    /**
     * @type {string[]}
     */
    const prevHotspot = completemap[prevHotspotId];
    if (prevHotspot) {
      prevHotspot.forEach((h) => {
        document.getElementById(h).style.zIndex = 0;
      });
    }
  }

  // let roughArray = [];
  // const [stateKey, setStateKey] = useState("sector1");
  // for (let key in completemap) {
  //   if (key === stateKey) {
  //     roughArray.push(completemap[key]);
  //     console.log(completemap[key]);
  //   }
  // }

  // const getSectorName = () => {
  //   return roughArray;
  // };
  // console.log(getSectorName());
  return (
    <div className="App">
      <div id="Parent" onClick={handleblur}>
        <img className="bg-image" src={Ground} />
        <div className={isActive ? "backdrop" : ""}></div>
        <div id="Airport">
          <img className="airport-image" src={Airport} />
        </div>
        <div id="Building">
          <img className="building-image" src={Building} />
        </div>
        <div id="Building2">
          <img className="building2-image" src={Building2} />
        </div>
        <div id="Building3">
          <img className="building3-image" src={Building3} />
        </div>
        <div id="IREbuilding">
          <img className="IREbuilding-image" src={IREbuildings} />
        </div>
        <div id="TMTbuilding" onClick={showbutton}>
          <img className="TMTbuilding-image" src={TMTbuilding} />
        </div>
        <div id="CMhospital">
          <img className="CMhospital-image" src={CMhospital} />
        </div>
        <div id="CMmall">
          <img className="CMmall-image" src={CMmall} />
        </div>
        <div id="EDTech">
          <img className="EDTech-image" src={EDTech} />
        </div>
        <div id="ESGelectric">
          <img className="ESGelectric-image" src={ESGelectric} />
        </div>
        <div id="FSbank">
          <img className="FSbank-image" src={FSbank} />
        </div>
        <div id="SLBCcoal">
          <img className="SLBCcoal-image" src={SLBCcoal} />
        </div>
        <div id="IREdock">
          <img className="IREdock-image" src={IREdock} />
        </div>
        <div id="SLBCbuilding">
          <img className="SLBCbuilding-image" src={SLBCbuilding} />
        </div>
        <div id="SLRAgovernment">
          <img className="SLRAgovernment-image" src={SLRAgovernment} />
        </div>
        <div id="SLRAhole">
          <img className="SLRAhole-image" src={SLRAhole} />
        </div>
        <div id="IMAbuilding">
          <img className="IMAbuilding-image" src={IMAbuilding} />
        </div>
        <div id="TMTDrone">
          <img className="TMTDrone-image" src={TMTDrone} />
        </div>
        <div id="TMTMovieposter">
          <img className="TMTMovieposter-image" src={TMTMovieposter} />
        </div>
        <div id="TMTMovieposter2">
          <img className="TMTMovieposter-image" src={TMTMovieposter} />
        </div>
        <div id="TMTStadium">
          <img className="TMTStadium-image" src={TMTStadium} />
        </div>
        <div id="Mobileqr">
          <img className="Mobileqr-image" src={Mobileqr} />
        </div>
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
          className="childbtns"
          style={child ? { display: "flex" } : { display: "none" }}
        >
          <button className="childbtn">Image</button>
          <button className="childbtn">Video</button>
          <button className="childbtn">PDF</button>
        </div>
      </div>
    </div>
  );
}

export default App;

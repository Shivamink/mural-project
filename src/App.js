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

function App() {
  return (
    <div className="App">
      <div id="Parent">
        <img className="bg-image" src={Ground} />
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
        <div id="TMTbuilding">
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
      </div>
    </div>
  );
}

export default App;

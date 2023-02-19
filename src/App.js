import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import Map from './components/map.jsx'


function App() {

  const mapStyling = {
    // ----- centers horizontally only (centers children vertically)
    display: "flex",
    justifyContent: "center",
    // alignItems: "bottom",
    // ----- center to bottom maybe?
    // position: "absolute",
    // bottom: 0,
    // ----- centers horizontally and vertically
    // margin: 0,
    // position: "absolute",
    // top: "50%",
    // left: "50%",
    // "-ms-transform": "translate(-50%, -50%)",
    // transform: "translate(-50%, -50%)",
  }

  return (
    <>
    <div>
      <img style={{ width: 250 }} src={"../../logo.png"} alt = {"Postory Logo"}/>
      </div>
    <div className="map-container" style={mapStyling}>
      {/* <div style={{"display": "inline-block", "align-self": "flex-end"}}> */}
        <Map>
          
        </Map>
      {/* </div> */}
    </div>
    </>
  );
}

export default App;

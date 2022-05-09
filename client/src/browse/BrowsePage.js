import React, {useState, useEffect} from 'react';

import Map from "./Map.js";
import Maps from "./MapsHooks.js";

const BrowsePage = (props) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [toggle, setToggle] = useState(true);


  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
        console.log("Latitude is :", position.coords.latitude);
        setLat(position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        setLng(position.coords.longitude);
      });
    }
  }, []);


  const toggleMap = () => {
    setToggle(!toggle);
  }

  return (
    <div>
      <div>
        <p>This is the filter bar</p>
        <button onClick={toggleMap}>Toggle map</button>
      </div>
      {toggle && <Map lat={lat} lng={lng}/>}
      {!toggle && <Maps lat={lat} lng={lng}/>}

    </div>
  );
};

export default BrowsePage;
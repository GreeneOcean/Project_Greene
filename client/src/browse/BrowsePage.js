import React, { useState, useEffect } from "react";

import Map from "./Map.js";
import Maps from "./Maps.js";
import ItemList from "./ItemList.js";
// import GET from "/Users/markalperin/Desktop/Project_Greene/server/DB/get.js";

const BrowsePage = (props) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [itemData, setItemData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [position, setPosition] = useState({});
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
        console.log("Latitude is :", position.coords.latitude);
        setLat(position.coords.latitude);
        // setPosition(position.lat = position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        setLng(position.coords.longitude);
      });
    }
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/local")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        const temp = [];
        for (let i = 0; i < res.length; i += 100) {
          temp.push(res[i]);
        }
        setItemData(temp);
        setDisplayData(temp)
      });
  }, []);

  const toggleMap = () => {
    setToggle(!toggle);
  };

  return (
    <div>
      <div>
        <p>This is the filter bar</p>
        <button onClick={toggleMap}>Toggle map</button>
      </div>
      <div>
      {toggle && <Map data={itemData} lat={lat} lng={lng} />}
      {!toggle && <Maps data={itemData} lat={lat} lng={lng} />}
      <ItemList items={displayData}/>
      </div>

    </div>
  );
};

export default BrowsePage;

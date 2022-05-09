import React, {useState, useContext} from 'react';

// import icon from "./assets/icons8-map-pin-66.png";
// const icon = require('./assets/icons8-map-pin-66.png');
import {RiMapPin2Fill} from 'react-icons/ri'
const MapMarker = (props) => {

  const style = props.$hover ? {color: "red", cursor: "pointer", height: "50px", width: "50px"} : {color: "blue"}

  const clickHandler = () => {
    console.log('click')
  };

  return (
    <div>
    <RiMapPin2Fill  onClick={clickHandler} style={style} />
    </div>
  );
};

export default MapMarker;
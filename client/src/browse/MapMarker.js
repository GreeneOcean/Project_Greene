import React, { useState, useContext } from "react";

import { RiMapPin2Fill} from "react-icons/ri";
// import {FaMapMarkerAlt } from "react-icons/fa";
const MapMarker = (props) => {
  const style = props.$hover
    ? { color: "red", cursor: "pointer", height: "25px", width: "25px" }
    : { color: "blue", height: "25px", width: "25px" };

  const clickHandler = () => {
    console.log("click: ", props.data.description);
  };

  const hoverHandler= () => {
    console.log('hoverhover')
  }
  return (
    <div>
      <RiMapPin2Fill onClick={clickHandler} onMouseover={hoverHandler} style={style} />
    </div>
  );
};

export default MapMarker;

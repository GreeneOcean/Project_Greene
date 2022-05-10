import React, { useState, useContext } from "react";

import { RiMapPin2Fill } from "react-icons/ri";
// import {FaMapMarkerAlt } from "react-icons/fa";
const MapMarker = (props) => {
  const style =
    props.selectedItem === props.item.id
      ? { color: "red", height: "25px", width: "25px" }
      : props.$hover
      ? { color: "cyan", cursor: "pointer", height: "25px", width: "25px" }
      : { color: "blue", height: "25px", width: "25px" };

  // {props.selectedItem === props.item.id ? "red" : "blue"}
  const clickHandler = () => {
    console.log(props.item.id);
    props.setSelectedItem(props.item.id);
  };

  const hoverHandler = () => {
    console.log("hoverhover");
  };
  return (
    <div>
      <RiMapPin2Fill
        onClick={clickHandler}
        onMouseover={hoverHandler}
        style={style}
      />
      {props.$hover && <p>{props.item.id}</p>}
    </div>
  );
};

export default MapMarker;

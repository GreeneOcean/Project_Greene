import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";

import MapMarker from "./MapMarker.js";
// require("dotenv").config();

const Map = (props) => {

  const mapOptions = {
    disableDefaultUI: true,
    mapTypeControl: true,
    streetViewControl: false,
    scollWheel: true,
    // zoomControl: true, // Todo: zoom control buggy
    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "on" }],
      },
    ],
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "600px", width: "750px" }}>
      <GoogleMapReact
        // bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY }}
        bootstrapURLKeys={{ key: "AIzaSyC9uXEew2Nzx-ZbP4HMYBHvifaYh2sCsVM" }}
        defaultCenter={{ lat: 42.55, lng: -99.86 }}
        center={{
          lat: props.lat,
          lng: props.lng,
        }}
        defaultZoom={12}
        zoom={props.lat ? 12 : 4}
        yesIWantToUseGoogleMapApiInternals
        options={mapOptions}
        hoverDistance={25}
      >
        {props.data.map((item, idx) => {
          return (
            <MapMarker
              key={idx}
              item={item}
              lat={item.lat}
              lng={item.lng}
              setSelectedItem={props.setSelectedItem}
              selectedItem={props.selectedItem}
            />
          );
        })}
      </GoogleMapReact>
    </div>
  );
};

export default Map;

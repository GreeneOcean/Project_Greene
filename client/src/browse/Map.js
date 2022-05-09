import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";

import MapMarker from "./MapMarker.js";
// import GET from "../../../server/DB/get.js";
// require("dotenv").config();

const Map = (props) => {
  const handleApiLoaded = async (map, maps) => {
    console.log(map, maps);
  };

  useEffect(() => {

  }, [props.lat])

  const mapOptions = {
    disableDefaultUI: true,
    mapTypeControl: true,
    streetViewControl: false,
    scollWheel: true,
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
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        options={mapOptions}
        hoverDistance={25}
      >
        <MapMarker
          lat={props.lat}
          lng={props.lng}
          text="Mark & Katie's House"
        />
        <MapMarker
          lat={props.lat + 0.35}
          lng={props.lng + 0.25}
          text="NORTHEAST"
        />
        <MapMarker
          lat={props.lat + 0.35}
          lng={props.lng - 0.08}
          text="NORTHWEST"
        />
        <MapMarker
          lat={props.lat - 0.05}
          lng={props.lng - 0.08}
          text="SOUTHWEST"
        />
        <MapMarker
          lat={props.lat - 0.05}
          lng={props.lng + 0.25}
          text="SOUTHEAST"
        />
      </GoogleMapReact>
    </div>
  );
};

export default Map;

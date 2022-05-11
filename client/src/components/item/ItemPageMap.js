import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import styled from "styled-components";
import { RiMapPin2Fill } from "react-icons/ri";

import config from "../../../config.js";

const Map = ({ lat, lng }) => {
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
    // Important! Always set the map container height explicitly
    <MapContainer>
      <GoogleMapReact
        bootstrapURLKeys={{ key: config.GOOGLE_MAPS_API_KEY }}
        defaultCenter={{ lat: 42.55, lng: -99.86 }}
        center={{
          lat: lat,
          lng: lng,
        }}
        defaultZoom={12}
        zoom={lat ? 12 : 4}
        yesIWantToUseGoogleMapApiInternals
        options={mapOptions}
        hoverDistance={25}
      >
        {/* <RiMapPin2Fill lat={lat} lng={lng} /> */}
      </GoogleMapReact>
    </MapContainer>
  );
};

export default Map;

const MapContainer = styled.div`
  height: 35vh;
  width: 60vh;
`;

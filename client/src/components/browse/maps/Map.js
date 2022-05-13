import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";

import config from "../../../../config.js";
import MapMarker from "./MapMarker.js";

const Map = ({ lat, lng, data, selectedItem, setSelectedItem, findNearest }) => {
  const mapOptions = {
    disableDefaultUI: true,
    mapTypeControl: true,
    streetViewControl: false,
    scollWheel: true,
    zoomControl: true,
    hoverDistance: 30,
    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
    ],
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ width: '50%'}}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: config.GOOGLE_MAPS_API_KEY }}
        defaultCenter={{ lat: 42.55, lng: -99.86 }}
        center={
          findNearest
            ? { lat: 30.2672, lng: -97.7431 }
            : {
                lat: lat,
                lng: lng,
              }
        }
        defaultZoom={4}
        zoom={lat ? 12 : 4}
        yesIWantToUseGoogleMapApiInternals
        options={mapOptions}
        hoverDistance={25}
      >
        {data.map((item, idx) => {
          return (
            <MapMarker
              key={idx}
              item={item}
              lat={item.lat}
              lng={item.lng}
              setSelectedItem={setSelectedItem}
              selectedItem={selectedItem}
            />
          );
        })}
      </GoogleMapReact>
    </div>
  );
};

export default Map;

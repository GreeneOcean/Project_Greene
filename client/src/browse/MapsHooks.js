import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const mapStyles = {
  width: "750px",
  height: "600px",
};

const dummy = [
  {name: "NE", position: {lat: 30.5491288, lng: -97.5811418}},
{name: "NW", position: {lat: 30.5491288, lng: -97.9111418}},
{name: "SW", position: {lat: 30.1491288, lng: -97.9111418}},
{name: "SE", position: {lat: 30.1491288, lng: -97.5811418}},
]



class GoogleMaps extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
    };
  }

  render() {
    return (
      <div style={{ height: "600px", width: "750px" }}>
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{
            lat: 30.1991912,
            lng: -97.8311001,
          }}
        >
          <Marker onClick={this.onMarkerClick} name={"Mark & Katie's House"} />
          {dummy.map((pin, idx) => {
            return <Marker title={pin.name} onClick={markerClickHandler} key={idx} position={pin.position}/>
          })}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC9uXEew2Nzx-ZbP4HMYBHvifaYh2sCsVM'
})(GoogleMaps);
import React, { Component, createRef } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: 51.505,
        lng: -0.09
      },
      marker: {
        lat: 51.505,
        lng: -0.09
      },
      zoom: 13,
      draggable: true
    };
    this.refmarker = createRef();
  }

  updatePosition = () => {
    const marker = this.refmarker.current;
    if (marker != null) {
      this.setState({
        marker: marker.leafletElement.getLatLng()
      });
    }
  };

  render() {
    const position = [this.state.center.lat, this.state.center.lng];
    const markerPosition = [this.state.marker.lat, this.state.marker.lng];

    return (
      <Map className="map" center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          draggable={this.state.draggable}
          onDragend={this.updatePosition}
          position={markerPosition}
          ref={this.refmarker}
        >
          <Popup minWidth={90}>
            {`${markerPosition[0]}, ${markerPosition[1]}`}
          </Popup>
        </Marker>
      </Map>
    );
  }
}

export default App;

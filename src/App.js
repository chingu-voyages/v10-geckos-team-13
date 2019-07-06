import React, { Component } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import "./App.css";
import RestaurantData from "./RestaurantData";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: RestaurantData
    };
  }

  render() {
    const position = [51.505, -0.09];

    return (
      <Map className="map" center={position} zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {this.state.restaurants.map(item => (
          <Marker key={item.id} position={[item.latitude, item.longitude]}>
            <Popup>{item.name}</Popup>
          </Marker>
        ))}
      </Map>
    );
  }
}

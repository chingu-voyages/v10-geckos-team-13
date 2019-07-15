import React, { Component } from "react";
import "./MapContainer.css";

import L from "leaflet";
import { Map, Marker, Popup, TileLayer, ZoomControl } from "react-leaflet";
import axios from "axios";
import restaurant_map_marker from "../map-marker-light.png";
import base_map_marker from "../map-marker-dark.png";

const restaurantMarker = new L.Icon({
  iconUrl: restaurant_map_marker,
  iconAnchor: [24, 48],
  popupAnchor: [0, -48],
  iconSize: [48, 48]
});

const baseMarker = new L.Icon({
  iconUrl: base_map_marker,
  iconAnchor: [24, 48],
  popupAnchor: [0, -48],
  iconSize: [48, 48]
});

class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: {
        lat: 5.4342245,
        lng: 100.3919285
      },
      baseMarkerLocation: {
        lat: 0,
        lng: 100.3919285
      },
      restaurants: null,
      hasUsersLocation: false,
      zoom: 2
    };
    this.previousBounds = null;
  }

  // If geolocation service is available, ask for user's permission to get current location, and set map's location
  // If permission denied, get approximate location through ip address using https://ipapi.co/json api
  componentDidMount() {
    const API_URL =
      window.location.hostname === "localhost"
        ? "http://localhost:8080/api/restaurants"
        : "production-url";

    axios.get(API_URL).then(response => {
      this.setState({
        restaurants: response.data.data
      });
    });

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const [lat, lng] = [
            position.coords.latitude,
            position.coords.longitude
          ];
          this.setState({
            location: {
              lat: lat,
              lng: lng
            },
            baseMarkerLocation: {
              lat: lat,
              lng: lng
            },
            hasUsersLocation: true,
            zoom: 18
          });
        },
        () => {
          fetch("https://ipapi.co/json")
            .then(res => res.json())
            .then(location => {
              const [lat, lng] = [location.latitude, location.longitude];
              this.setState({
                location: {
                  lat: lat,
                  lng: lng
                },
                baseMarkerLocation: {
                  lat: lat,
                  lng: lng
                },
                hasUsersLocation: true,
                zoom: 8
              });
            });
        }
      );
    }
  }

  handleMarkerDragend = () => {
    const marker = this.refs.baseMarker;
    if (marker) {
      this.setState({
        baseMarkerLocation: marker.leafletElement.getLatLng()
      });
    }
  };

  handleMarkerClicked = restaurant => {
    this.props.handleSelected(restaurant);
  };

  render() {
    const position = [this.state.location.lat, this.state.location.lng];
    const baseMarkerPosition = [
      this.state.baseMarkerLocation.lat,
      this.state.baseMarkerLocation.lng
    ];

    return (
      <Map
        ref="map"
        className="MapContainer"
        center={position}
        zoom={this.state.zoom}
        zoomControl={false}
      >
        <ZoomControl position="bottomleft" />
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {this.state.hasUsersLocation ? (
          <Marker
            ref="baseMarker"
            draggable="true"
            onDragend={this.handleMarkerDragend}
            position={baseMarkerPosition}
            icon={baseMarker}
          >
            <Popup>You are here</Popup>
          </Marker>
        ) : (
          ""
        )}
        {this.state.restaurants &&
          this.state.restaurants.map(restaurant => {
            const { lat, lng } = restaurant.restaurant_coords;
            return (
              <Marker
                key={restaurant.restaurant_id}
                draggable="true"
                position={[lat, lng]}
                icon={restaurantMarker}
                onClick={() => this.handleMarkerClicked(restaurant)}
              >
                <Popup>
                  <b>{restaurant.restaurant_name}</b>
                </Popup>
              </Marker>
            );
          })}
      </Map>
    );
  }
}

export default MapContainer;

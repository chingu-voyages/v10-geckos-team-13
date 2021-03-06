import React, { Component } from "react";
import "./MapContainer.css";

import L from "leaflet";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

import Restaurants from "../shared/restaurants";

// asset from https://www.mappity.org/ color: #ffbb32
const queryMarker = new L.Icon({
  iconUrl: "/assets/images/query-icon.png",
  iconRetinaUrl: "/assets/images/query-icon.png",
  iconAnchor: [25, 50],
  popupAnchor: [0, -48],
  iconSize: [50, 50],
  className: "MapContainer__query-marker"
});

// asset from https://www.mappity.org/ color: #e4007c
const restaurantMarker = new L.Icon({
  iconUrl: "/assets/images/restaurant-icon.png",
  iconRetinaUrl: "/assets/images/restaurant-icon.png",
  iconAnchor: [25, 50],
  popupAnchor: [0, -48],
  iconSize: [50, 50],
  className: "MapContainer__restaurant-marker"
});

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        lat: 5.4342245,
        lng: 100.3919285
      },
      queryMarkerLocation: {
        lat: 5.4342245,
        lng: 100.3919285
      },
      restaurants: Restaurants.getRestaurants(),
      hasUsersLocation: false,
      zoom: 2
    };
    this.previousBounds = null;
  }

  // If geolocation service is available, ask for user's permission to get current location, and set map's location
  // If permission denied, get approximate location through ip address using https://ipapi.co/json api
  componentDidMount() {
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
            queryMarkerLocation: {
              lat: lat,
              lng: lng
            },
            hasUsersLocation: true,
            zoom: 18
          });
        },
        err => {
          fetch("https://ipapi.co/json")
            .then(res => res.json())
            .then(location => {
              const [lat, lng] = [location.latitude, location.longitude];
              this.setState({
                location: {
                  lat: lat,
                  lng: lng
                },
                queryMarkerLocation: {
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

  handleMoveend = () => {
    const bounds = this.refs.map.leafletElement.getBounds();
    if (!bounds.equals(this.previousBounds)) {
      this.previousBounds = bounds;
      this.setState({
        restaurants: Restaurants.getRestaurants(bounds)
      });
    }
  };

  handleQueryMarkerDragend = () => {
    const marker = this.refs.queryMarker;
    const coordinates = marker.leafletElement.getLatLng();
    if (marker) {
      this.setState({
        queryMarkerLocation: coordinates
      });
      this.props.handleQueryCoords(coordinates);
    }
  };

  handleMarkerClicked = restaurant => {
    this.props.handleSelected(restaurant);
  };

  handleMarkerMouseOver = event => {
    event.target.openPopup();
  };

  handleMarkerMouseOut = event => {
    event.target.closePopup();
  };

  render() {
    const position = [this.state.location.lat, this.state.location.lng];
    const queryMarkerPosition = [
      this.state.queryMarkerLocation.lat,
      this.state.queryMarkerLocation.lng
    ];

    return (
      <Map
        ref="map"
        className="MapContainer"
        center={position}
        zoom={this.state.zoom}
        onMoveend={this.handleMoveend}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {this.state.hasUsersLocation && this.props.showQueryMarker ? (
          <Marker
            ref="queryMarker"
            draggable="true"
            onDragend={this.handleQueryMarkerDragend}
            position={queryMarkerPosition}
            icon={queryMarker}
          >
            <Popup>
              Drag to pinpoint <br /> new restaurant location.
            </Popup>
          </Marker>
        ) : (
          ""
        )}
        {this.state.restaurants.map(restaurant => {
          const { lat, lng } = restaurant.coords;
          return (
            <Marker
              key={restaurant.id}
              draggable="true"
              position={[lat, lng]}
              icon={restaurantMarker}
              onClick={this.handleMarkerClicked.bind(this, restaurant)}
              onMouseOver={this.handleMarkerMouseOver}
              onMouseOut={this.handleMarkerMouseOut}
            >
              <Popup>
                <b>{restaurant.name}</b>
              </Popup>
            </Marker>
          );
        })}
      </Map>
    );
  }
}

export default MapContainer;

// attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'

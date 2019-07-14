import React, { Component } from 'react';
import './App.css';

import MapContainer from './MapContainer/MapContainer';
import Panel from './Panel/Panel';
import Navbar from './Navbar/Navbar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRestaurant: null,
      editMode: false,
      showQueryMarker: false,
      queriedCoords: {
        lat: 0,
        lng: 0
      }
    }
  }

  handleSelected = (restaurant, editMode=false) => {
    this.setState({
      selectedRestaurant: restaurant,
      editMode: editMode
    });
  }

  handleToggleQueryMarker = (bool) => {
    this.setState({
      showQueryMarker: bool
    });
  }

  handleQueryCoords = (coords) => {
    this.setState({
      queriedCoords: coords
    });
  }

  render () {
    return (
      <div className="App">
        <Navbar />
        <div className="App__body">
          <MapContainer 
            showQueryMarker={this.state.showQueryMarker}
            handleSelected={this.handleSelected}
            handleQueryCoords={this.handleQueryCoords}
          />
          <Panel 
            editMode = {this.state.editMode}
            selectedRestaurant={this.state.selectedRestaurant} 
            queriedCoords={this.state.queriedCoords}
            handleSelected={this.handleSelected}
            handleToggleQueryMarker={this.handleToggleQueryMarker}
          />
        </div>
      </div>
    );
  }
}

export default App;

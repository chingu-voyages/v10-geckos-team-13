import React, { Component } from 'react';
import './App.css';

import Map from './Map/Map';
import Panel from './Panel/Panel';
import Navbar from './Navbar/Navbar';

class App extends Component {
  state = {
    selectedRestaurant: null
  }

  handleSelected(restaurant) {
    this.setState({
      selectedRestaurant: restaurant
    })
  }

  render () {
    return (
      <div className="App">
        <Navbar />
        <div className="App__body">
          <Map handleSelected={this.handleSelected.bind(this)}/>
          <Panel selectedRestaurant={this.state.selectedRestaurant}/>
        </div>
      </div>
    );
  }
}

export default App;

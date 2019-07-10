import React, { Component } from 'react';
import './App.css';

import Map from './Map/Map';
import Panel from './Panel/Panel';
import Navbar from './Navbar/Navbar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRestaurant: null
    }
    this.handleSelected = this.handleSelected.bind(this);
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
          <Map handleSelected={this.handleSelected}/>
          <Panel selectedRestaurant={this.state.selectedRestaurant} handleSelected={this.handleSelected}/>
        </div>
      </div>
    );
  }
}

export default App;

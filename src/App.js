import React, { Component } from 'react';
import './App.css';

import Map from './Map/Map';
import Panel from './Panel/Panel';
import Navbar from './Navbar/Navbar';

class App extends Component {
  render () {
    return (
      <div className="App">
        <Navbar />
        <div className="App__body">
          <Map />
          <Panel />
        </div>
      </div>
    );
  }
}

export default App;

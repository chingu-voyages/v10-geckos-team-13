import React, { Component } from 'react';
import './Navbar.css';
import SearchBar from './SearchBar/SearchBar';

export default class Navbar extends Component {
  render() {
    return (
      <div className="Navbar">
        <h1 className="Navbar__brand">Menu, Please</h1>
        <SearchBar />
      </div>
    );
  }
}

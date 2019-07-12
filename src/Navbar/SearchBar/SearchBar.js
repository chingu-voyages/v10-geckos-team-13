import React, { Component } from "react";
import "./SearchBar.css";

export default class SearchBar extends Component {
  render() {

    return (
      <div className="SearchBar">
        <form>
          <input
            type="text"
            placeholder="Search Restaurant"
          />
          <button type="button">
            <i className="fa fa-search" />
          </button>
        </form>
      </div>
    );
  }
}

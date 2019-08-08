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
            onChange={e => this.props.handleSearchInput(e)}
          />
          <button type="button">
            <i className="fa fa-search" />
          </button>
        </form>
      </div>
    );
  }
}

import React, { Component } from "react";
import "./Panel.css";

import RestaurantDescription from "./RestaurantDescription/RestaurantDescription";
import SearchResults from "./SearchResults/SearchResults";
import RestaurantForm from "./RestaurantForm/RestaurantForm";

class Panel extends Component {
  handleBack = () => {
    this.props.handleSelected(null, false, true, false);
  };

  handleSelected = (
    restaurant,
    editMode = false,
    searchMode = false,
    addMode = false
  ) => {
    this.props.handleSelected(restaurant, editMode, searchMode, addMode);
  };

  handleToggle = () => {
    const panel = this.refs.panel;
    panel.classList.toggle("Panel__toggle");
  };

  render() {
    const selectedRestaurant = this.props.selectedRestaurant;
    const searchResults = this.props.searchResults;
    return (
      <div className="Panel" ref="panel">
        <div className="Panel__button" onClick={this.handleToggle}>
          <i className="fas fa-caret-right fa-2x" />
        </div>
        <div className="Panel__container">
          {this.props.addMode && "Add Form"}
          {this.props.editMode && "Edit Form"}
          {this.props.searchMode && (
            <SearchResults
              restaurantsList={searchResults}
              handleSelected={this.handleSelected}
            />
          )}
          {selectedRestaurant &&
            !this.props.editMode &&
            !this.props.searchMode &&
            !this.props.addMode && (
              <RestaurantDescription
                restaurant={selectedRestaurant}
                handleBack={this.handleBack}
                handleSelected={this.handleSelected}
              />
            )}
          {/* {
            this.props.editMode ?
            <RestaurantForm restaurant = {selectedRestaurant}/>: (
              selectedRestaurant ? 
              <RestaurantDescription 
                restaurant = {selectedRestaurant} 
                handleBack = {this.handleBack}
                handleSelected = {this.handleSelected}
              />:
              <SearchResults 
                restaurantsList = {restaurants} 
                handleSelected = {this.handleSelected}
              />
            )
          } */}
        </div>
      </div>
    );
  }
}

export default Panel;

import React, { Component } from "react";
import "./Panel.css";

//import Restaurants from "../shared/restaurants";

import RestaurantDescription from "./RestaurantDescription/RestaurantDescription";
import SearchResults from "./SearchResults/SearchResults";
//import RestaurantForm from "./RestaurantForm/RestaurantForm";
import RestaurantAddForm from "./RestaurantAddForm/RestaurantAddForm";

class Panel extends Component {
  constructor(props) {
    super(props);
    this.handleSelected = this.handleSelected.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleBack(selectedRestaurant = null) {
    this.props.handleSelected(selectedRestaurant, false, true, false);
  }

  handleSelected(
    restaurant,
    editMode = false,
    searchMode = false,
    addMode = false
  ) {
    this.props.handleSelected(restaurant, editMode, searchMode, addMode);
  }

  handleToggle() {
    const panel = this.refs.panel;
    panel.classList.toggle("Panel__toggle");
  }

  render() {
    //const restaurants = Restaurants.getRestaurants();
    const selectedRestaurant = this.props.selectedRestaurant;
    const searchResults = this.props.searchResults;

    return (
      <div className="Panel" ref="panel">
        <div className="Panel__button" onClick={this.handleToggle}>
          <i className="fas fa-caret-right fa-2x" />
        </div>
        <div className="Panel__container">
          {this.props.addMode && (
            <RestaurantAddForm
              queriedCoords={this.props.queriedCoords}
              handleToggleQueryMarker={this.props.handleToggleQueryMarker}
              handleBack={this.handleBack}
              handleSelected={this.handleSelected}
            />
          )}
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
          {/* {this.props.editMode ? (
            <RestaurantForm
              restaurant={selectedRestaurant}
              queriedCoords={this.props.queriedCoords}
              handleToggleQueryMarker={this.props.handleToggleQueryMarker}
              handleBack={this.handleBack}
            />
          ) : selectedRestaurant ? (
            <RestaurantDescription
              restaurant={selectedRestaurant}
              handleBack={this.handleBack}
              handleSelected={this.handleSelected}
            />
          ) : (
            <SearchResults
              restaurantsList={restaurants}
              handleSelected={this.handleSelected}
            />
          )} */}
        </div>
      </div>
    );
  }
}

export default Panel;

import React, { Component } from "react";
import "./SearchResultsItem.css";

class SearchResultsItem extends Component {
  render() {
    const restaurant = this.props.restaurant;
    return (
      <div className="SearchResultsItem" onClick={this.props.handleClicked}>
        <div className="SearchResultsItem__container--1 img-overflow">
          <img
            className="SearchResultsItem__img"
            src={restaurant.restaurant_img}
            alt={"Photo of " + restaurant.restaurant_name}
          />
        </div>
        <div className="SearchResultsItem__container--2">
          <h3 className="text-overflow">{restaurant.restaurant_name}</h3>
          <p className="text-overflow">{restaurant.restaurant_address}</p>
        </div>
        <hr />
      </div>
    );
  }
}

export default SearchResultsItem;

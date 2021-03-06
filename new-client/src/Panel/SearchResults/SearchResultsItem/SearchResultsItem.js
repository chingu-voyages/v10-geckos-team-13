import React, { Component } from "react";
import "./SearchResultsItem.css";

class SearchResultsItem extends Component {
  render() {
    const restaurant = this.props.restaurant;
    const IMG_URL =
      "https://menu-please.s3-ap-southeast-1.amazonaws.com/uploads/";

    return (
      <div className="SearchResultsItem" onClick={this.props.handleClicked}>
        <div className="SearchResultsItem__container--1 img-overflow">
          <img
            className="SearchResultsItem__img"
            src={IMG_URL + restaurant.restaurant_img}
            alt={"Photo of " + restaurant.restaurant_name}
          />
        </div>
        <div className="SearchResultsItem__container--2">
          <p className="text-overflow bold no-margin">
            {restaurant.restaurant_name}
          </p>
          <p className="text-overflow no-margin">
            {restaurant.restaurant_address}
          </p>
        </div>
        <hr />
      </div>
    );
  }
}

export default SearchResultsItem;

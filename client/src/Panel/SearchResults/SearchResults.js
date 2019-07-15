import React, { Component } from "react";
import "./SearchResults.css";

import SearchResultsItem from "./SearchResultsItem/SearchResultsItem";

class SearchResults extends Component {
  handleSelected = restaurant => {
    this.props.handleSelected(restaurant, false, false, false);
  };

  handleAdd = () => {
    this.props.handleSelected(null, false, false, true);
  };

  render() {
    return (
      <div className="SearchResults">
        {this.props.restaurantsList &&
          this.props.restaurantsList.map(restaurant => {
            return (
              <SearchResultsItem
                key={restaurant.restaurant_id}
                restaurant={restaurant}
                handleClicked={() => this.handleSelected(restaurant)}
              />
            );
          })}
        <p className="SearchResults__add-restaurant" onClick={this.handleAdd}>
          Don't see the result you want?
          <br />
          Add a restaurant yourself!
        </p>
      </div>
    );
  }
}

export default SearchResults;

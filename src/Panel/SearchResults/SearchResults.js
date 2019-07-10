import React, { Component } from 'react';
import './SearchResults.css';

import SearchResultsItem from './SearchResultsItem/SearchResultsItem';

class SearchResults extends Component {
  handleSelected(restaurant) {
    this.props.handleSelected(restaurant);
  }

  render() {
    return (
      <div className="SearchResults">
        <h3>Search Results</h3>
        {this.props.restaurantsList.map(restaurant => {
          return (
            <SearchResultsItem 
              key = {restaurant.id} 
              restaurant = {restaurant}
              handleClicked = {this.handleSelected.bind(this, restaurant)}
            />
          );
        })}
      </div>
    );
  }
}

export default SearchResults;
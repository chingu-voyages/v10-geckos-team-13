import React, { Component } from 'react';
import './SearchResults.css';

import SearchResultsItem from './SearchResultsItem/SearchResultsItem';

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleSelected(restaurant) {
    this.props.handleSelected(restaurant);
  }

  handleAdd() {
    this.props.handleSelected(null, true);
  }

  render() {
    return (
      <div className="SearchResults">
        {this.props.restaurantsList.map(restaurant => {
          return (
            <SearchResultsItem 
              key = {restaurant.id} 
              restaurant = {restaurant}
              handleClicked = {this.handleSelected.bind(this, restaurant)}
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
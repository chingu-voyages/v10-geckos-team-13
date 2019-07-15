import React, { Component } from 'react';
import './SearchResultsItem.css';

class SearchResultsItem extends Component {
  render() {
    const restaurant = this.props.restaurant;
    return (
      <div className="SearchResultsItem" onClick={this.props.handleClicked}>
        <div className = "SearchResultsItem__container--1 img-overflow">
          <img 
            className="SearchResultsItem__img"
            src={restaurant.imgUrl} 
            alt={"Photo of " + restaurant.name}
          />
        </div>
        <div className="SearchResultsItem__container--2">
          <p className="text-overflow bold no-margin">{restaurant.name}</p>
          <p className="text-overflow no-margin">{restaurant.address}</p>
        </div>
        <hr />
      </div>
    );
  }
}

export default SearchResultsItem;
import React, { Component } from 'react';
import './Panel.css';

import Restaurants from '../shared/restaurants';

import RestaurantDescription from './RestaurantDescription/RestaurantDescription';
import SearchResults from './SearchResults/SearchResults';

class Panel extends Component {


  render() {
    const restaurants = Restaurants.getRestaurants();

    return (
      <div className="Panel">
        {
          this.props.selectedRestaurant ?
          <RestaurantDescription restaurant = {this.props.selectedRestaurant}/>:
          <SearchResults restaurantsList = {restaurants}/>
        }
      </div>
    );
  }
}

export default Panel

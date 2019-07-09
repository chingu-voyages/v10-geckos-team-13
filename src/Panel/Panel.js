import React, { Component } from 'react';
import './Panel.css';

import Restaurants from '../shared/restaurants';

import RestaurantDescription from './RestaurantDescription/RestaurantDescription';
import SearchResults from './SearchResults/SearchResults';

class Panel extends Component {


  render() {
    const restaurants = Restaurants.getRestaurants();
    const defaultRestaurant = restaurants[2];

    return (
      <div className="Panel">
        <SearchResults restaurantsList = {restaurants}/>
      </div>
    );
  }
}

export default Panel

// 
// <RestaurantDescription restaurant = {defaultRestaurant}/>
import React, { Component } from 'react';
import './Panel.css';

import Restaurants from '../shared/restaurants';

import RestaurantDescription from './RestaurantDescription/RestaurantDescription';

class Panel extends Component {


  render() {
    const restaurants = Restaurants.getRestaurants();
    const defaultRestaurant = restaurants[0];

    return (
      <div className="Panel">
        <RestaurantDescription restaurant={defaultRestaurant}/>
      </div>
    );
  }
}

export default Panel
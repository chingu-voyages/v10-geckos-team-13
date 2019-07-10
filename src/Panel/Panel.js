import React, { Component } from 'react';
import './Panel.css';

import Restaurants from '../shared/restaurants';

import RestaurantDescription from './RestaurantDescription/RestaurantDescription';
import SearchResults from './SearchResults/SearchResults';

class Panel extends Component {
  constructor(props) {
    super(props);
    this.handleSelected = this.handleSelected.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  handleBack() {
    this.props.handleSelected(null);
  }

  handleSelected(restaurant) {
    this.props.handleSelected(restaurant);
  }

  render() {
    const restaurants = Restaurants.getRestaurants();
    const selectedRestaurant = this.props.selectedRestaurant;

    return (
      <div className="Panel">
        {
          selectedRestaurant ?
          <RestaurantDescription restaurant = {selectedRestaurant} handleBack = {this.handleBack}/>:
          <SearchResults restaurantsList = {restaurants} handleSelected = {this.handleSelected}/>
        }
      </div>
    );
  }
}

export default Panel

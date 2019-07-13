import React, { Component } from 'react';
import './Panel.css';

import Restaurants from '../shared/restaurants';

import RestaurantDescription from './RestaurantDescription/RestaurantDescription';
import SearchResults from './SearchResults/SearchResults';
import RestaurantForm from './RestaurantForm/RestaurantForm';

class Panel extends Component {
  constructor(props) {
    super(props);
    this.handleSelected = this.handleSelected.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  handleBack() {
    this.props.handleSelected(null, false);
  }

  handleSelected(restaurant, editMode=false) {
    this.props.handleSelected(restaurant, editMode);
  }

  render() {
    const restaurants = Restaurants.getRestaurants();
    const selectedRestaurant = this.props.selectedRestaurant;

    return (
      <div className="Panel">
        {
          this.props.editMode ?
          <RestaurantForm restaurant = {selectedRestaurant}/>: (
            selectedRestaurant ? 
            <RestaurantDescription 
              restaurant = {selectedRestaurant} 
              handleBack = {this.handleBack}
              handleSelected = {this.handleSelected}
            />:
            <SearchResults 
              restaurantsList = {restaurants} 
              handleSelected = {this.handleSelected}
            />
          )
        }
      </div>
    );
  }
}

export default Panel

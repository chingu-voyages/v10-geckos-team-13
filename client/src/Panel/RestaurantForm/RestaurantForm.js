import React, { Component } from 'react';
import './RestaurantForm.css';

import { Restaurant } from '../../shared/restaurants';

class RestaurantForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleHoursChange = this.handleHoursChange.bind(this);
    this.state = {
      restaurant: this.props.restaurant || new Restaurant(),
      validImg: false
    }
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleChange(event) {
    const restaurant = {...this.state.restaurant};
    restaurant[event.target.name] = event.target.value;
    this.setState({
      restaurant: restaurant
    });
  }

  handleHoursChange(event) {
    const index = event.target.getAttribute("data-key");
    const restaurant = {...this.state.restaurant};
    const openingHours = [...restaurant.openingHours.map(openingHour => { return {...openingHour} })];
    while (index > openingHours.length-1) openingHours.push({days: '', hours: ''});
    openingHours[index][event.target.name] = event.target.value;
    restaurant.openingHours = openingHours;
    this.setState({
      restaurant: restaurant
    });
  }

  render() {
    const restaurant = this.state.restaurant;

    // check for valid images, set state
    const isValidImg = new Promise((resolve, reject) => {
      if (!restaurant.imgUrl) reject();
      const img = new Image();
      img.onerror = () => {
        reject();
      }
      img.onload = () => {
        resolve();
      }
      img.src = restaurant.imgUrl;
    });
    isValidImg.then(() => {
      if (!this.state.validImg) this.setState({validImg: true});
    }).catch(() => {
      if (this.state.validImg) this.setState({validImg: false});
    });

    return (
      <form className="RestaurantForm" autoComplete="off" onSubmit={this.handleSubmit}>
        <div className="RestaurantForm__group">
          <label htmlFor="restaurantName">Restaurant Name</label>
          <input 
            type="text" 
            name="name"
            id="restaurantName" 
            className="RestaurantForm__input" 
            value={restaurant.name} 
            onChange={this.handleChange}
          />
        </div>
        <div className="RestaurantForm__group">
          <label htmlFor="restaurantImage">Restaurant Image</label>
          {this.state.validImg ? <img src={restaurant.imgUrl} alt={restaurant.name} className="RestaurantForm__img"/>: ''}
          <input 
            type="text" 
            name="imgUrl"
            id="restaurantImage" 
            className="RestaurantForm__input"
            value={restaurant.imgUrl} 
            onChange={this.handleChange}
          />
        </div>
        <div className="RestaurantForm__group">
          <label>Opening Hours</label>
          {(restaurant.openingHours.length!==0 ? restaurant.openingHours : [" "]).map((openingHour, index) => {
            return (
              <div key={index}>
                <input 
                  data-key={index}
                  type="text" 
                  name="days"
                  className="RestaurantForm__input--left" 
                  value={openingHour.days}
                  onChange={this.handleHoursChange}
                />
                <input 
                  data-key={index}
                  type="text" 
                  name="hours"
                  className="RestaurantForm__input--right" 
                  value={openingHour.hours}
                  onChange={this.handleHoursChange}
                />
              </div>
            );
          })}
          
        </div>
        <div className="RestaurantForm__group">
          <label htmlFor="address">Address</label>
          <input 
            type="text" 
            name="address"
            id="address" 
            className="RestaurantForm__input"
            value={restaurant.address}
            onChange={this.handleChange}
          />
        </div>
        <div className="RestaurantForm__group">
          <label htmlFor="website">Website</label>
          <input 
            type="text" 
            name="website"
            id="website" 
            className="RestaurantForm__input"
            value={restaurant.website}
            onChange={this.handleChange}
          />
        </div>
        <button className="RestaurantForm__submit" type="submit">Save</button>
      </form>
    );
  }
}

export default RestaurantForm;
import React, { Component } from 'react';
import './RestaurantForm.css';

class RestaurantForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      restaurant: this.props.restaurant || {}
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

  render() {
    const restaurant = this.state.restaurant;
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
          {restaurant.imgUrl ? <img src={restaurant.imgUrl} alt={restaurant.name} className="RestaurantForm__img"/>: ''}
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
          <input type="text" className="RestaurantForm__input--left"/>
          <input type="text" className="RestaurantForm__input--right"/>
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
        <button type="submit">Save</button>
      </form>
    );
  }
}

export default RestaurantForm;
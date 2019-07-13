import React, { Component } from 'react';
import './RestaurantDescription.css';

// import Restaurants from '../../shared/restaurants';
class RestaurantDescription extends Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit() {
    this.props.handleSelected(this.props.restaurant, true);
  }

  render() {
    const restaurant = this.props.restaurant;
    return (
      <div className="RestaurantDescription">
        <button onClick={this.props.handleBack}>Back</button>
        <h2>{restaurant.name}</h2>
        <img 
          src={restaurant.imgUrl} 
          alt={"Photo of " + restaurant.name}
          className="RestaurantDescription__img"
        />
        {restaurant.openingHours.map( (openingHour, index) => {
          return <p key={index}>{openingHour.days} {openingHour.hours}</p>
        })}
        <p><b>Address: </b>{restaurant.address}</p>
        <p>
          <b>Website: </b> 
          <a 
            href={restaurant.website}
            target="_blank"
            rel="noopener noreferrer"
            className="dont-break-out"
          >
            {restaurant.website}
          </a>
        </p>
        <h3 align="center">Menu</h3>
        {restaurant.menuImgs.map( (imgUrl, index) => {
          return (
            <img 
              key={index}
              src={imgUrl}
              alt={"Menu index " + index}
              className="RestaurantDescription__img"
            />
          );
        })}
        <button onClick={this.handleEdit}>Edit</button>
      </div>
    );
  }
}

export default RestaurantDescription;
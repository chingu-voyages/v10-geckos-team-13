import React, { Component } from "react";
import "./RestaurantDescription.css";

// import Restaurants from '../../shared/restaurants';
class RestaurantDescription extends Component {
  handleEdit = () => {
    this.props.handleSelected(this.props.restaurant, true, false, false);
  };

  render() {
    const restaurant = this.props.restaurant;
    return (
      <div className="RestaurantDescription">
        <button onClick={this.props.handleBack}>Back</button>
        <h2>{restaurant.restaurant_name}</h2>
        <img
          src={"http://localhost:8080/" + restaurant.restaurant_img}
          alt={"Photo of " + restaurant.restaurant_name}
          className="RestaurantDescription__img"
        />

        {restaurant.restaurant_openingHours.map((openingHour, index) => {
          return (
            <p key={index}>
              {openingHour.days} : {openingHour.hours}
            </p>
          );
        })}
        <p>
          <b>Address: </b>
          {restaurant.restaurant_address}
        </p>
        <p>
          <b>Phone: </b>
          {restaurant.restaurant_phone}
        </p>
        <p>
          <b>Website: </b>
          <a
            href={restaurant.restaurant_website}
            target="_blank"
            rel="noopener noreferrer"
          >
            {restaurant.restaurant_website}
          </a>
        </p>
        <h3 align="center">Menu</h3>
        {restaurant.restaurant_menuImgs.map((imgUrl, index) => {
          return (
            <img
              key={index}
              src={"http://localhost:8080/" + imgUrl}
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

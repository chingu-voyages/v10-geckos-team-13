import React, { Component } from 'react';
import './RestaurantDescription.css';

// import Restaurants from '../../shared/restaurants';
class RestaurantDescription extends Component {
  render() {
    const restaurant = this.props.restaurant;
    return (
      <div className="RestaurantDescription">
        <h2>{restaurant.name}</h2>
        <img 
          src={restaurant.imgUrl} 
          alt={"Photo of " + restaurant.name}
          className="RestaurantDescription__img"
        />
        {restaurant.openingHours.map( i => {
          return <p>{i}</p>
        })}
        <p><b>Address: </b>{restaurant.address}</p>
        <p>
          <b>Website: </b> 
          <a 
            href={restaurant.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            {restaurant.website}
          </a>
        </p>
        <h3 align="center">Menu</h3>
        {restaurant.menuImgs.map( (imgUrl, index) => {
          return (
            <img 
              src={imgUrl}
              alt={"Menu index " + index}
              className="RestaurantDescription__img"
            />
          );
        })}
      </div>
    );
  }
}

export default RestaurantDescription;
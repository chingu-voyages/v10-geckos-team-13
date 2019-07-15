import React, { Component } from "react";
import "./RestaurantForm.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

import { Restaurant } from "../../shared/restaurants";
import GeocodingService from "../../shared/geocoder";

class RestaurantForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: this.props.restaurant || new Restaurant(),
      validImg: false
    };
  }

  componentDidMount = () => {
    this.props.handleToggleQueryMarker(true);
  };

  componentWillUnmount = () => {
    this.props.handleToggleQueryMarker(false);
  };

  handleSubmit = event => {
    console.log(this.state.restaurant);
    event.preventDefault();
  };

  handleChange = event => {
    const restaurant = { ...this.state.restaurant };
    restaurant[event.target.name] = event.target.value;
    this.setState({
      restaurant: restaurant
    });
  };

  handleHoursChange = event => {
    const index = event.target.getAttribute("data-key");
    const restaurant = { ...this.state.restaurant };
    const openingHours = [
      ...restaurant.openingHours.map(openingHour => {
        return { ...openingHour };
      })
    ];
    openingHours[index][event.target.name] = event.target.value;
    restaurant.openingHours = openingHours;
    this.setState({
      restaurant: restaurant
    });
  };

  handleDeleteHour = event => {
    const index = event.target.getAttribute("data-key");
    const restaurant = { ...this.state.restaurant };
    const openingHours = [
      ...restaurant.openingHours.map(openingHour => {
        return { ...openingHour };
      })
    ];
    openingHours.splice(index, 1);
    restaurant.openingHours = openingHours;
    this.setState({
      restaurant: restaurant
    });
  };

  handleAddHour = () => {
    const restaurant = { ...this.state.restaurant };
    const openingHours = [
      ...restaurant.openingHours.map(openingHour => {
        return { ...openingHour };
      })
    ];
    openingHours.push({ days: "", hours: "" });
    restaurant.openingHours = openingHours;
    this.setState({
      restaurant: restaurant
    });
  };

  handleGetAddress = () => {
    const queriedCoords = this.props.queriedCoords;
    if (queriedCoords.lat === 0 && queriedCoords.lng === 0) return;
    const restaurant = { ...this.state.restaurant };
    GeocodingService.reverseGeocode(queriedCoords)
      .then(address => {
        restaurant.address = address;
        this.setState({
          restaurant: restaurant
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    // const coords = {lat: 5.42992, lng: 100.39401};
    // GeocodingService.reverseGeocode(coords).then(res=>console.log(res.data.Response.View)).catch(err=>console.log(err));
    const restaurant = this.state.restaurant;
    const queriedCoords = this.props.queriedCoords;

    // check for valid images, set state
    const isValidImg = new Promise((resolve, reject) => {
      if (!restaurant.imgUrl) reject();
      const img = new Image();
      img.onerror = () => {
        reject();
      };
      img.onload = () => {
        resolve();
      };
      img.src = restaurant.imgUrl;
    });
    isValidImg
      .then(() => {
        if (!this.state.validImg) this.setState({ validImg: true });
      })
      .catch(() => {
        if (this.state.validImg) this.setState({ validImg: false });
      });

    return (
      <Form
        className="RestaurantForm"
        autoComplete="off"
        onSubmit={this.handleSubmit}
      >
        <Form.Group controlId="restaurantName">
          <Form.Label className="bold">Restaurant Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={restaurant.name}
            onChange={this.handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="restaurantImage">
          <Form.Label className="bold">Restaurant Image</Form.Label>
          {this.state.validImg ? (
            <img
              src={restaurant.imgUrl}
              alt={restaurant.name}
              className="RestaurantForm__img"
            />
          ) : (
            ""
          )}
          <Form.Control
            type="text"
            name="imgUrl"
            value={restaurant.imgUrl}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="bold">Opening Hours</Form.Label>
          {restaurant.openingHours.map((openingHour, index) => {
            return (
              <Form.Row key={index} className="mb-sm">
                <Col lg={5}>
                  <Form.Control
                    data-key={index}
                    type="text"
                    name="days"
                    value={openingHour.days}
                    onChange={this.handleHoursChange}
                    required
                  />
                </Col>
                <Col lg={5}>
                  <Form.Control
                    data-key={index}
                    type="text"
                    name="hours"
                    value={openingHour.hours}
                    onChange={this.handleHoursChange}
                    required
                  />
                </Col>
                <Col lg={2}>
                  <Button
                    data-key={index}
                    variant="danger"
                    type="button"
                    onClick={this.handleDeleteHour}
                  >
                    X
                  </Button>
                </Col>
              </Form.Row>
            );
          })}
          <Form.Row>
            <Col>
              <Button size="sm" onClick={this.handleAddHour}>
                Add
              </Button>
            </Col>
          </Form.Row>
        </Form.Group>
        <Form.Group controlId="address">
          <Form.Label className="bold">Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={restaurant.address}
            onChange={this.handleChange}
            required
          />
          <Form.Text
            className="RestaurantForm__text-link"
            onClick={this.handleGetAddress}
          >
            Use marker coordinates: ({queriedCoords.lat.toFixed(5)},{" "}
            {queriedCoords.lng.toFixed(5)})
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="website">
          <Form.Label className="bold">Website</Form.Label>
          <Form.Control
            type="url"
            name="website"
            value={restaurant.website}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Row>
          <Col>
            <Button variant="success" block type="submit">
              Save
            </Button>
          </Col>
          <Col>
            <Button variant="danger" block type="button">
              Delete
            </Button>
          </Col>
          <Col>
            <Button variant="secondary" block type="button">
              Cancel
            </Button>
          </Col>
        </Form.Row>
      </Form>
    );
  }
}

export default RestaurantForm;

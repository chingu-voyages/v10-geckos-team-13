import React, { Component } from "react";
import "./RestaurantEditForm.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import axios from "axios";

import GeocodingService from "../../shared/geocoder";

class RestaurantEditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantId: "",
      restaurantName: "",
      restaurantAddress: "",
      restaurantPhone: "",
      restaurantWebsite: "",
      selectedFile: null,
      menuFiles: null,
      openingHours: []
    };
  }

  componentDidMount = () => {
    //this.props.handleToggleQueryMarker(true);

    this.setState({
      restaurantId: this.props.restaurant._id,
      restaurantName: this.props.restaurant.restaurant_name,
      restaurantAddress: this.props.restaurant.restaurant_address,
      restaurantPhone: this.props.restaurant.restaurant_phone,
      restaurantWebsite: this.props.restaurant.restaurant_website,
      openingHours: this.props.restaurant.restaurant_openingHours
    });
  };

  componentWillUnmount = () => {
    //this.props.handleToggleQueryMarker(false);
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleImgChange = event => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  handleMenuImgsChange = event => {
    this.setState({ menuFiles: event.target.files });
  };

  handleSubmit = () => {
    const queriedCoords = this.props.queriedCoords;
    const API_URL =
      window.location.hostname === "localhost"
        ? "http://localhost:8080/api/restaurants/"
        : "https://menu-please-api.herokuapp.com/api/restaurants/";
    const formData = new FormData();

    formData.append("selectedFile", this.state.selectedFile);

    if (this.state.menuFiles !== null) {
      for (var x = 0; x < this.state.menuFiles.length; x++) {
        formData.append("selectedFile", this.state.menuFiles[x]);
      }
    }

    //formData.append("selectedFile", this.state.file);
    formData.append("restaurantName", this.state.restaurantName);
    formData.append("restaurantAddress", this.state.restaurantAddress);
    formData.append("restaurantPhone", this.state.restaurantPhone);
    formData.append("restaurantWebsite", this.state.restaurantWebsite);
    formData.append("openingHours", JSON.stringify(this.state.openingHours));
    formData.append("coords", JSON.stringify(queriedCoords));

    axios
      .put(`${API_URL}${this.state.restaurantId}`, formData)
      .then(response => {
        //console.log(response.data.data);
        this.props.handleSelected(response.data.data, false, false, false);
        this.props.handleRestaurantRefresh(true);
      });
  };

  handleDeleteRestaurant = () => {
    //Restaurants.deleteRestaurant(this.state.restaurant);
    const API_URL =
      window.location.hostname === "localhost"
        ? "http://localhost:8080/api/restaurants/"
        : "https://menu-please-api.herokuapp.com/api/restaurants/";

    axios.delete(`${API_URL}${this.state.restaurantId}`).then(response => {
      this.props.handleRestaurantRefresh(true);
      this.props.handleBack(null);
    });
  };

  handleHoursChange = event => {
    const index = event.target.getAttribute("data-key");
    //const restaurant = { ...this.state.restaurant };
    const openingHours = [
      ...this.state.openingHours.map(openingHour => {
        return { ...openingHour };
      })
    ];
    openingHours[index][event.target.name] = event.target.value;
    //restaurant.openingHours = openingHours;
    this.setState({
      openingHours: openingHours
    });
  };

  handleAddHour = () => {
    //const restaurant = { ...this.state.restaurant };
    const openingHours = [
      ...this.state.openingHours.map(openingHour => {
        return { ...openingHour };
      })
    ];
    openingHours.push({ days: "", hours: "" });
    //restaurant.openingHours = openingHours;
    this.setState({
      openingHours: openingHours
    });
  };

  handleDeleteHour = event => {
    const index = event.target.getAttribute("data-key");
    //const restaurant = { ...this.state.restaurant };
    const openingHours = [
      ...this.state.openingHours.map(openingHour => {
        return { ...openingHour };
      })
    ];
    openingHours.splice(index, 1);
    //restaurant.openingHours = openingHours;
    this.setState({
      openingHours: openingHours
    });
  };

  handleGetAddress = () => {
    const queriedCoords = this.props.queriedCoords;
    if (queriedCoords.lat === 0 && queriedCoords.lng === 0) return;
    //const restaurant = { ...this.state.restaurant };
    GeocodingService.reverseGeocode(queriedCoords)
      .then(address => {
        //restaurant.address = address;
        //restaurant.coords = { ...queriedCoords };
        this.setState({
          restaurantAddress: address
        });
      })
      .catch(err => console.log(err));
  };

  handleCancel = () => {
    this.props.handleBack(null);
  };

  render() {
    const queriedCoords = this.props.queriedCoords;

    return (
      <Form className="RestaurantForm" autoComplete="off">
        <Form.Group controlId="restaurantName">
          <Form.Label className="bold">Restaurant Name</Form.Label>
          <Form.Control
            type="text"
            name="restaurantName"
            value={this.state.restaurantName}
            onChange={this.handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="restaurantImg">
          <Form.Label className="bold">Restaurant Image</Form.Label>
          <Form.Control
            type="file"
            name="restaurantImg"
            onChange={this.handleImgChange}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label className="bold">Opening Hours</Form.Label>
          {this.state.openingHours.map((openingHour, index) => {
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

        <Form.Group controlId="restaurantAddress">
          <Form.Label className="bold">Address</Form.Label>
          <Form.Control
            type="text"
            name="restaurantAddress"
            value={this.state.restaurantAddress}
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

        <Form.Group controlId="restaurantPhone">
          <Form.Label className="bold">Phone</Form.Label>
          <Form.Control
            type="text"
            name="restaurantPhone"
            value={this.state.restaurantPhone}
            onChange={this.handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="website">
          <Form.Label className="bold">Website</Form.Label>
          <Form.Control
            type="url"
            name="restaurantWebsite"
            value={this.state.restaurantWebsite}
            onChange={this.handleChange}
          />
        </Form.Group>

        <Form.Group controlId="restaurantImg">
          <Form.Label className="bold">Menu Images</Form.Label>
          <Form.Control
            type="file"
            name="restaurantMenuImgs"
            onChange={this.handleMenuImgsChange}
            required
            multiple
          />
        </Form.Group>

        <Form.Row>
          <Col>
            <Button
              variant="success"
              block
              type="button"
              onClick={this.handleSubmit}
            >
              Update
            </Button>
          </Col>
          <Col>
            <Button
              variant="danger"
              block
              type="button"
              onClick={this.handleDeleteRestaurant}
            >
              Delete
            </Button>
          </Col>
          <Col>
            <Button
              variant="secondary"
              block
              type="button"
              onClick={this.handleCancel}
            >
              Cancel
            </Button>
          </Col>
        </Form.Row>
      </Form>
    );
  }
}

export default RestaurantEditForm;

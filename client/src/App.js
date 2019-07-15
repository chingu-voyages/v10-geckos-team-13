import React, { Component } from "react";
import "./App.css";
import Navbar from "./Navbar/Navbar";
import MapContainer from "./MapContainer/MapContainer";
import Panel from "./Panel/Panel";
import { search } from "./utils";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRestaurant: null,
      searchResults: null,
      editMode: false,
      searchMode: false,
      addMode: true
    };
  }

  search = async val => {
    this.setState({ loading: true });
    const API_URL =
      window.location.hostname === "localhost"
        ? "http://localhost:8080/api/restaurants/search?q="
        : "production-url";
    const results = await search(`${API_URL}${val}`);
    const searchResults = results;

    this.setState({ searchResults, loading: false });
  };

  handleSearchInput = async e => {
    this.search(e.target.value);
    if (e.target.value === "") {
      this.setState({
        editMode: false,
        searchMode: false,
        addMode: true
      });
    } else {
      this.setState({
        editMode: false,
        searchMode: true,
        addMode: false
      });
    }
  };

  handleSelected = (
    restaurant,
    editMode = false,
    searchMode = false,
    addMode = false
  ) => {
    this.setState({
      selectedRestaurant: restaurant,
      editMode: editMode,
      searchMode: searchMode,
      addMode: addMode
    });
  };

  render() {
    return (
      <div className="App">
        <Navbar handleSearchInput={this.handleSearchInput} />
        <div className="App__body">
          <MapContainer handleSelected={this.handleSelected} />
          <Panel
            editMode={this.state.editMode}
            searchMode={this.state.searchMode}
            addMode={this.state.addMode}
            selectedRestaurant={this.state.selectedRestaurant}
            searchResults={this.state.searchResults}
            handleSelected={this.handleSelected}
          />
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header/header";
import SearchResults from "./components/Content/searchResults";
import ImageSearch from "./components/ImageSlider/ImageSearch";
import Footer from "./components/Footer/footer";

class App extends Component {
  state = {
    searchString: null
  };
  handleSearch = (value) => {
    this.setState({ searchString: value.toLowerCase() });
  };
  render() {
    return (
      <div className="App">
        <Header handleSearch={this.handleSearch} />
        {this.state.searchString !== "" &&
        ["christmas gifts", "birthday gifts"].includes(
          this.state.searchString
        ) ? (
          <>
            <ImageSearch search={this.state.searchString} />
            <SearchResults search={this.state.searchString} />
            <Footer />
          </>
        ) : this.state.searchString === null ? null : (
          <div className="error-msg">
            Results are configured only for search string "christmas gifts" and
            "birthday gifts" in this assignment.Please try with these two words
            only.{" "}
          </div>
        )}
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import "./ImageSearch.css";
import ImageSlider from "./imageSlider";
import data from "../../api/data";
class ImageSearch extends Component {
  state = {
    category: "",
    gender: "",
    price: 0,
    searchFilters: null,
    filteredImages: null
  };
  componentWillMount = () => {
    if (this.props.search) {
      let searchFilters =
        data["searchResults"][this.props.search].imageResults.searchFilter;
      this.setState(
        {
          searchFilters: searchFilters,
          category: "trending",
          gender: "friends",
          price: 1000
        },
        () => {
          this.filterImages();
        }
      );
    }
  };
  componentWillReceiveProps = (nextProps) => {
    if (this.props.search !== nextProps.search) {
      console.log("New props rece", nextProps.search);
      this.fetchSearchResults(nextProps.search);
    }
  };
  fetchSearchResults = (searchString) => {
    if (searchString) {
      let searchFilters =
        data["searchResults"][this.props.search].imageResults.searchFilter;
      this.setState({
        searchFilters: searchFilters,
        category: "trending",
        gender: "all",
        price: 50
      });
    }
  };
  onCategoryChanged = (type, e) => {
    if (type === "price") {
      this.setState({ [type]: +e.target.value }, () => {
        this.filterImages();
      });
    } else {
      this.setState({ [type]: e.target.value }, () => {
        this.filterImages();
      });
    }
  };
  filterImages = () => {
    console.log("Filtering");
    let imageResults =
      data["searchResults"][this.props.search].imageResults.images;
    let filteredImages = imageResults.filter((item, index) => {
      return (
        item.category.includes(this.state.category) &&
        (this.state.gender === "all"
          ? true
          : item.giftFor.includes(this.state.gender)) &&
        (this.state.price === 1001
          ? item.price > this.state.price
          : item.price < this.state.price)
      );
    });

    this.setState({ filteredImages: filteredImages });
  };
  isRadioSelected = (group, value) => {
    return this.state[group] === value ? "selected" : "";
  };
  formImageUrl = (string) => {
    let query = string.replace(" ", "+");
    return `https://www.bing.com/images/search?q=${query}`;
  };
  render() {
    return (
      <div className="imageSearch">
        <div className="heading">
          <a
            href={this.formImageUrl(this.props.search)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={"Click here for images of " + this.props.search}
          >
            Images of {this.props.search}
          </a>
        </div>
        <div className="imageSearchHeader">
          {this.state.searchFilters
            ? this.state.searchFilters.map((item, index) => (
                <div className="type" key={index}>
                  <div className="title">{item.title}</div>
                  <div className="filters">
                    {item.filters.map((item1, index) => (
                      <div
                        className={
                          "filter" +
                          " " +
                          this.isRadioSelected(item1.type, item1.value)
                        }
                        key={index}
                      >
                        <label htmlFor={item1.label}>{item1.label}</label>
                        <input
                          type="radio"
                          id={item1.label}
                          value={item1.value}
                          onChange={(e) =>
                            this.onCategoryChanged(item1.type, e)
                          }
                          name={item1.type}
                        ></input>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            : null}
        </div>
        <div className="imageSearchResults">
          {this.state.filteredImages ? (
            <ImageSlider images={this.state.filteredImages} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default ImageSearch;

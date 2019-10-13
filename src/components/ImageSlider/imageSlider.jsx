import React, { Component } from "react";
import "./ImageSlider.css";
import data from "../../api/data";
class ImageSlider extends Component {
  state = {
    searchImages: null
  };
  componentWillMount = () => {
    this.setState({ searchImages: this.props.images });
  };
  componentWillReceiveProps = (nextProps) => {
    this.setState({ searchImages: nextProps.images });
    this.inputElement.click();
  };
  getBackImg = (imgUrl) => {
    return { backgroundImage: "url(" + imgUrl + ")" };
  };
  render() {
    return (
      <div className="slider">
        <div className="slideContainer">
          <input
            type="radio"
            name="select"
            id="left"
            ref={(input) => (this.inputElement = input)}
          ></input>
          <input type="radio" name="select" id="right"></input>

          <div className="slide s1">
            {this.state.searchImages
              ? this.state.searchImages.slice(0, 20).map((item, index) => (
                  <div className="grid-item" key={index}>
                    <div
                      className="image"
                      style={this.getBackImg(item.url)}
                    ></div>
                    <div className="details">
                      <div>
                        <div className="price">{"$" + item.price}</div>
                      </div>
                      <div>
                        <div className="source">
                          <a href={item.produrl} target="_blank">
                            {item.source}
                          </a>
                        </div>
                        <div className="open-link"></div>
                        <div className={"rating " + item.rating}></div>
                      </div>
                    </div>
                  </div>
                ))
              : null}
          </div>
          <div className="slide s2">
            {this.state.searchImages
              ? this.state.searchImages.slice(20, 40).map((item, index) => (
                  <div className="grid-item" key={index}>
                    <div
                      className="image"
                      style={this.getBackImg(item.url)}
                    ></div>
                    <div className="details">
                      <div>
                        <div className="price">{"$" + item.price}</div>
                      </div>
                      <div>
                        <div className="source">
                          <a href={item.produrl} target="_blank">
                            {item.source}
                          </a>
                        </div>
                        <div className="open-link"></div>
                        <div className={"rating " + item.rating}></div>
                      </div>
                    </div>
                  </div>
                ))
              : null}
          </div>
          <label htmlFor="left" className="leftArrow"></label>
          <label htmlFor="right" className="rightArrow"></label>
        </div>
      </div>
    );
  }
}

export default ImageSlider;

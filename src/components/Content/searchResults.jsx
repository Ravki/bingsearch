import React, { Component } from "react";
import data from "../../api/data";
import ResultBlock from "./ResultBlock.jsx";
import "./SearchResults.css";

class SearchResults extends Component {
  state = {
    results: null,
    suggestions: null
  };
  componentWillMount = () => {
    if (this.props.search) {
      this.fetchSearchResults(this.props.search);
    }
  };
  componentWillReceiveProps = (nextProps) => {
    if (this.props.search !== nextProps.search) {
      this.fetchSearchResults(nextProps.search);
    }
  };
  fetchSearchResults = (searchString) => {
    let relevantResults = data["searchResults"][searchString]["results"];
    let suggestions = data["searchResults"][searchString]["relatedSearch"];
    this.setState({ results: relevantResults });
    this.setState({ suggestions: suggestions });
  };

  render() {
    return (
      <div className="container">
        <div className="results">
          <main className="searchResults">
            <div className="metrics"></div>
            <ResultBlock results={this.state.results}></ResultBlock>
            <div className="pagination">
              <nav
                className="nav-bar"
                role="navigation"
                aria-label="more results"
              >
                <ul>
                  <li>
                    <a href="#"></a>
                  </li>
                  <li className="selected">
                    <a href="#">1</a>
                  </li>
                  <li>
                    <a href="#">2</a>
                  </li>
                  <li>
                    <a href="#">3</a>
                  </li>
                  <li>
                    <a href="#">4</a>
                  </li>
                  <li>
                    <a href="#">5</a>
                  </li>
                  <li>
                    <a href="#"></a>
                  </li>
                </ul>
              </nav>
            </div>
          </main>
          {this.state.suggestions ? (
            <>
              <aside className="relatedSearch">
                <h3 className="title">
                  Related Searches For {this.props.search}{" "}
                </h3>
                <div className="suggestions-container">
                  <ul className="suggestions-list">
                    {this.state.suggestions
                      .slice(0, this.state.suggestions.length / 2)
                      .map((item, index) => (
                        <li key={index}>
                          <a className="suggestion" href="#">
                            {item}
                          </a>
                        </li>
                      ))}
                  </ul>
                  <ul className="suggestions-list">
                    {this.state.suggestions
                      .slice(
                        this.state.suggestions.length / 2,
                        this.state.suggestions.length
                      )
                      .map((item, index) => (
                        <li key={index}>
                          <a className="suggestion" href="#">
                            {item}
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>
              </aside>
            </>
          ) : null}
        </div>
      </div>
    );
  }
}

export default SearchResults;

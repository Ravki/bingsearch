import React, { Component } from "react";
import "./header.css";
import data from "../../api/data";
class Header extends Component {
  state = {
    searchString: "",
    suggestions: null,
    showSuggestions: false
  };
  componentDidMount = () => {
    document.addEventListener("click", this.handleClickOutside);
  };
  handleClickOutside = () => {
    this.setState({ showSuggestions: false });
  };
  handleChange = (e) => {
    this.setState({ searchString: e.target.value }, () =>
      this.populateSuggestions()
    );
  };
  debounce = () => {
    let timer;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(this.populateSuggestions, 1000);
    };
  };
  populateSuggestions = () => {
    let search = this.state.searchString.toLowerCase();
    let relevant;
    if (search) {
      relevant = data["suggestions"].filter((item) => {
        return item.includes(search);
      });
    }
    this.setState({ showSuggestions: true, suggestions: relevant });
  };
  onSuggestionClicked = (e) => {
    e.preventDefault();
    this.setState({ searchString: e.target.innerHTML }, () => {
      this.handleSearch();
    });
  };
  onSuggestionSelect = (e) => {
    e.preventDefault();
    if (e.keyCode === 13) {
      this.setState({ searchString: e.target.innerHTML }, () => {
        this.handleSearch();
      });
    }
  };
  handleSearch = (e) => {
    if (e) e.preventDefault();
    this.setState({ showSuggestions: false });
    const { handleSearch: passSearchString } = this.props;
    passSearchString(this.search.value);
  };
  render() {
    return (
      <header className="header">
        <div className="header-row">
          <div className="header-column search-bar">
            <form className="action" onSubmit={this.handleSearch}>
              <figure className="logo">
                <a
                  className=""
                  href="https://www.bing.com"
                  title="Back to home"
                  target="_blank"
                  rel="noopener noreferrer"
                ></a>
              </figure>
              <div className="search">
                <input
                  autoFocus
                  type="search"
                  className="searchBox"
                  placeholder="Welcome to Bing..."
                  aria-label="Enter your search here – Search suggestions will show as you type"
                  aria-describedby="instructions"
                  aria-owns="results"
                  value={this.state.searchString}
                  onChange={this.handleChange}
                  ref={(input) => (this.search = input)}
                />
                <div
                  id="instructions"
                  aria-live="assertive"
                  style={{ display: "none" }}
                >
                  When autocomplete options are available, use up and down
                  arrows to review and enter to select.
                </div>
                {this.state.showSuggestions ? (
                  <div
                    className="suggestionWindow"
                    onClick={this.onSuggestionClicked}
                    aria-label="suggestions"
                    onKeyDown={this.onSuggestionSelect}
                  >
                    <ul
                      className="suggestionList"
                      id="results"
                      role="listbox"
                      tabIndex="-1"
                    >
                      {this.state.suggestions
                        ? this.state.suggestions.map((text, index) => (
                            <li
                              className="suggestion"
                              tabIndex="0"
                              key={index}
                              role="option"
                              aria-label={text}
                            >
                              {text}
                            </li>
                          ))
                        : null}
                    </ul>
                  </div>
                ) : null}
                <input
                  type="submit"
                  className="searchIcon"
                  aria-label="Search the web"
                />
              </div>
            </form>
          </div>
          <div className="header-column profile-bar">
            <div className="id">
              <a href="#">Sign In</a>
              <div className="logo"></div>
            </div>
            <div className="rewards">
              <a href="#">250</a>
              <div className="logo"></div>
            </div>
            <div className="menu">
              <div className="logo">
                <a href="#"></a>
              </div>
            </div>
          </div>
        </div>

        <div className="header-row">
          <div className="header-column">
            <nav
              className="nav-bar"
              role="navigation"
              aria-label="main naigation"
            >
              <ul>
                <li className="selected">
                  <a href="#">All</a>
                </li>
                <li>
                  <a href="#">Images</a>
                </li>
                <li>
                  <a href="#">Videos</a>
                </li>
                <li>
                  <a href="#">Maps</a>
                </li>
                <li>
                  <a href="#">News</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;

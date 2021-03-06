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
  setKeyEventsForSuggestions = () => {
    this.navItems = document.querySelectorAll("#results > li");
    var keys = {
      tab: 9,
      enter: 13,
      esc: 27,
      space: 32,
      left: 37,
      up: 38,
      right: 39,
      down: 40
    };
    Array.from(this.navItems).forEach((ele, index) => {
      let index1 = index;
      ele.addEventListener("keydown", (e) => {
        if (e.keyCode == keys.down) {
          this.focusEle(index1 + 1);
        }
        if (e.keyCode == keys.up) {
          if (index1 === 0) {
            this.focusEle(this.navItems.length - 1);
          } else {
            this.focusEle(index1 - 1);
          }
        }
        if (e.keyCode === keys.esc) {
          this.setState({ showSuggestions: false }, () => {
            this.search.focus();
          });
        }
      });
    });
  };
  focusEle = (idx) => {
    this.navItems[idx % this.navItems.length].focus();
  };
  handleClickOutside = () => {
    this.setState({ showSuggestions: false });
  };
  handleChange = (e) => {
    this.setState({ searchString: e.target.value }, () =>
      this.populateSuggestions()
    );
  };
  populateSuggestions = () => {
    let search = this.state.searchString.toLowerCase();
    let relevant = [];
    relevant = data["suggestions"].filter((item) => {
      return item.includes(search);
    });
    this.setState(
      {
        showSuggestions: relevant.length > 0,
        suggestions: relevant
      },
      () => {
        if (this.state.suggestions.length > 0) {
          this.setKeyEventsForSuggestions();
        }
      }
    );
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
                    <ul className="suggestionList" id="results" role="listbox">
                      {this.state.suggestions
                        ? this.state.suggestions.map((text, index) => (
                            <li
                              className="suggestion"
                              key={index}
                              tabIndex={index === 0 ? "0" : "-1"}
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
        <div
          className={
            "header-row " + (this.state.searchString ? "show" : "hide")
          }
        >
          <div className="header-column">
            <nav className="nav-bar" aria-label="main naigation">
              <ul aria-label="Select tab to view the corresponding view.">
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

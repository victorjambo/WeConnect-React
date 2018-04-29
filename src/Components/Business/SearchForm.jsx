import React, { Component } from 'react';
import './css/SearchForm.css';

/**
 * SearchForm
 */
class SearchForm extends Component {
  
  /**
   * constructor that takes
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * takes
   * @param {object} e as event submit
   * sends post request to API server
   * @returns {object} new state
   * then redirect
   */
  handleClick(e) {
    e.preventDefault();
  }

  /**
   * @return {jsx} html to be rendered
   */
  render() {
    return (
      <form>
        <div className="input-group">
          <input type="text" className="form-control" name="search" size="60" placeholder="Business Name, location or category"/>
          <span className="input-group-btn">
            <button className="btn btn-default" onClick={this.handleClick} />
          </span>
        </div>
      </form>
    );
  }
}

export default SearchForm;

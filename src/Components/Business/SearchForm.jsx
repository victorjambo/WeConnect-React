import React, { Component } from 'react';
import './css/SearchForm.css';
import { search } from '../../helpers/request';

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
    this.state = {
      query: '',
      fireRedirect: false
    };

    this.logChange = this.logChange.bind(this);
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
    const { query } = this.state;
    const url = "/api/v2/businesses/?query=";

    search(url, query).then((res) => {
      console.log(res);
    });
  }

  logChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  /**
   * @return {jsx} html to be rendered
   */
  render() {
    return (
      <form>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            name="query" size="60"
            onChange={this.logChange}
            value={this.state.query}
            placeholder="Business Name, location or category"/>
          <span className="input-group-btn">
            <button className="btn btn-default" onClick={this.handleClick} />
          </span>
        </div>
      </form>
    );
  }
}

export default SearchForm;

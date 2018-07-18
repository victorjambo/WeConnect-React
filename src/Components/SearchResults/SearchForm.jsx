import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './css/SearchForm.css';

/**
 * SearchForm shown at the hero
 */
class SearchForm extends Component {
  /**
   * constructor that takes
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      nameQuery: '',
      locationQuery: '',
      categoryQuery: '',
      fireRedirect: false
    };

    this.redirect = this.redirect.bind(this);
    this.logChange = this.logChange.bind(this);
  }

  redirect() {
    this.setState({
      fireRedirect: true
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
    const {
      fireRedirect, nameQuery, locationQuery, categoryQuery
    } = this.state;
    return (
      <form>
        <div className="input-group">
          <input
            className="form-control "
            name="nameQuery"
            value={nameQuery}
            onChange={this.logChange}
            autoComplete="off"
            placeholder="Business Name"
            style={{ width: '33.33%' }} />

          <input
            className="form-control"
            name="locationQuery"
            value={locationQuery}
            onChange={this.logChange}
            autoComplete="off"
            placeholder="Location"
            style={{ width: '33.33%' }} />

          <input
            className="form-control"
            name="categoryQuery"
            value={categoryQuery}
            onChange={this.logChange}
            autoComplete="off"
            placeholder="Category"
            style={{ width: '33.33%' }} />

          <span className="input-group-btn">
            <button className="btn btn-default" onClick={this.redirect} />
          </span>
        </div>
        {fireRedirect && (<Redirect to={{
          pathname: '/search',
          state: { nameQuery, locationQuery, categoryQuery }
        }} />)}
      </form>
    );
  }
}

export default SearchForm;

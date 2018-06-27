import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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
    this.state = {
      query: '',
      fireRedirect: false
    };

    this.redirect = this.redirect.bind(this);
  }

  redirect() {
    this.setState({
      fireRedirect: true
    });
  }

  /**
   * @return {jsx} html to be rendered
   */
  render() {
    const { fireRedirect } = this.state;
    return (
      <form>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            name="query" size="60"
            onClick={this.redirect}
            value={this.state.query}
            autoComplete="off"
            placeholder="Business Name, location or category"/>
          <span className="input-group-btn">
            <button className="btn btn-default" onClick={this.redirect} />
          </span>
        </div>
        { fireRedirect && (<Redirect to="/search" />) }
      </form>
    );
  }
}

export default SearchForm;

import React, { Component } from 'react';
import request from 'superagent';
import { BASE_URL } from '../utils/url.js';
import { Redirect, Link } from 'react-router-dom';
import './css/Businesses.css';

class NewBusiness extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      bio: '',
      category: '',
      location: '',
      logo: '',
      isLoading: false,
      fireRedirect: false,
      errors: {},
      lists: ['Staffing', 'Techology', 'Energy', 'Manufacturing']
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.logChange = this.logChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ errors: {}, isLoading: true });

    let data = {
      name: this.state.name,
      bio: this.state.bio,
      category: this.state.category,
      location: this.state.location,
      logo: this.state.logo
    };

    let url = `${BASE_URL}/api/v2/businesses/`;
    let token = window.localStorage.getItem('token');

    request
      .post(url)
      .type('application/json')
      .set({'x-access-token': token})
      .send({
        name: data.name,
        bio: data.bio,
        category: data.category,
        location: data.location,
        logo: data.logo
      })
      .then((res) => {
        this.setState({ fireRedirect: true });
      })
      .catch((err) => {
        this.setState({ errors: err, isLoading: false });
      });
  }

  logChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const options = this.state.lists.map((item) =>
      <option value={item} key={item}>{item}</option>
    );
    const fireRedirect = this.state.fireRedirect;
    return(
      <div className="container push-profile">
        <div className="row bucket">
          <div className="col-lg-3">
            <ul className="list-group">
              <li className="list-group-item">
                <Link to="/">My Profile</Link>
              </li>
              <li className="list-group-item">
                <Link to="/">All Business</Link>
              </li>
              <li className="list-group-item">
                <Link to="/">Filter businesses</Link>
              </li>
              <li className="list-group-item">
                <Link to="/">Show business</Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-9">
            <h1>Register new business</h1>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Business Name</label>
                <input
                  className="form-control"
                  autoFocus="autofocus"
                  name="name"
                  value={this.state.name}
                  onChange={this.logChange} />
              </div>
              <div className="form-group">
                <label htmlFor="location">Business Location</label>
                <input
                  className="form-control"
                  name="location"
                  type="text"
                  value={this.state.location}
                  onChange={this.logChange} />
              </div>
              <div className="form-group">
                <label htmlFor="logo">Business Logo</label>
                <input
                  className="form-control"
                  name="logo"
                  type="text"
                  value={this.state.logo}
                  onChange={this.logChange} />
              </div>
              <div className="form-group">
                <label htmlFor="category_list">Category</label>
                <select
                  className="form-control"
                  name="category"
                  onChange={this.logChange}>
                    {options}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="bio">About business</label>
                <textarea
                  className="form-control"
                  cols="50"
                  rows="6"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.logChange} />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary">
                  <i className="fa fa-btn fa-save"></i> Save
                  { this.state.isLoading && <i className="fa fa-spinner fa-spin" /> }
                </button>
              </div>
            </form>
            { fireRedirect && (<Redirect to="/" />) }
          </div>
        </div>
      </div>

    );
  }
}

export default NewBusiness;

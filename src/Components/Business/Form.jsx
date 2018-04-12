import React, { Component } from 'react';
import request from 'superagent';
import { BASE_URL } from '../../utils/url.js';
import { Redirect } from 'react-router-dom';
import './css/Businesses.css';
import PropTypes from 'prop-types';

class Form extends Component {
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
    this.getBusiness = this.getBusiness.bind(this);
    this.postForm = this.postForm.bind(this);
    this.putForm = this.putForm.bind(this);
  }

  componentDidMount() {
    this.getBusiness();
  }

  getBusiness() {
    let paramId = this.props.paramId;
    let url = `${BASE_URL}/api/v2/businesses/${paramId}`;
    request
      .get(url)
      .set('Content-Type', 'application/json')
      .then((res) => {
        if(res.status === 200) {
          this.setState({
            name: res.body.business.name,
            bio: res.body.business.bio,
            category: res.body.business.category,
            location: res.body.business.location,
            logo: res.body.business.logo
          });
        }
      })
      .catch((err) => {
        this.setState({ errors: err, isLoading: false });
      });

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

    let token = sessionStorage.getItem('token');

    if(this.props.paramId) {
      let url = `${BASE_URL}/api/v2/businesses/${this.props.paramId}`;
      this.putForm(data, url, token);
    }
    else {
      let url = `${BASE_URL}/api/v2/businesses/`;
      this.postForm(data, url, token);
    }
  }

  postForm(data, url, token) {
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

  putForm(data, url, token) {
    request
      .put(url)
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
        { fireRedirect && (<Redirect to="/" />) }
      </form>
    );
  }
}

Form.defaultProps = {
  paramId: ''
};

Form.propTypes = {
  paramId: PropTypes.string
};

export default Form;

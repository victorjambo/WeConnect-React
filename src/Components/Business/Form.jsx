import React, { Component } from 'react';
import request from 'superagent';
import { BASE_URL } from '../../utils/url.js';
import { Redirect } from 'react-router-dom';
import './css/Businesses.css';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { Image } from 'cloudinary-react';

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
      file: null,
      preview: null,
      lists: ['Staffing', 'Techology', 'Energy', 'Manufacturing']
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.logChange = this.logChange.bind(this);
    this.getBusiness = this.getBusiness.bind(this);
    this.postForm = this.postForm.bind(this);
    this.putForm = this.putForm.bind(this);
    this.onDrop = this.onDrop.bind(this);
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

  async handleSubmit(e) {
    e.preventDefault();
    this.setState({ errors: {}, isLoading: true });
    
    const { file } = this.state;
    
    await request
      .post('https://api.cloudinary.com/v1_1/dhic9kypo/image/upload')
      .attach("file", file)
      .field("upload_preset", "zwl9qrsr")
      .field("api_key", "231513992291381")
      .field("timestamp", (Date.now() / 1000) | 0)
      .then(res => { 
        this.setState({ logo: res.body.public_id }); 
      })
      .catch(err => { console.log(err); });

    let data = {
      name: this.state.name,
      bio: this.state.bio,
      category: this.state.category,
      location: this.state.location,
      logo: this.state.logo
    };

    let token = window.sessionStorage.getItem('token');

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
  
  async onDrop(files) {
    const { preview } = files[0];
    this.setState({ file: files[0], preview: preview });
    console.log(files[0]);
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
      <div className="row">
        <div className="col-lg-9">
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
        </div>
        
        <div className="col-lg-3">
          <Dropzone onDrop={this.onDrop}>
            <p className="text-center">Drop image here<br /> or <br />click to select files to upload.</p>
          </Dropzone>
          <br /><br /><br />
          { this.state.preview && <div><h5>Preview</h5><img className="img-responsive shadow" src={this.state.preview} alt="preview" /></div> }
          <hr />
          { this.state.logo && <Image cloudName="dhic9kypo" className="img-responsive shadow" publicId={this.state.logo} /> }
        </div>
        
      </div>
      
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

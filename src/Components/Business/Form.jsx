import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import './css/Businesses.css';
import validateInput from '../../helpers/validations';
import notify from '../../helpers/notify';
import Warning from '../../common/ElementComponents/Warning';
import Textarea from '../../common/ElementComponents/Textarea';
import ButtonAuth from '../../common/ElementComponents/ButtonAuth';
import DropzoneContainer from '../../common/ElementComponents/DropzoneContainer';
import Input from '../../common/ElementComponents/Input';
import { uploadImage } from '../../helpers/request';
import requestAgent from '../../helpers/superagent';


/**
 * Component to handle Forgotten Password
 * Resets Password and sends new password
 */
class Form extends Component {
  /**
   * @param {object} props
   */
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
      serverErrors: {},
      file: null,
      preview: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.logChange = this.logChange.bind(this);
    this.getBusiness = this.getBusiness.bind(this);
    this.postForm = this.postForm.bind(this);
    this.putForm = this.putForm.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  /** @returns {func} get business */
  componentDidMount() {
    const { paramId } = this.props;
    if (paramId) {
      this.getBusiness(paramId);
    }
  }

  /** @param {string} paramId
   * @returns {obj} state
   */
  getBusiness(paramId) {
    const url = "/api/v2/businesses/";

    requestAgent.get(url + paramId)
      .set('Content-Type', 'application/json')
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            name: res.body.business.name,
            bio: res.body.business.bio,
            category: res.body.business.category,
            location: res.body.business.location,
            logo: res.body.business.logo
          });
        } else {
          this.setState({ errors: res.response.body, isLoading: false });
        }
      })
      .catch((err) => {
        this.setState({ errors: err, isLoading: false });
      });
  }

  /**
   * @returns {bool} true
   */
  isValid() {
    const { name, bio, location } = this.state;
    const { errors, isValid } = validateInput({ name, bio, location });

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  /**
   * @param {object} e
   * @returns {object} setState
   */
  async handleSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });

      const token = window.sessionStorage.getItem('token');

      const { file } = this.state;
      const { paramId } = this.props;

      if (file) {
        await uploadImage(file)
          .then(res => {
            this.setState({ logo: res.body.public_id });
            notify('info', 'Image Uploaded');
          })
          .catch(err => {
            notify('error', `Image Upload Error: ${err.response.body.error.message}`);
          });
      }

      const {
        name, bio, category, location, logo
      } = this.state;
      const data = {
        name, bio, category, location, logo
      };

      if (paramId) {
        this.putForm("/api/v2/businesses/", token, data);
      } else {
        this.postForm("/api/v2/businesses/", token, data);
      }
    }
  }

  /**
   * @param {string} url
   * @param {string} token
   * @param {string} data
   * @returns {obj} state
   */
  async postForm(url, token, data) {
    requestAgent.post(url)
      .set('Content-Type', 'application/json')
      .send(data)
      .set({ 'x-access-token': token })
      .then((res) => {
        if (res.status === 201) {
          this.setState({ fireRedirect: true });
          notify('success', res.body.success);
        } else {
          this.setState({ errors: res.body.success, isLoading: false });
        }
      })
      .catch((err) => {
        notify('warning', err.response.body.warning);
        this.setState({ isLoading: false, serverErrors: err.response.body });
      });
  }

  /**
   * @param {string} url
   * @param {string} token
   * @param {string} data
   * @returns {obj} state
   */
  async putForm(url, token, data) {
    requestAgent.put(url + this.props.paramId)
      .type('application/json')
      .set({ 'x-access-token': token })
      .send(data)
      .then((res) => {
        if (res.status === 201) {
          notify('success', res.body.success);
          this.setState({
            fireRedirect: true
          });
        } else {
          this.setState({
            isLoading: false, errors: res.body.success
          });
        }
      })
      .catch((err) => {
        this.setState({ serverErrors: err.response.body, isLoading: false });
        notify('warning', err.response.body.warning);
      });
  }

  /**
   * @param {string} files
   * @returns {obj} state
   */
  async onDrop(files) {
    const { preview } = files[0];
    this.setState({ file: files[0], preview: preview });
  }

  /**
   * @param {object} e event
   * @returns {object} setState
   */
  logChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  /**
   * @return {string} jsx
   */
  render() {
    const { fireRedirect } = this.state;
    return (
      <div className="row">
        <div className="col-lg-9">
          <form onSubmit={this.handleSubmit}>

            <Warning warning={this.state.serverErrors.warning} classname="form" />

            <Input label classname="form-group"
              autoFocus="autofocus" name="name"
              value={this.state.name} onChange={this.logChange}
              placeholder="Business Name"
              error={this.state.errors.name}/>

            <Input name="location"
              onChange={this.logChange}
              classname="form-group"
              value={this.state.location}
              placeholder="Business Location" label
              error={this.state.errors.location}/>

            <Input placeholder="Business Category"
              label name="category"
              error={this.state.errors.category}
              value={this.state.category}
              onChange={this.logChange}
              classname="form-group" />

            <Textarea name="bio"
              value={this.state.bio}
              onChange={this.logChange}
              placeholder="About business"
              classname="bio"
              error={this.state.errors.bio}/>

            <div className="form-group">
              <ButtonAuth disabled={this.state.isLoading} label="Save" classname="btn btn-primary"/>
            </div>
            { fireRedirect && (<Redirect to="/" />) }
          </form>
        </div>

        <DropzoneContainer onDrop={this.onDrop} preview={this.state.preview} logo={this.state.logo} />

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

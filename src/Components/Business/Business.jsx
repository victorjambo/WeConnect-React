import React, { Component } from 'react';
import decode from 'jwt-decode';
import request from 'superagent';
import { BASE_URL } from '../../helpers/url';
import { Redirect } from 'react-router-dom';
import './css/Business.css';
import PageNotFound from '../../Components/PageNotFound/PageNotFound';
import { DotLoader } from 'react-spinners';
import { Image } from 'cloudinary-react';
import cloudinary from 'cloudinary-core';
import { notify } from '../../helpers/notify';
import Reviews from '../Reviews/Reviews';
import NewReview from '../Reviews/NewReview';
import { Buttons, Overview, About } from '../../common/ElementComponents/Business';
import { getRequest } from '../../helpers/request';
import Auth from '../Auth/Auth';

const cloudinaryCore = new cloudinary.Cloudinary({ cloud_name: 'dhic9kypo' });

/**
 * Class Business
 */
class Business extends Component {
  
  /**
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      business: {},
      fireRedirect: false,
      errors: {},
      isLoading: false,
      found: true,
      isDeleting: false,
      isCurrentUser: false
    };

    this.deleteBusiness = this.deleteBusiness.bind(this);
    this.paramId = this.props.match.params.id;
    this.createBackgroundImage = this.createBackgroundImage.bind(this);
  }

  /**
   * function to create background url with cloudinary
   * @param {string} publicId as image id
   * @returns {string} url
   */
  createBackgroundImage(publicId) {
    return cloudinaryCore.url(publicId);
  }

  /**
   * @returns {func} get single business
   */
  componentDidMount() {
    this.getBusiness();
  }

  /**
   * @returns {obj} single business
   */
  getBusiness = async () => {
    this.setState({ isLoading: true });
    const paramId = this.props.match.params.id;
    const url = `${BASE_URL}/api/v2/businesses/${paramId}`;
    await request
      .get(url)
      .set('Content-Type', 'application/json')
      .then((response) => {
        this.setState({ isLoading: false });
        if (response.status === 200 && this.refs.refBusiness) {
          this.setState({
            business: response.body.business
          });
          this.currentUser();
        }
        if (response.status === 404) {
          this.setState({ errors: response.response.body, isLoading: false });
        }
      })
      .catch((err) => {
        this.setState({ isLoading: false });
        if (err.status === 404) {
          this.setState({ found: false });
        }
        this.setState({ errors: err.response.body, isLoading: false });
      });
  }

  /**
   * @param {object} e as event
   * @returns {del} deleted business
   */
  deleteBusiness(e) {
    e.preventDefault();

    this.setState({ isDeleting: true });

    const url = `${BASE_URL}/api/v2/businesses/${this.paramId}`;
    const token = window.sessionStorage.getItem('token');

    if (window.confirm('Are you sure you wish to delete this business?')) {
      request
        .del(url)
        .type('application/json')
        .set({ 'x-access-token': token })
        .end((err, res) => {
          if (res.status === 200) {
            this.setState({ fireRedirect: true });
            notify('success', res.body.success);
          }
          else {
            this.setState({ errors: err.response.body, isDeleting: false });
          }
        });
    }
  }

  /**
   * @returns {object} current user
   */
  currentUser = async () => {
    if (Auth.isAuthenticated) {
      const token = window.sessionStorage.getItem('token');
      const { id } = decode(token);
      const url = `${BASE_URL}/api/v2/users/${id}`;
      const { business } = this.state;
      await getRequest(url).then((res) => {
        if (res.body.user.username === business.owner) {
          this.setState({ isCurrentUser: true });
        }
      });
    }
  }

  /**
   * @return {string} jsx
   */
  render() {
    const { business, fireRedirect, isLoading, found, errors, isDeleting, isCurrentUser } = this.state;
    if (isLoading) { return (<DotLoader color={'#123abc'} />); }
    if (!found) { return (<PageNotFound />); }
    return (
      <div className="business">
        <div className="business-header" style={{ backgroundImage: `url(${cloudinaryCore.url(business.logo)})` }} />
        <div className="container push-up-profile" ref="refBusiness">
          <div className="row">
            <div className="col-xs-12">
              <div className="col-md-4 col-sm-6 col-xs-12">
                <div className="float-left">
                  <Image cloudName="dhic9kypo" className="img-responsive shadow" publicId={business.logo} />
                </div>
                <Buttons paramId={this.paramId} isDeleting={isDeleting} deleteBusiness={this.deleteBusiness} error={errors.warning} isCurrentUser={isCurrentUser}/>
              </div>
              <div className="col-md-8 col-sm-6 col-xs-12">
                <Overview business={business}/>
                <About business={business}/>
                <Reviews />
                <NewReview />
              </div>
            </div>
          </div> { fireRedirect && (<Redirect to="/" />) }
        </div>
      </div>);
  }
}

export default Business;

import React, { Component } from 'react';
import decode from 'jwt-decode';
import { confirmAlert } from 'react-confirm-alert';
import { DotLoader } from 'react-spinners';
import PropTypes from 'prop-types';
import { Image } from 'cloudinary-react';
import { Redirect } from 'react-router-dom';
import cloudinaryCore from '../../helpers/cloudinary';
import './css/Business.css';
import './css/social.css';
import PageNotFound from "../PageNotFound/PageNotFound";
import notify from '../../helpers/notify';
import Reviews from '../Reviews/Reviews';
import { Buttons, Overview, About } from '../../common/ElementComponents/Business';
import requestAgent from '../../helpers/superagent';
import Auth from '../../helpers/Auth';
import 'react-confirm-alert/src/react-confirm-alert.css';

/**
 * This component handles a single busines
 * renders that single business
 */
class Business extends Component {
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
    this.submit = this.submit.bind(this);
    this.createBackgroundImage = this.createBackgroundImage.bind(this);
  }

  /**
   * calls fetch single business method
   * @returns {func} get single business
   */
  componentDidMount() {
    this.getBusiness();
  }

  createBackgroundImage = (publicId) => cloudinaryCore.url(publicId)

  /**
   * makes API request to fetch a single business
   * @returns {obj} single business
   */
  getBusiness = async () => {
    this.setState({ isLoading: true });
    const paramId = this.props.match.params.id;
    const url = "/businesses/";
    requestAgent.get(url + paramId)
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
      });
  }

  /**
   * Given a business ID
   * this method makes api request to delete that business
   * this methos is called on click delete button
   * @param {object} e as event
   * @returns {del} deleted business
   */
  deleteBusiness() {
    this.setState({ isDeleting: true });

    const url = "/businesses/";
    const token = window.sessionStorage.getItem('token');

    requestAgent.del(process.env.REACT_APP_BASE_URL + url + this.paramId)
      .type('application/json')
      .set({ 'x-access-token': token })
      .then((res) => {
        if (res.status === 200) {
          this.setState({ fireRedirect: true });
          notify('success', res.body.success);
        }
      })
      .catch((err) => {
        this.setState({ errors: { warning: err.response.body }, isDeleting: false });
      });
  }

  /**
   * this is a dialog box before delete of a business
   */
  submit = (e) => {
    e.preventDefault();
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.deleteBusiness()
        },
        {
          label: 'No',
          onClick: this.setState({ isDeleting: false })
        }
      ]
    });
  };

  /**
   * @returns {object} current user
   * checks if the business belongs to the user
   */
  currentUser = async () => {
    if (Auth.isAuthenticated) {
      const token = window.sessionStorage.getItem('token');
      const { id } = decode(token);
      const url = "/users/";
      const { business } = this.state;
      requestAgent.get(url + id)
        .then((res) => {
          if (res.body.user.username === business.owner) {
            this.setState({ isCurrentUser: true });
          }
        });
    }
  }

  /**
   * @return {string} jsx rendered templatex
   */
  render() {
    const {
      business, fireRedirect, isLoading, found, errors, isDeleting, isCurrentUser
    } = this.state;
    if (isLoading) { return (<DotLoader color={'#123abc'} />); }
    if (!found) { return (<PageNotFound />); }
    const { match, location } = this.props;
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
                <Buttons paramId={this.paramId}
                  isDeleting={isDeleting}
                  deleteBusiness={this.submit}
                  error={errors.warning}
                  isCurrentUser={isCurrentUser}/>
              </div>
              <div className="col-md-8 col-sm-6 col-xs-12">
                <Overview business={business}/>
                <About business={business}/>
                {this.refs.refBusiness && <Reviews businessId={match.params.id} path={location.pathname} />}
              </div>
            </div>
          </div> { fireRedirect && (<Redirect to="/" />) }
        </div>
        <div className="social-buttons">
          <a
            target="_blank"
            href={`http://www.facebook.com/sharer/sharer.php?u=https://weconnect-react.herokuapp.com/business/${business.id}`}
            className="fai fa fa-facebook">
            <span style={{display:'none'}}/>
          </a>
          <a
            target="_blank"
            href={`https://twitter.com/intent/tweet?text=Read%20more%20about${business.name}%20at%20https://weconnect-react.herokuapp.com/business/${business.id}`}
            className="fai fa fa-twitter">
            <span style={{display:'none'}}/>
          </a>
          <a
            target="_blank"
            href={`https://plus.google.com/share?url=https://weconnect-react.herokuapp.com/business/${business.id}`}
            className="fai fa fa-google">
            <span style={{display:'none'}}/>
          </a>
        </div>
      </div>);
  }
}

Business.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object
};

export default Business;

import React from 'react';
import request from 'superagent';
import decode from 'jwt-decode';
import notify from '../../helpers/notify';
import BASE_URL from '../../helpers/url';
import NewReview from './NewReview';
import Review from './Review';
import validateInput from '../../helpers/validations';
import LoginFirst from '../Auth/LoginFirst';
import Auth from '../../helpers/Auth';
import './Reviews.css';

/**
 * register new user
 */
class Reviews extends React.Component {
  /**
   * constructor that takes
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      title: '',
      desc: '',
      errors: {},
      serverErrors: {},
      isLoading: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.logChange = this.logChange.bind(this);
    this.currentUser = this.currentUser.bind(this);
  }

  /**
   * @returns {func} get business
   */
  componentDidMount() {
    this.getReviews();
  }

  /**
   * @returns {bool} true
   */
  isValid() {
    const { title, desc } = this.state;
    const { errors, isValid } = validateInput({ title, desc });

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  /**
   * @returns {obj} all businesses
   */
  getReviews = () => {
    this.setState({ isLoading: true });
    const url = `${BASE_URL}/api/v2/businesses/${this.props.businessId}/reviews`;
    request
      .get(url)
      .set('Content-Type', 'application/json')
      .then((response) => {
        if (response.status === 200 && this.refs.reviewRef) {
          this.setState({
            reviews: response.body.reviews,
            isLoading: false
          });
        }
      })
      .catch((err) => {
        this.setState({ errors: err, isLoading: false });
      });
  }

  /**
   * @param {object} e
   * @returns {object} setState
   */
  handleSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ isLoading: true });
      const { title, desc, reviews } = this.state;
      const token = window.sessionStorage.getItem('token');
      const url = `${BASE_URL}/api/v2/businesses/${this.props.businessId}/reviews`;
      request
        .post(url)
        .set({ 'x-access-token': token })
        .send({ title, desc })
        .then((res) => {
          if (res.status === 201) {
            reviews.push(res.body.review);
            this.setState({
              isLoading: false,
              title: '',
              desc: '',
              reviews: reviews
            });
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
   * @param {string} currentname
   * @returns {bool} current user
   */
  currentUser = (currentname) => {
    let response = false;
    if (Auth.isAuthenticated) {
      const token = window.sessionStorage.getItem('token');
      const { username } = decode(token);
      if (username === currentname) {
        response = true;
      }
    }
    return response;
  }

  /**
   * @param {number} reviewId
   * @returns {state} deleted
  */
  deleteReview = (reviewId) => {
    const { businessId } = this.props;
    const { reviews } = this.state;

    const url = `${BASE_URL}/api/v2/businesses/${businessId}/reviews/${reviewId}`;
    const token = window.sessionStorage.getItem('token');

    const found = reviews.find((element) => element.id === reviewId);

    if (window.confirm('Confirm to delete review')) {
      request
        .del(url)
        .type('application/json')
        .set({ 'x-access-token': token })
        .end((err, res) => {
          if (res.status === 200) {
            const index = reviews.indexOf(found);
            reviews.splice(index, 1);
            this.setState({ reviews: reviews });
            notify('success', res.body.success);
          } else {
            this.setState({ errors: err.response.body });
          }
        });
    }
  }

  /**
   * @return {jsx} html to be rendered
   */
  render() {
    const {
      reviews, title, desc, errors, isLoading
    } = this.state;
    const { businessId } = this.props;
    const review = reviews.map((_review) => (
      <Review review={_review}
        key={_review.id}
        deleteReview={this.deleteReview}
        currentUser={this.currentUser} />
    ));
    return (
      <div>
        <div className="reviews bucket" ref="reviewRef" style={{ display: reviews.length === 0 ? 'none' : 'block' }}>
          <h2>Reviews</h2>
          <hr />
          {review}
        </div>
        {
          Auth.isAuthenticated ? (
            <NewReview businessId={businessId}
              logChange={this.logChange}
              handleSubmit={this.handleSubmit}
              title={title} desc={desc}
              errors={errors} isLoading={isLoading} />
          ) : (<LoginFirst businessId={businessId} />)
        }
      </div>
    );
  }
}

export default Reviews;

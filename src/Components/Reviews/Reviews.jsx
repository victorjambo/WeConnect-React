import React from 'react';
import request from 'superagent';
import notify from '../../helpers/notify.js';
import BASE_URL from '../../helpers/url.js';
import NewReview from './NewReview.jsx';
import validateInput from '../../helpers/validations.js';
import LoginFirst from '../Auth/LoginFirst.jsx';
import Auth from '../../helpers/Auth.js';
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
    this.setState({ isLoading: true});
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
      this.setState({ isLoading: true});
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
              isLoading: false, title: '', desc: '',
              reviews: reviews
            });
            notify('success', res.body.success);
          }
          else {
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
   * @return {jsx} html to be rendered
   */
  render() {
    const { reviews, title, desc, errors, isLoading } = this.state;
    const { businessId } = this.props;
    const review = reviews.map((_review) =>
      <div className="fade-in" key={_review.id} >
        <div className="review">
          <h3 className="title">{_review.title}</h3>
          <div className="review-body">{_review.desc}</div>
        </div>
        <hr />
      </div>
    );
    return (
      <div>
        <div className="reviews bucket" ref="reviewRef">
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

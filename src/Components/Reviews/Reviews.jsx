import React from 'react';
import request from 'superagent';
import BASE_URL from '../../helpers/url.js';

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
      isLoading: false
    };
  }
  
  /**
   * @returns {func} get business
   */
  componentDidMount() {
    this.getReviews();
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
   * @return {jsx} html to be rendered
   */
  render() {
    const { reviews } = this.state;
    const review = reviews.map((_review) =>
      <div className="review" key={_review.id}>
        <h3 className="title">{_review.title}</h3>
        <div className="review-body">{_review.desc}</div>
      </div>
    );
    return (
      <div className="reviews bucket" ref="reviewRef">
        <h2>Reviews</h2>
        <hr />
        {review}
      </div>
    );
  }
}

export default Reviews;

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Renders single review item
 * @param {*} props
 * @return {*} html elements
 */
const Review = ({ review, deleteReview, currentUser }) => (
  <div className="fade-in" id={`review-${review.id}`}>
    { currentUser(review.reviewer) &&
        <span className="closebtn" onClick={() => deleteReview(review.id)}>
          &times;
        </span>
    }
    <div className="review">
      <h3 className="title">{review.title}</h3>
      <div className="review-body">{review.desc}</div>
    </div>
    <hr />
  </div>
);

Review.propTypes = {
  review: PropTypes.object.isRequired,
  deleteReview: PropTypes.func,
  currentUser: PropTypes.func
};

Review.defaultProps = {
  review: {}
};

export default Review;

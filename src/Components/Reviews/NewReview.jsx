import React from 'react';

const NewReview = () => (
  <div className="add-review bucket">
     <h2>Give us feedback</h2>
     <div className="review-body">
        <form action="" method="post">
           <div className="form-group">
              <label htmlFor="description">About business</label>
              <textarea className="form-control" cols="50" rows="6"></textarea>
           </div>
           <div className="form-group">
              <button type="submit" className="btn btn-primary">
                <i className="fa fa-btn fa-pencil"></i> Submit
              </button>
           </div>
        </form>
     </div>
  </div>
);

export default NewReview;

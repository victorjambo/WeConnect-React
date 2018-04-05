import React, { Component } from 'react';
import request from 'superagent';
import { BASE_URL } from '../utils/url.js';
import './css/Businesses.css';

class Business extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    return(
      <div className="container push-profile">
         <div className="row">
            <div className="col-xs-12">
               <div className="col-md-4 col-sm-6 col-xs-12 ">
                  <div className="float-left">
                     <img src="https://victorjambo.github.io/WeConnect/designs/UI/assets/images/coffee.jpg" alt="" className="img-responsive shadow" />
                  </div>
                  <div className="push">
                     <a href="./editbusiness.html" className="btn btn-warning">Edit</a>
                     <a href="./editbusiness.html" className="btn btn-danger">Delete Business</a>
                  </div>
               </div>
               <div className="col-md-8 col-sm-6 col-xs-12">
                  <div className="overview bucket">
                     <h2>Overview</h2>
                     <div className="overview-info">
                        <label>Location: </label>
                        <span className="value">Nairobi, Kenya</span>
                     </div>
                     <div className="overview-info">
                        <label>Category: </label>
                        <span className="value">Telecommunication</span>
                     </div>
                     <div className="overview-info">
                        <label>Business website: </label>
                        <span className="value">www.safcom.com</span>
                     </div>
                  </div>
                  <div className="about bucket">
                     <h2>About Safaricom</h2>
                     <div className="about-txt">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus nulla nesciunt, dignissimos, repudiandae consequuntur eius quod. Quam delectus, totam distinctio, nam officiis eius sit, maiores modi sunt laboriosam rem dignissimos.</p>
                     </div>
                  </div>
                  <div className="reviews bucket">
                     <h2>Reviews</h2>
                     <hr />
                     <div className="review">
                        <h3 className="title">Awesome services</h3>
                        <div className="review-body">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum repellendus, praesentium voluptatum impedit, quam temporibus dolorem, beatae maxime quia debitis porro soluta? Fugiat illo quas asperiores eos, perferendis. Veritatis, expedita.</div>
                     </div>
                     <hr />
                     <div className="review">
                        <h3 className="title">Slow internet</h3>
                        <div className="review-body">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum repellendus, praesentium voluptatum impedit, quam temporibus dolorem, beatae maxime quia debitis porro soluta? Fugiat illo quas asperiores eos, perferendis. Veritatis, expedita.</div>
                     </div>
                     <hr />
                     <div className="review">
                        <h3 className="title">M-Pesa services</h3>
                        <div className="review-body">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum repellendus, praesentium voluptatum impedit, quam temporibus dolorem, beatae maxime quia debitis porro soluta? Fugiat illo quas asperiores eos, perferendis. Veritatis, expedita.</div>
                     </div>
                  </div>
                  <div className="add-review bucket">
                     <h2>Give us feedback</h2>
                     <div className="review-body">
                        <form action="" method="post">
                           <div className="form-group">
                              <label for="description">About business</label>
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
               </div>
            </div>
         </div>
      </div>
    );
  }
}

export default Business;
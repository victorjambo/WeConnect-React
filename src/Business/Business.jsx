import React, { Component } from 'react';
import request from 'superagent';
import { BASE_URL } from '../utils/url.js';
import { Link } from 'react-router-dom';
import './css/Businesses.css';

class Business extends Component {
  constructor(props) {
    super(props);
    this.state = {
      business: {}
    };
  }

  componentDidMount() {
    this.getBusiness();
  }

  async getBusiness() {
    let paramId = this.props.match.params.id;
    let url = `${BASE_URL}/api/v2/businesses/${paramId}`;
    await request
      .get(url)
      .set('Content-Type', 'application/json')
      .then((response) => {
        if(response.status === 200 && this.refs.refBusiness) {
          this.setState({
            business: response.body.business
          });
        }
      });
  }

  render() {
    const business = this.state.business;
    return(
      <div className="container push-profile" ref="refBusiness">
         <div className="row">
            <div className="col-xs-12">
               <div className="col-md-4 col-sm-6 col-xs-12 ">
                  <div className="float-left">
                     <img src={business.logo} alt="" className="img-responsive shadow" />
                  </div>
                  <div className="push">
                     <Link to="/" className="btn btn-warning">Edit</Link>&nbsp;
                     <Link to="/" className="btn btn-danger">Delete Business</Link>
                  </div>
               </div>
               <div className="col-md-8 col-sm-6 col-xs-12">
                  <div className="overview bucket">
                     <h2>Overview</h2>
                       <div className="overview-info">
                          <label>Name:&nbsp;</label>
                          <span className="value">{business.name}</span>
                       </div>
                     <div className="overview-info">
                        <label>Location:&nbsp;</label>
                        <span className="value">{business.location}</span>
                     </div>
                     <div className="overview-info">
                        <label>Category:&nbsp;</label>
                        <span className="value">{business.category}</span>
                     </div>
                     <div className="overview-info">
                        <label>Business website:&nbsp;</label>
                        <span className="value">www.safcom.com</span>
                     </div>
                  </div>
                  <div className="about bucket">
                     <h2>About {business.name}</h2>
                     <div className="about-txt">
                        <p>{business.bio}</p>
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
               </div>
            </div>
         </div>
      </div>
    );
  }
}

export default Business;

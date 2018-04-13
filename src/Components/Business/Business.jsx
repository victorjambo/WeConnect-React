import React, { Component } from 'react';
import request from 'superagent';
import { BASE_URL } from '../../utils/url.js';
import { Link, Redirect } from 'react-router-dom';
import './css/Business.css';
import Auth from '../Auth/Auth';
import PageNotFound from '../../Components/PageNotFound/PageNotFound';
import { DotLoader } from 'react-spinners';
import { Image } from 'cloudinary-react';

class Business extends Component {
  constructor(props) {
    super(props);
    this.state = {
      business: {},
      fireRedirect: false,
      errors: {},
      isLoading: false,
      found: true
    };

    this.deleteBusiness = this.deleteBusiness.bind(this);
    this.paramId = this.props.match.params.id;
  }

  componentDidMount() {
    this.getBusiness();
  }

  async getBusiness() {
    this.setState({ isLoading: true });
    let paramId = this.props.match.params.id;
    let url = `${BASE_URL}/api/v2/businesses/${paramId}`;
    await request
      .get(url)
      .set('Content-Type', 'application/json')
      .then((response) => {
        this.setState({ isLoading: false });
        if(response.status === 200 && this.refs.refBusiness) {
          this.setState({
            business: response.body.business
          });
        }
        if(response.status === 404){
          console.log(response);
        }
      })
      .catch(err => {
        this.setState({ isLoading: false });
        if(err.status === 404) {
          this.setState({ found: false });
        }
        console.log(err);
      });
  }

  deleteBusiness(e) {
    e.preventDefault();

    this.setState({ isLoading: true });

    let url = `${BASE_URL}/api/v2/businesses/${this.paramId}`;
    let token = window.sessionStorage.getItem('token');

    request
      .del(url)
      .type('application/json')
      .set({'x-access-token': token})
      .end((err, res) => {
        if(res.status === 200) {
          console.log(res);
          this.setState({ fireRedirect: true });
        }
        else {
          this.setState({ errors: err.response.body, isLoading: false });
        }
      });
  }

  render() {
    const business = this.state.business;
    const fireRedirect = this.state.fireRedirect;
    if(this.state.isLoading) {
      return(
        <DotLoader
          color={'#123abc'} 
          loading={this.state.loading}
        />
      );
    }
    if(this.state.found) {
      return(
        <div className="container push-profile" ref="refBusiness">
           <div className="row">
              <div className="col-xs-12">
                 <div className="col-md-4 col-sm-6 col-xs-12 ">
                    <div className="float-left">
                      <Image cloudName="dhic9kypo" className="img-responsive shadow" publicId={business.logo} />
                    </div>
                    <div className="push">
                      { Auth.isAuthenticated && <Link to={`/business/${this.paramId}/edit`} className="btn btn-warning">Edit</Link> }&nbsp;
                      { Auth.isAuthenticated && <button onClick={this.deleteBusiness} className="btn btn-danger">
                        Delete Business
                        { this.state.isLoading && <i className="fa fa-spinner fa-spin" /> }
                      </button> }
                      { this.state.errors.warning && <div className="alert alert-danger">{this.state.errors.warning}</div> }
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
          { fireRedirect && (<Redirect to="/" />) }
        </div>
      );
    }
    return(<PageNotFound />);
  }
}

export default Business;

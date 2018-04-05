import React, { Component } from 'react';
import request from 'superagent';
import ItemBusiness from './ItemBusiness.jsx';
import { BASE_URL } from '../utils/url.js';
import './css/Businesses.css';

class Businesses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: [],
      isLoading: false
    };
    this.getBusinesses = this.getBusinesses.bind(this);
  }
  
  componentDidMount() {
    this.getBusinesses();
  }
  
  async getBusinesses() {
    this.setState({ isLoading: true});
    var url = `${BASE_URL}/api/v2/businesses/`;
    await request
      .get(url)
      .set('Content-Type', 'application/json')
      .then((response) => {
        if(response.status === 200 && this.refs.refBusiness) {
          this.setState({
            businesses: response.body.businesses,
            isLoading: false
          });
        }
      });
  }
  
  render() {
    return(
      <div className="container">
        <div className="row bucket" ref="refBusiness">
          <h2>Business Partners</h2><br/>
          { this.state.isLoading && <h1>Loading <i className="fa fa-spinner fa-spin" /></h1>}
          {
            this.state.businesses.map((business) => {
              return(
                <ItemBusiness business={business} key={business.id}/>
              );
            })
          }

        </div>
      </div> 
    );
  }
}

export default Businesses;
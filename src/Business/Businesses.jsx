import React, { Component } from 'react';
import request from 'superagent';
import ItemBusiness from './ItemBusiness.jsx';

class Businesses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: []
    };
    this.getBusinesses = this.getBusinesses.bind(this);
  }
  
  componentWillMount() {
    this.getBusinesses();
  }
  
  getBusinesses() {
    var url = 'https://weconnect-victorjambo.c9users.io/api/v2/businesses/';
    request
      .get(url)
      .set('Content-Type', 'application/json')
      .then((response) => {
        this.setState({
          businesses: response.body.businesses
        });
      });
  }
  
  render() {
    return(
      <div className="container">
        <div className="row bucket">
          <h2>Business Partners</h2><br/>
          {
            this.state.businesses.map((business) => {
              return(
                <ItemBusiness business={business}/>
              );
            })
          }

        </div>
      </div> 
    );
  }
}

export default Businesses;
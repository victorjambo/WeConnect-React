import React, { Component } from 'react';
import request from 'superagent';
import ItemBusiness from './ItemBusiness.jsx';
import { BASE_URL } from '../../utils/url.js';
import { SyncLoader } from 'react-spinners';
import Masonry from 'react-masonry-component';

class Businesses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: [],
      isLoading: false
    };
  }

  componentDidMount() {
    this.getBusinesses();
  }

  getBusinesses = async () => {
    this.setState({ isLoading: true});
    let url = `${BASE_URL}/api/v2/businesses/?limit=30`;
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
      })
      .catch(err => {
        this.setState({ errors: err.response.body, isLoading: false });
      });
  }

  render() {
    return(
      <div className="container">
        <div className="row bucket" ref="refBusiness">
          <h2>Business Partners</h2><br/>

          <Masonry >
            {
              this.state.businesses.map((business) => {
                return(
                  <ItemBusiness business={business} key={business.id}/>
                );
              })
            }
          </Masonry>

          {
            <div className="spinners-loader">
              <SyncLoader
                color={'#123abc'} 
                loading={this.state.isLoading}
              />
            </div>
          }

        </div>
      </div>
    );
  }
}

export default Businesses;

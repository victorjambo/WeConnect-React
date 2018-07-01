import React, { Component } from 'react';
import { SyncLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import Masonry from 'react-masonry-component';
import ItemBusiness from './ItemBusiness';
import requestAgent from '../../helpers/superagent';

/**
 * All businesses
 */
class Businesses extends Component {
  /**
   * constructor that takes
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      businesses: [],
      isLoading: false
    };
    this.mounted = false;
  }

  /**
   * @returns {func} get business
   */
  componentDidMount() {
    this.mounted = true;
    this.getBusinesses();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  /**
   * @returns {obj} all businesses
   */
  getBusinesses = async () => {
    this.setState({ isLoading: true });

    const url = "/api/v2/businesses/";

    requestAgent
      .get(url)
      .query({ limit: '30' })
      .set('Content-Type', 'application/json')
      .then((response) => {
        if (response.status === 200 && this.refs.refBusiness && this.mounted) {
          this.setState({
            businesses: response.body.businesses,
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
    const { businesses, isLoading } = this.state;
    const business = businesses.map((_business) => <ItemBusiness business={_business} key={_business.id}/>);
    return (
      <div className="container">
        <div className="row bucket" ref="refBusiness">
          <h2>Registered Businesses</h2>
          <hr className="my-4"/>

          <Masonry >
            { business }
          </Masonry>

          {
            <div className="spinners-loader">
              <SyncLoader
                color={'#123abc'}
                loading={isLoading}
              />
            </div>
          }

          {
            !isLoading &&
            <div className="no-content fade-in" style={{ display: businesses.length === 0 ? 'block' : 'none' }}>
              <p className="lead">No business registered. Follow link to register a business</p>
              <Link className="btn btn-primary btn-lg" to="/businesses/new">Register business</Link>
            </div>
          }

        </div>
      </div>
    );
  }
}

export default Businesses;

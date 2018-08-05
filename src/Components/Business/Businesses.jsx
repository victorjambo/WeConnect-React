import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SyncLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import Masonry from 'react-masonry-component';
import isEqual from 'lodash.isequal';
import JwPagination from 'jw-react-pagination';
import ItemBusiness from './ItemBusiness';
import requestAgent from '../../helpers/superagent';
import notify from '../../helpers/notify';

/**
 * Renders All businesses
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
      nameQuery: '',
      locationQuery: '',
      categoryQuery: '',
      isLoading: false,
      pageOfItems: []
    };
    this.mounted = false;
    this.onChangePage = this.onChangePage.bind(this);
  }

  /**
   * @returns {func} get business
   */
  componentDidMount() {
    this.mounted = true;
    this.getBusinesses();
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.query, nextProps.query)) {
      this.getBusinesses(nextProps.query);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  /**
   * Makes api response to API to fetch all businesses
   * @param {obj} query
   * @returns {obj} all businesses
   */
  getBusinesses = async (query = {
    nameQuery: '',
    locationQuery: '',
    categoryQuery: ''
  }) => {
    this.setState({ isLoading: true });
    const { nameQuery, locationQuery, categoryQuery } = query;
    const initialBusinessState = this.state.businesses;

    const url = "/businesses/";

    requestAgent
      .get(url)
      .query({ limit: '30' })
      .query({ q: nameQuery })
      .query({ location: locationQuery })
      .query({ category: categoryQuery })
      .set('Content-Type', 'application/json')
      .then((response) => {
        if (response.body.businesses && this.refs.refBusiness && this.mounted) {
          this.setState({
            businesses: response.body.businesses,
            isLoading: false
          });
        } else {
          notify('info', 'No business exists within search criteria');
          this.setState({ isLoading: false, businesses: initialBusinessState });
        }
      })
      .catch((err) => {
        this.setState({ errors: err, isLoading: false });
      });
  }

  /**
   * update local state with new page of items
   * @param {*} pageOfItems
   * @returns {*} pageOfItems
   */
  onChangePage(pageOfItems) {
    this.setState({ pageOfItems });
  }

  /**
   * @return {jsx} html to be rendered
   */
  render() {
    const { businesses, isLoading, pageOfItems } = this.state;
    const business = pageOfItems.map((_business) => <ItemBusiness business={_business} key={_business.id} />);
    return (
      <div className="container">
        <div className="row bucket" ref="refBusiness">
          <h2>Registered Businesses</h2>
          <hr className="my-4" />

          <Masonry >
            {business}
          </Masonry>
          <JwPagination items={businesses} onChangePage={this.onChangePage} />

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

Businesses.propTypes = {
  query: PropTypes.object
};

export default Businesses;

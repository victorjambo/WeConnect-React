import React, { Component } from 'react';
import decode from 'jwt-decode';
import { Link } from "react-router-dom";
import { SyncLoader } from 'react-spinners';
import Sidebar from '../../common/Sidebar';
import requestAgent from '../../helpers/superagent';
import Item from '../SearchResults/Item';
import '../SearchResults/css/search.css';
import Breadcrumb from '../../common/Breadcrumb';

/**
 * Businesses for current user
 */
class UserBusinesses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoading: false
    };

    this.getBusinesses = this.getBusinesses.bind(this);
  }

  componentDidMount() {
    this.getBusinesses();
  }

  /**
   * api fetch all businesses for current user
   * @returns {*} businesses
   */
  getBusinesses() {
    this.setState({ isLoading: true });

    const token = window.sessionStorage.getItem('token');
    const { id } = decode(token);

    const url = "/users/";
    const suffix = "/businesses";

    requestAgent
      .get(url + id + suffix)
      .set('Content-Type', 'application/json')
      .then((response) => {
        if (response.body && this.refs.refBusiness) {
          this.setState({
            items: response.body,
            isLoading: false
          });
        } else {
          this.setState({ isLoading: false });
        }
      })
      .catch((err) => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { items, isLoading } = this.state;
    const item = items.map((_business) => <Item business={_business} key={_business.id}/>);
    return (
      <div className="container push-profile">
        <div className="row bucket">
          <div className="col-lg-3 hidden-sm">
            <Sidebar />
          </div>
          <div className="col-lg-9">
            <Breadcrumb routename="My Businesses" />
            <h1>My Business</h1>
            {
              (items.length === 0 && !isLoading) && <span className="text-center">
                <p>Register a business first <Link to="/businesses/new">here</Link></p>
              </span>
            }
            <ul className="item-list" ref="refBusiness">
              {item}
            </ul>

            {
              <div className="spinners-loader">
                <SyncLoader
                  color={'#123abc'}
                  loading={isLoading}
                />
              </div>
            }

          </div>
        </div>
        <a className="back-btn" onClick={() => this.props.history.goBack()}><i className="fa fa-arrow-circle-o-left" /></a>
      </div>
    );
  }
}

export default UserBusinesses;

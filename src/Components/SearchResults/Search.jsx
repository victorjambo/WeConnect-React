import React from 'react';
import { SyncLoader } from 'react-spinners';
import './css/search.css';
import Item from './Item';
import FormField from './FormField';
import requestAgent from '../../helpers/superagent';
import notify from '../../helpers/notify';


class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      nameQuery: '',
      locationQuery: '',
      categoryQuery: '',
      isLoading: false
    };

    this.searchQuery = this.searchQuery.bind(this);
    this.logChange = this.logChange.bind(this);
  }

  searchQuery(e) {
    e.preventDefault();
    const { nameQuery, locationQuery, categoryQuery } = this.state;
    this.setState({ isLoading: true });
    const url = "/api/v2/businesses/";

    requestAgent
      .get(url)
      .set('Content-Type', 'application/json')
      .query({ limit: '30' })
      .query({ q: nameQuery })
      .query({ location: locationQuery })
      .query({ category: categoryQuery })
      .then((response) => {
        if (response.status === 200 && this.refs.refBusiness) {
          this.setState({
            items: response.body.businesses,
            isLoading: false
          });
        }
      })
      .catch((err) => {
        this.setState({ isLoading: false });
        notify('info', 'No business exists within search criteria');
      });
  }

  logChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const {
      items, nameQuery, isLoading, locationQuery, categoryQuery
    } = this.state;
    const item = items.map((_business) => <Item business={_business} key={_business.id}/>);

    return (
      <div className="push-search">
        <div className="container search-bar">
          <FormField
            nameQuery={nameQuery}
            locationQuery={locationQuery}
            categoryQuery={categoryQuery}
            searchQuery={this.searchQuery}
            logChange={this.logChange}/>
        </div>
        <div className="push row">
          <div className="col-xs-12 col-sm-offset-2 col-sm-8">
            <ul className="item-list" ref="refBusiness">
              { items.length > 0 && <span className="text-center">
                <i>found {items.length} matching results</i>
              </span>}
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
      </div>
    );
  }
}

export default Search;

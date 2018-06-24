import React from 'react';
import { Link } from "react-router-dom";
import request from 'superagent';
import { SyncLoader } from 'react-spinners';
import BASE_URL from '../../helpers/url';

/**
 * Class NavNotifications
 */
class NavNotifications extends React.Component {
  /**
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      notifications: [
        {
          url: '/notifications',
          act: 'No Notifications',
          id: '1'
        }
      ],
      isLoading: false,
      errors: {}
    };

    this.getNotifications = this.getNotifications.bind(this);
  }

  /**
   * @returns {func} get single business
   */
  componentDidMount() {
    this.getNotifications();
  }

  /**
   * @returns {obj} single business
   */
  getNotifications = () => {
    const url = `${BASE_URL}/api/v2/notifications`;
    const token = window.sessionStorage.getItem('token');
    request
      .get(url)
      .set({ 'x-access-token': token })
      .type('application/json')
      .then((response) => {
        this.setState({ isLoading: false });
        if (response.status === 200 && this.refs.refNotification) {
          this.setState({
            notifications: response.body.notifications
          });
        }
        if (response.status === 404) {
          this.setState({ errors: response.response.body, isLoading: false });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /**
   * @return {string} jsx
   */
  render() {
    const { notifications, isLoading } = this.state;
    const notification = notifications.map((_notification) => (<li key={_notification.id}>
      <Link to={_notification.url}>{_notification.act}</Link>
    </li>));
    return (
      <ul className="dropdown-menu" ref="refNotification">
        <div className="spinners-loader">
          <SyncLoader
            color={'#123abc'}
            loading={isLoading}
          />
        </div>
        { notification }
        <li role="separator" className="divider" />
        <li><Link to="/notifications" className="text-center" style={{ paddingBottom: 15 }}>View all >></Link></li>
      </ul>
    );
  }
}

export default NavNotifications;

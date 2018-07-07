import React from 'react';
import { SyncLoader } from 'react-spinners';
import Sidebar from '../../common/Sidebar';
import requestAgent from '../../helpers/superagent';
import NotificationItem from './NotificationItem';
import '../SearchResults/css/search.css';
import './stream.css';

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      isLoading: false
    };
    this.getNotifications = this.getNotifications.bind(this);
  }

  componentDidMount() {
    this.getNotifications();
  }

  getNotifications() {
    this.setState({ isLoading: true });
    const url = "/api/v2/notifications/all";
    const token = window.sessionStorage.getItem('token');

    requestAgent
      .get(url)
      .set({ 'x-access-token': token })
      .set('Content-Type', 'application/json')
      .then((response) => {
        if (response.body.notifications && this.refs.refNotification) {
          this.setState({
            notifications: response.body.notifications,
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
    const { notifications, isLoading } = this.state;
    const notification = notifications.map((_notification) => <NotificationItem notification={_notification} key={_notification.id}/>);
    return (
      <div className="container push-profile">
        <div className="row bucket">
          <div className="col-lg-3 hidden-sm">
            <Sidebar />
          </div>
          <div className="col-lg-9">
            <ul className="item-list" ref="refNotification">
              {
                (notifications.length === 0 && !isLoading) && <span className="text-center">
                  <p>No new notifications</p>
                </span>
              }
              <div className="ibox ">
                <div className="ibox-title">
                  <h5>Activity Stream</h5>
                </div>
                <div className="ibox-content">
                  {notification}
                </div>
              </div>
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

export default Notifications;

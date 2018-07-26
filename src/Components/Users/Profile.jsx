import React from 'react';
import decode from 'jwt-decode';
import { SyncLoader } from 'react-spinners';
import Sidebar from '../../common/Sidebar';
import requestAgent from '../../helpers/superagent';
import './Profile.css';
import ProfileOverview from '../../common/ElementComponents/ProfileOverview';

/**
 * dashboard for single user
 */
class Profile extends React.Component {
  /**
   * constructor that takes
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isLoading: false,
      errors: {}
    };
    this.mounted = false;
    this.getUser = this.getUser.bind(this);
  }

  /**
   * @returns {func} getUser
   */
  componentDidMount() {
    this.mounted = true;
    this.getUser();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  /**
   * makes api request to fetch user info
   * @returns {obj} user details
   */
  getUser = async () => {
    this.setState({ isLoading: true });

    const token = window.sessionStorage.getItem('token');
    const { id } = decode(token);
    const url = "/users/";

    requestAgent.get(url + id)
      .set('Content-Type', 'application/json')
      .then((res) => {
        if (res.status === 200 && this.refs.refUser && this.mounted) {
          this.setState({
            user: res.body.user,
            isLoading: false
          });
        }
      })
      .catch(err => {
        this.setState({ errors: err.body, isLoading: false });
      });
  }

  /**
   * @return {jsx} html to be rendered
   */
  render() {
    const { user, isLoading } = this.state;
    return (
      <div className="container push-profile">
        <div className="row bucket">
          <div className="col-lg-3 hidden-xs">
            <Sidebar />
          </div>
          <div className="col-lg-9" ref="refUser">
            {
              isLoading ? (
                <div className="spinners-loader"><SyncLoader color={'#123abc'} /></div>
              ) : (
                <ProfileOverview user={user} />
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;

import React from 'react';
import decode from 'jwt-decode';
import { SyncLoader } from 'react-spinners';
import Sidebar from '../../common/Sidebar';
import API from '../../helpers/api';
import './Profile.css';
import ProfileOverview from '../../common/ElementComponents/ProfileOverview';

/**
 * register new user
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
    this.getUser = this.getUser.bind(this);
  }

  /**
   * @returns {func} getUser
   */
  componentDidMount() {
    this.getUser();
  }

  /**
   * @returns {obj} user details
   */
  getUser = async () => {
    this.setState({ isLoading: true });

    const token = window.sessionStorage.getItem('token');
    const { id } = decode(token);
    const url = "/api/v2/users/";

    API.get(url + id)
      .then((res) => {
        if (res.status === 200 && this.refs.refUser) {
          this.setState({
            user: res.data.user,
            isLoading: false
          });
        }
      })
      .catch(err => {
        this.setState({ errors: err.response.data, isLoading: false });
      });
  }

  /**
   * @return {jsx} html to be rendered
   */
  render() {
    const { user, isLoading, activate } = this.state;
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
                <ProfileOverview user={user} activate={activate} />
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;

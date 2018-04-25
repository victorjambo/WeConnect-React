import React from 'react';
import request from 'superagent';
import decode from 'jwt-decode';
import Sidebar from '../../common/Sidebar';
import { BASE_URL } from '../../helpers/url.js';
import { SyncLoader } from 'react-spinners';
import './Profile.css';
import ProfileOverview from '../../common/ElementComponents/ProfileOverview';

class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: {},
      isLoading: false,
      errors: {}
    };
    this.getUser = this.getUser.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = async () => {
    this.setState({ isLoading: true});

    let token = window.sessionStorage.getItem('token');
    let { id } = decode(token);
    let url = `${BASE_URL}/api/v2/users/${id}`;

    await request
      .get(url)
      .set('Content-Type', 'application/json')
      .then((res) => {
        if (res.status === 200 && this.refs.refUser) {
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
  render() {
    const { user, isLoading, activate } = this.state;
    return(
      <div className="container push-profile">
        <div className="row bucket">
          <div className="col-lg-3 hidden-sm">
            <Sidebar />
          </div>
          <div className="col-lg-9"  ref="refUser">
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

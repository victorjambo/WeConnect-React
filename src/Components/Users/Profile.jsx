import React from 'react';
import request from 'superagent';
import decode from 'jwt-decode';
import Sidebar from '../../common/Sidebar';
import { BASE_URL } from '../../utils/url.js';
import { SyncLoader } from 'react-spinners';
import './Profile.css';

class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: {},
      isLoading: false
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
        if(res.status === 200 && this.refs.refUser) {
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
    const { username, fullname, activate, email } = this.state.user;
    return(
      <div className="container push-profile">
        <div className="row bucket">
          <div className="col-lg-3 hidden-sm">
            <Sidebar />
          </div>
          <div className="col-lg-9"  ref="refUser">
            {
              this.state.isLoading ? (
                <div className="spinners-loader">
                  <SyncLoader
                    color={'#123abc'}
                  />
                </div>
              ) : (
                <div>
                  {
                    activate === 'false' && 
                    <div class="alert alert-warning" role="alert">
                      <b>Check your email to activate your account!!!</b>
                    </div>
                  }
                  <h2>{fullname}'s profile</h2>
                  <div className="overview-info">
                    <label>username:&nbsp;</label>
                    <span className="value">{username}</span>
                  </div>

                  <div className="overview-info">
                    <label>full names:&nbsp;</label>
                    <span className="value">{fullname}</span>
                  </div>

                  <div className="overview-info">
                    <label>email:&nbsp;</label>
                    <span className="value">{email}</span>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
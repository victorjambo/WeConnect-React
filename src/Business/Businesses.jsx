import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import request from 'superagent';

class Businesses extends Component {
  render() {
    return(
      <div className="container">
        <div className="row bucket">
          <h2>Business Partners</h2><br/>
          <div className="col-lg-4 col-md-4 col-sm-6">
            <div className="my-box bg-white">
              <Link to="/">
                <img className="img-responsive shadow" src="/images/marvel.jpg" alt="coffee"/>
              </Link>
              <div className="cell-body">
                <h2>Marvel</h2>
                <Link className="btn btn-default" to="/">View Profile</Link>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6">
            <div className="my-box bg-white">
              <Link to="/">
                <img className="img-responsive shadow" src="/images/coffee.jpg" alt="coffee" />
              </Link>
              <div className="cell-body">
                <h2>Coffee Bar</h2>
                <Link className="btn btn-default" to="/">View Profile</Link>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6">
            <div className="my-box bg-white">
              <Link to="/">
                <img className="img-responsive shadow" src="/images/sweatshop.jpg" alt="coffee"/>
              </Link>
              <div className="cell-body">
                <h2>Sweatshop</h2>                  
                <Link className="btn btn-default" to="/">View Profile</Link>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6">
            <div className="my-box bg-white">
              <Link to="/">
                <img className="img-responsive shadow" src="/images/tesco.jpg" alt="coffee"/>
              </Link>
              <div className="cell-body">
                <h2>Tesco</h2>                  
                <Link className="btn btn-default" to="/">View Profile</Link>
              </div>
            </div>
          </div>
        </div>
      </div> 
    );
  }
}

export default Businesses;
import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

class App extends Component {
  
  render() {
    return (
      
        <header className="intro-header" style={{backgroundImage: "url('/images/intro.jpg')"}}>
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                <div className="site-heading">                
                    <form method="post" action="">
                      <div className="input-group">
                        <input type="text" className="form-control" name="search" size="60" placeholder="Business Name, location or category"/>
                        <span className="input-group-btn">
                          <button className="btn btn-default"/>
                        </span>
                      </div>
                    </form>                  
                  <div className="container" id="link-bucket">
                    <div className="row">
                      <div className="col-md-6">
                        <Link className="link-bucket" to="/">Add business</Link>
                      </div>
                      <div className="col-md-6">
                        <Link className="link-bucket" to="/">Join us</Link>
                      </div>
                    </div>
                  </div>     
                </div>
              </div>
            </div>
          </div>
        </header>
    
    );
  }
}

export default App;

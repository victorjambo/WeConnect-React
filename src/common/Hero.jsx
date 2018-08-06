import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SearchForm from '../Components/SearchResults/SearchForm';
import './css/Hero.css';
import Auth from '../helpers/Auth';

const Hero = ({ pass }) => (
  <header className="intro-header" style={{ backgroundImage: "url('/images/landingpage.jpg')" }}>
    <div className="container">
      <div className="row">
        <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
          <div className="site-heading">
            <SearchForm pass={pass}/>
            <div className="container" id="link-bucket">
              <div className="row">
                <div className="col-md-6">
                  <Link className="link-bucket" to="/businesses/new">
                    Register your business
                  </Link>
                </div>
                <div className="col-md-6">
                  {
                    Auth.isAuthenticated ? (
                      <Link className="link-bucket" to="/profile/businesses">
                        View your businesses
                      </Link>
                    ) : (
                      <Link className="link-bucket" to="/auth/signup">
                        Join us
                      </Link>)
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
);

Hero.propTypes = {
  pass: PropTypes.func
};

export default Hero;

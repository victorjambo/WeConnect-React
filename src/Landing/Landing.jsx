import React, { Component } from 'react';
import Businesses from '../Business/Businesses.jsx';
import Hero from '../common/Hero.jsx';

class Landing extends Component {

  render() {
    return (
      <div>
        <Hero />
        <Businesses />
      </div>

    );
  }
}

export default Landing;

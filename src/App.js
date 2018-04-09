import React, { Component } from 'react';
import Businesses from './Business/Businesses.jsx';
import Hero from './common/Hero.jsx';

class App extends Component {

  render() {
    return (
      <div>
        <Hero />
        <Businesses />
      </div>

    );
  }
}

export default App;

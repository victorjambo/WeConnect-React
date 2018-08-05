import React from 'react';
import Businesses from '../Components/Business/Businesses';
import Hero from "./Hero";

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: {
        nameQuery: '',
        locationQuery: '',
        categoryQuery: ''
      },
    };
    this.pass = this.pass.bind(this);
  }

  pass = (query) => {
    this.setState({ query: query });
  }

  render() {
    return (
      <React.Fragment>
        <Hero pass={this.pass}/>
        <Businesses query={this.state.query}/>
      </React.Fragment>
    );
  }
}

export default Landing;

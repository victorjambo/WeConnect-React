import React, { Component } from 'react';
import './css/SearchForm.css';
import decode from 'jwt-decode';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit(e){
    e.preventDefault();
    let token = sessionStorage.getItem('token');
    const { exp } = decode(token);
    console.log(new Date().getTime() / 1000);
    console.log(exp);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="input-group">
          <input type="text" className="form-control" name="search" size="60" placeholder="Business Name, location or category"/>
          <span className="input-group-btn">
            <button className="btn btn-default"/>
          </span>
        </div>
      </form> 
    );
  }
}

export default SearchForm;

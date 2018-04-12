import React, { Component } from 'react';
import './css/SearchForm.css';

class SearchForm extends Component {
  render() {
    return (
      <form method="post" action="">
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

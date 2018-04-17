import React, { Component } from 'react';
import './css/SearchForm.css';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
  }

  render() {
    return (
      <form>
        <div className="input-group">
          <input type="text" className="form-control" name="search" size="60" placeholder="Business Name, location or category"/>
          <span className="input-group-btn">
            <button className="btn btn-default" onClick={this.handleClick} />
          </span>
        </div>
      </form> 
    );
  }
}

export default SearchForm;

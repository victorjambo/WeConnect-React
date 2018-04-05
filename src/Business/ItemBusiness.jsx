import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ItemBusiness extends Component {
  constructor(props) {
    super(props);
    this.business = props.business;
  }

  render(props) {
    return(
      <div className="col-lg-4 col-md-4 col-sm-6">
        <div className="my-box bg-white">
          <Link to="/">
            <img className="img-responsive shadow" src={this.business.logo} alt={this.business.name}/>
          </Link>
          <div className="cell-body">
            <h2>{this.business.name}</h2>
            <Link className="btn btn-default" to={"/business/"+this.business.id}>View Profile</Link>
          </div>
        </div>
      </div>
    );
  }
}

ItemBusiness.propTypes = {
  business: PropTypes.object
};

export default ItemBusiness;
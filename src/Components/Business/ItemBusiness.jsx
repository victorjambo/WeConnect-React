import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Image, Transformation } from 'cloudinary-react';

class ItemBusiness extends Component {
  constructor(props) {
    super(props);
    this.business = props.business;
  }

  render(props) {
    return(
      <div className="col-lg-4 col-md-4 col-sm-6 masonry">
        <div className="my-box bg-white">
          <Link to={`/business/${this.business.id}`}>
            <Image cloudName="dhic9kypo" className="img-responsive shadow img-center" publicId={this.business.logo} >
              <Transformation width="1.0" crop="pad" />
            </Image>
          </Link>
          <div className="cell-body">
            <h2 className="text-center">
              <Link to={`/business/${this.business.id}`}>
                {this.business.name}
              </Link>
            </h2>
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

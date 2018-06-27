import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Image, Transformation } from 'cloudinary-react';
import '../Reviews/Reviews.css';


const ItemBusiness = ({ business }) => (
  <div className="col-lg-4 col-md-4 col-sm-6 masonry fade-in">
    <div className="my-box bg-white">
      <Link to={`/business/${business.id}`}>
        <Image cloudName="dhic9kypo" className="img-responsive shadow img-center" publicId={business.logo} >
          <Transformation width="1.0" crop="pad" />
        </Image>
      </Link>
      <div className="cell-body">
        <h2 className="text-center">
          <Link to={`/business/${business.id}`} className="link-nostyle">
            {business.name}
          </Link>
        </h2>
      </div>
    </div>
  </div>
);

ItemBusiness.propTypes = {
  business: PropTypes.object
};

ItemBusiness.defaultProps = {
  business: {}
};

export default ItemBusiness;

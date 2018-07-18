import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Image, Transformation } from 'cloudinary-react';
import '../Reviews/Reviews.css';

/**
 * single business item
 * @param {object} business
 * @return {*} search results
 */
const Item = ({ business }) => (
  <li className="fade-in">
    <Link to={`/business/${business.id}`}>
      <Image cloudName="dhic9kypo" publicId={business.logo} >
        <Transformation width="1.0" crop="pad" />
      </Image>
    </Link>
    <div className="info">
      <h3 className="name">
        <Link to={`/business/${business.id}`} className="link-nostyle">
          {business.name}
        </Link>
      </h3>
      <div className="desc trunc text-lowercase">
        <Link to={`/business/${business.id}`} className="link-nostyle">
          {business.bio}
        </Link>
      </div>
      <ul>
        <li style={{ width: '50%' }}>
          <span className="fa fa-map-marker" /> {business.location}
        </li>
        <li style={{ width: '50%' }}>
          <span className="fa fa-th" /> {business.category}
        </li>
      </ul>
    </div>
    <div className="social">
      <ul>
        <li className="facebook" style={{ width: '33%' }}>
          <a
            target="_blank"
            href={`http://www.facebook.com/sharer/sharer.php?u=https://weconnect-react.herokuapp.com/business/${business.id}`}>
            <span className="fa fa-facebook" />
          </a>
        </li>
        <li className="twitter" style={{ width: '34%' }}>
          <a
            target="_blank"
            href={`https://twitter.com/intent/tweet?text=Read%20more%20about${business.name}%20at%20https://weconnect-react.herokuapp.com/business/${business.id}`}>
            <span className="fa fa-twitter" />
          </a>
        </li>
        <li className="google-plus" style={{ width: '33%' }}>
          <a
            target="_blank"
            href={`https://plus.google.com/share?url=https://weconnect-react.herokuapp.com/business/${business.id}`}>
            <span className="fa fa-google-plus" />
          </a>
        </li>
      </ul>
    </div>
  </li>

);

Item.propTypes = {
  business: PropTypes.object
};

Item.defaultProps = {
  business: {}
};

export default Item;

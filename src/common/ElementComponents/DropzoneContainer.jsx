import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { Image } from 'cloudinary-react';

const DropzoneContainer = ({ preview, logo, onDrop }) => (
<div className="col-lg-3">
  <Dropzone onDrop={onDrop}>
    <p className="text-center">Drop image here<br /> or <br />click to select files to upload.</p>
  </Dropzone>
  <br /><br /><br />
  { preview && <div><h5>Preview</h5><img className="img-responsive shadow" src={preview} alt="preview" /></div> }
  <hr />
  { logo && <Image cloudName="dhic9kypo" className="img-responsive shadow" publicId={logo} /> }
</div>
);

DropzoneContainer.propTypes = {
  preview: PropTypes.string,
  logo: PropTypes.string,
  onDrop: PropTypes.func.isRequired
};

DropzoneContainer.defaultProps = {
  logo: '',
  preview: ''
};

export default DropzoneContainer;

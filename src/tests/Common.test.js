import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import Textarea from '../common/ElementComponents/Textarea';
import ButtonAuth from '../common/ElementComponents/ButtonAuth';
import Input from '../common/ElementComponents/Input';
import DropzoneContainer from '../common/ElementComponents/DropzoneContainer';
import { Buttons } from '../common/ElementComponents/Business';

configure({ adapter: new Adapter() });

describe('<DropzoneContainer />', () =>  {
  it('Test Render DropzoneContainer Component', () => {
    const wrapper = shallow(<DropzoneContainer onDrop={()=>{}} preview="/"/>);
    expect(wrapper.find('.col-lg-3')).to.have.length(1);
    wrapper.setProps({ logo: '/' });
    expect(wrapper.find('.img-responsive')).to.have.length(2);
  });
});

describe('<Textarea />', () =>  {
  it('Test Render Textarea Component', () => {
    const wrapper = shallow(<Textarea name="" error="test" value="" placeholder="" onChange={() => {} }/>);
    expect(wrapper.find('.form-group')).to.have.length(1);
    expect(wrapper.find('.invalid-feedback').text()).to.equal('test');
  });
});

describe('<ButtonAuth />', () =>  {
  it('Test Render ButtonAuth Component', () => {
    const wrapper = shallow(<ButtonAuth disabled={true} />);
    expect(wrapper.find('button')).to.have.length(1);
    expect(wrapper.find('.fa-spin')).to.have.length(1);
  });
});

describe('<Input />', () =>  {
  it('Test Render Input Component', () => {
    const wrapper = shallow(<Input label={true}
      name="" value="" placeholder="test"
      onChange={()=>{}} type="text" error="test"/>);
    expect(wrapper.find('input')).to.have.length(1);
    expect(wrapper.find('label')).to.have.length(1);
    expect(wrapper.find('label').text()).to.equal('test');
    expect(wrapper.find('.invalid-feedback').text()).to.equal('test');
  });
});

describe('<Buttons />', () =>  {
  it('Test Render Buttons Component', () => {
    const wrapper = shallow(<Buttons deleteBusiness={()=>{}} paramId={1} error="test" isCurrentUser={true} isDeleting={true} />);
    expect(wrapper.find('.btn-warning')).to.have.length(1);
    expect(wrapper.find('.btn-danger')).to.have.length(1);
    expect(wrapper.find('.fa-spin')).to.have.length(1);
    expect(wrapper.find('.alert-danger').text()).to.equal('test');
  });
});

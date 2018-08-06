import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import Textarea from '../common/ElementComponents/Textarea';
import ButtonAuth from '../common/ElementComponents/ButtonAuth';
import Input from '../common/ElementComponents/Input';
import DropzoneContainer from '../common/ElementComponents/DropzoneContainer';
import { Buttons } from '../common/ElementComponents/Business';

// configure enzyme adapter
configure({ adapter: new Adapter() });

describe('Test <DropzoneContainer />', () => {
  /**
   * Test shallow rendering <DropzoneContainer /> contains,
   * .col-lg-3 and .img-responsive (image)
   */
  it('Test Render DropzoneContainer Component', () => {
    const wrapper = shallow(<DropzoneContainer onDrop={() => {}} preview="/"/>);
    expect(wrapper.find('.col-lg-3')).to.have.length(1);
    wrapper.setProps({ logo: '/' });
    expect(wrapper.find('.img-responsive')).to.have.length(2);
  });
});

describe('Test <Textarea />', () => {
  /**
   * Test shallow rendering <Textarea /> contains,
   * button element and .fa-spin
   */
  it('Test Render Textarea Component', () => {
    const wrapper = shallow(<Textarea name="" error="test" value="" placeholder="" onChange={() => {}}/>);
    expect(wrapper.find('.form-group')).to.have.length(1);
    expect(wrapper.find('.invalid-feedback').text()).to.equal('test');
  });
});

describe('Test <ButtonAuth />', () => {
  /**
   * Test shallow rendering <ButtonAuth /> contains,
   * button element and .fa-spin
   */
  it('Test Render ButtonAuth Component', () => {
    const wrapper = shallow(<ButtonAuth disabled />);
    expect(wrapper.find('button')).to.have.length(1);
    expect(wrapper.find('.fa-spin')).to.have.length(1);
  });
});

describe('Test <Input />', () => {
  /**
   * Test shallow rendering <Input /> contains,
   * input element, label element
   * and label element & .invalid-feedback content is 'test'
   */
  it('Test Render Input Component', () => {
    const wrapper = shallow(<Input label
      name="" value="" placeholder="test"
      onChange={() => {}} type="text" error="test"/>);
    expect(wrapper.find('input')).to.have.length(1);
    expect(wrapper.find('label')).to.have.length(1);
    expect(wrapper.find('label').text()).to.equal('test');
    expect(wrapper.find('.invalid-feedback').text()).to.equal('test');
  });
});

describe('Test <Buttons />', () => {
  /**
   * Test shallow rendering Button contains,
   * .btn-warning .btn-danger .fa-spin
   * and button content is 'test'
   */
  it('Test Render Buttons Component', () => {
    const wrapper = shallow(<Buttons deleteBusiness={() => {}} paramId={"1"} error="test" isCurrentUser isDeleting />);
    expect(wrapper.find('.btn-warning')).to.have.length(1);
    expect(wrapper.find('.btn-danger')).to.have.length(1);
    expect(wrapper.find('.fa-spin')).to.have.length(1);
    expect(wrapper.find('.alert-danger').text()).to.equal('test');
  });
});

import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter, Route} from 'react-router-dom';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import sinon from 'sinon';
import Register from '../Auth/Register';
import Login from '../Auth/Login';
import { default as validateLogin } from '../Auth/validations/Login';
import { default as validateRegister } from '../Auth/validations/Register';
import PrivateRoute from '../Auth/PrivateRoute';

configure({ adapter: new Adapter() });

describe('<Login />', () => {
  let location;
  beforeEach(() => {
    location = { state: '/' };
  });

  it('Contains form', () => {
    const div = document.createElement('login');
    ReactDOM.render(<MemoryRouter><Login location={location} /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Contains form', () => {
    const form = shallow(<Login location={location} />);
    expect(form.find('form').length).to.equal(1);
  });

  it('handles Submit', () => {
    let handleSubmit = sinon.stub(Login.prototype, 'handleSubmit').returns(true);
    
    let wrapper = mount(
      <MemoryRouter>
        <Login location={location} />
      </MemoryRouter>);
    
    wrapper.find('form').simulate('submit', { preventDefault() {} });
    
    expect(wrapper.find('.submit-btn')).to.have.length(1);
    
    expect(handleSubmit.called).to.be.true;
    
    handleSubmit.restore();
  });
  
  it('logChange function', () => {
    let logChange = sinon.stub(Login.prototype, 'logChange').returns(true);
    let wrapper = mount(
      <MemoryRouter>
        <Login location={location} />
      </MemoryRouter>);
      
    wrapper.find('input').first().simulate('change', { preventDefault() {} });
    
    expect(logChange.called).to.be.true;
    
    logChange.restore();
  });
});

describe('<Register />', () => {
  let location;
  beforeEach(() => {
    location = { state: '/' };
  });

  it('Renders without crushing', () => {
    const div = document.createElement('signup');
    ReactDOM.render(<MemoryRouter><Register location={location} /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('handles Submit', () => {
    let handleSubmit = sinon.stub(Register.prototype, 'handleSubmit').returns(true);
    
    let wrapper = mount(
      <MemoryRouter>
        <Register location={location} />
      </MemoryRouter>);
    
    wrapper.find('form').simulate('submit', { preventDefault() {} });
    
    expect(wrapper.find('.submit-btn')).to.have.length(1);
    
    expect(handleSubmit.called).to.be.true;
    
    handleSubmit.restore();
  });
  
  it('logChange function', () => {
    let logChange = sinon.stub(Register.prototype, 'logChange').returns(true);
    let wrapper = mount(
      <MemoryRouter>
        <Register location={location} />
      </MemoryRouter>);
      
    wrapper.find('input').first().simulate('change', { preventDefault() {} });
    
    expect(logChange.called).to.be.true;
    
    logChange.restore();
  });
});

describe('Validations', () => {
  let text = 'This field is required';
  it('Validates Login', () => {
    let data = {username: '', password: ''};
    let output = validateLogin(data);
    
    for(var error in output.errors) {
      expect(output.errors[error]).to.equal(text);
    }
  });
  
  it('Validates Register', () => {
    let data = {
      username: '',
      password: '',
      fullname: '',
      email: '',
      confirm_password: ''
    };
    let output = validateRegister(data);
    
    for(var error in output.errors) {
      expect(output.errors[error]).to.equal(text);
    }
  });
});

describe('PrivateRoute', () => {
  it('PrivateRoute', () => {
    let mockObject = { component: Register, ...[]};
    let route = <Route />;
    expect(PrivateRoute(mockObject).type).to.equal(route.type);
  });
});

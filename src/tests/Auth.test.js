import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter, Route } from 'react-router-dom';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import sinon from 'sinon';
import Register from '../Components/Auth/Register';
import Login from '../Components/Auth/Login';
import PrivateRoute from '../Components/Auth/PrivateRoute';
import LoginFirst from '../Components/Auth/LoginFirst';
import ResetPassword from '../Components/Auth/ResetPassword';

// configure enzyme adapter
configure({ adapter: new Adapter() });

describe('<Login />', () => {
  let location;
  beforeEach(() => {
    location = { state: '/' };
  });

  it('test Login container renders without crushing', () => {
    const div = document.createElement('login');
    ReactDOM.render(<MemoryRouter><Login location={location} /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('test Login Contains form element', () => {
    const form = shallow(<Login location={location} />);
    expect(form.find('form').length).to.equal(1);
  });

  it('Simulates handlesSubmit function', () => {
    let handleSubmit = sinon.stub(Login.prototype, 'handleSubmit').returns(true);

    let wrapper = mount(
      <MemoryRouter>
        <Login location={location} />
      </MemoryRouter>
    );

    wrapper.find('form').simulate('submit', { preventDefault() {} });

    expect(wrapper.find('.submit-btn')).to.have.length(1);

    expect(handleSubmit.called).to.be.true;

    handleSubmit.restore();
  });

  it('test simulation of logChange function', () => {
    let logChange = sinon.stub(Login.prototype, 'logChange').returns(true);
    let wrapper = mount(
      <MemoryRouter>
        <Login location={location} />
      </MemoryRouter>
    );

    wrapper.find('input').first().simulate('change', { preventDefault() {} });

    expect(logChange.called).to.be.true;

    logChange.restore();
  });

  it('test logChange function', () => {
    let event = {
      target: {
        name: 'name',
        value: 'victor'
      }
    };
    const wrapper = shallow(<Login location={location} />);
    wrapper.instance().logChange(event);
    expect(wrapper.state().name).to.equal('victor');
  });

  it('Simulates handlesSubmit function', () => {
    const preventDefault = sinon.spy();
    let event = {
      preventDefault
    };
    const wrapper = shallow(<Login location={location} />);
    wrapper.instance().handleSubmit(event);
    expect(preventDefault.called).to.be.true;
    expect(wrapper.state().isLoading).to.be.false;
    wrapper.setState({ username: '', password: '' });
    expect(wrapper.state().errors.username).to.equal('This field is required');
    wrapper.setState({ username: 'victor', password: 'password' });
    expect(wrapper.state().username).to.equal('victor');
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
      </MemoryRouter>
    );

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
      </MemoryRouter>
    );

    wrapper.find('input').first().simulate('change', { preventDefault() {} });

    expect(logChange.called).to.be.true;

    logChange.restore();
  });

  it('test logChange function', () => {
    let event = {
      target: {
        name: 'name',
        value: 'victor'
      }
    };
    const wrapper = shallow(<Register location={location} />);
    wrapper.instance().logChange(event);
    expect(wrapper.state().name).to.equal('victor');
  });

  it('simulates handleSubmit function', () => {
    const preventDefault = sinon.spy();
    let event = {
      preventDefault
    };
    const wrapper = shallow(<Register location={location} />);
    wrapper.instance().handleSubmit(event);
    expect(preventDefault.called).to.be.true;
    expect(wrapper.state().isLoading).to.be.false;
    wrapper.setState({ username: '', password: '' });
    expect(wrapper.state().errors.username).to.equal('This field is required');
    wrapper.setState({ username: 'victor', password: 'password' });
    expect(wrapper.state().username).to.equal('victor');
  });
});


describe('PrivateRoute', () => {
  it('test PrivateRoute', () => {
    let mockObject = { component: Register, ...[] };
    let route = <Route />;
    expect(PrivateRoute(mockObject).type).to.equal(route.type);
  });
});

describe('<LoginFirst />', () => {
  it('Renders without crushing and contains .login-first-body class element', () => {
    const wrapper = shallow(<LoginFirst businessId="3" />);
    expect(wrapper.find('.login-first-body')).to.have.lengthOf(1);
  });
});

describe('<ResetPassword />', () => {
  it('Renders without crushing', () => {
    const location = { state: '/' };
    const wrapper = shallow(<ResetPassword location={location}/>);
    expect(wrapper.find('form')).to.have.lengthOf(1);
  });

  it('test handleSubmit func works as it should', () => {
    const location = { state: '/' };
    window.sessionStorage = {
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjQ1MDc2NDQsImlkIjo1NH0.Suqe5DBSWyAOQC7dRHUcn30ZYc8Idhz1OMm8SAE9g6Q',
      getItem() {
        return this.token;
      }
    };
    const wrapper = shallow(<ResetPassword location={location}/>);
    const preventDefault = sinon.spy();
    let event = {
      preventDefault
    };
    wrapper.instance().handleSubmit(event);
    expect(preventDefault.called).to.be.true;
    expect(wrapper.state().isLoading).to.be.false;
    wrapper.setState({
      oldPassword: '',
      password: '',
      confirmPassword: ''
    });

    expect(wrapper.state().errors.password).to.equal('This field is required');
    wrapper.setState({
      oldPassword: 'password1234',
      password: 'password',
      confirmPassword: 'passwords'
    });

    expect(wrapper.state().confirmPassword).to.equal('passwords');
  });
});

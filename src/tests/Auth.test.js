import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter, Route} from 'react-router-dom';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import sinon from 'sinon';
import Register from '../Components/Auth/Register';
import Login from '../Components/Auth/Login';
import PrivateRoute from '../Components/Auth/PrivateRoute';

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

  it('logChange', () => {
    let event = {
      target: {
        name: 'name',
        value: 'victor'
      }
    }
    const wrapper = shallow(<Login location={location} />);
    wrapper.instance().logChange(event);
    expect(wrapper.state().name).to.equal('victor');
  });

  it('handleSubmit', () => {
    const preventDefault = sinon.spy();
    let event = {
      preventDefault
    }
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

  it('logChange', () => {
    let event = {
      target: {
        name: 'name',
        value: 'victor'
      }
    }
    const wrapper = shallow(<Register location={location} />);
    wrapper.instance().logChange(event);
    expect(wrapper.state().name).to.equal('victor');
  });

  it('handleSubmit', () => {
    const preventDefault = sinon.spy();
    let event = {
      preventDefault
    }
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
  it('PrivateRoute', () => {
    let mockObject = { component: Register, ...[]};
    let route = <Route />;
    expect(PrivateRoute(mockObject).type).to.equal(route.type);
  });
});

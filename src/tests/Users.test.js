import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import Sidebar from '../common/Sidebar';
import UserBusinesses from '../Components/Users/UserBusinesses';
import Profile from '../Components/Users/Profile';

configure({ adapter: new Adapter() });

describe('<UserBusinesses />', () => {
  it('Test Render UserBusinesses Component', () => {
    const wrapper = shallow(<UserBusinesses />);
    expect(wrapper.contains(<Sidebar />)).to.be.true;
    expect(wrapper.find('.container')).to.have.length(1);
  });
});

describe('<Profile />', () => {
  let props, wrapper;
  beforeEach(() => {
    window.sessionStorage = {
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjQ1MDc2NDQsImlkIjo1NH0.Suqe5DBSWyAOQC7dRHUcn30ZYc8Idhz1OMm8SAE9g6Q',
      getItem() {
        return this.token;
      }
    };
    props = {
      user: {
        username: 'victorjambo',
        fullname: 'victor jambo',
        email: 'victor@jambo.com'
      },
      isLoading: true
    };
    wrapper = mount(<MemoryRouter><Profile /></MemoryRouter>);
  });
  afterEach(() => {
    wrapper.unmount();
  });

  it('Test Render Profile Component', () => {
    wrapper.setState(props);
    expect(wrapper.contains(<Sidebar />)).to.be.true;
  });
});

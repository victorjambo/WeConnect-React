import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import Sidebar from '../common/Sidebar';
import NavNotifications from '../Components/Notifications/NavNotifications';
import Notifications from '../Components/Notifications/Notifications';

// configure enzyme adapter
configure({ adapter: new Adapter() });

describe('<Notifications />', () => {
  it('Test Render Notifications Component', () => {
    window.sessionStorage = {
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjQ1MDc2NDQsImlkIjo1NH0.Suqe5DBSWyAOQC7dRHUcn30ZYc8Idhz1OMm8SAE9g6Q',
      getItem() {
        return this.token;
      }
    };
    const wrapper = shallow(<Notifications />);
    expect(wrapper.contains(<Sidebar />)).to.be.true;
    expect(wrapper.find('.container')).to.have.length(1);
    expect(wrapper.find('.col-lg-9')).to.have.length(1);
  });
});

describe('<NavNotifications />', () => {
  it('Test Render NavNotifications Component', () => {
    window.sessionStorage = {
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjQ1MDc2NDQsImlkIjo1NH0.Suqe5DBSWyAOQC7dRHUcn30ZYc8Idhz1OMm8SAE9g6Q',
      getItem() {
        return this.token;
      }
    };
    const wrapper = shallow(<NavNotifications />);
    expect(wrapper.find('.text-center')).to.have.length(1);
    expect(wrapper.find('.dropdown-menu')).to.have.length(1);
  });
});

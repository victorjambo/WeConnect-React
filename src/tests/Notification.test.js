import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import Sidebar from '../common/Sidebar';
import NavNotifications from '../Components/Notifications/NavNotifications';
import Notifications from '../Components/Notifications/Notifications';

configure({ adapter: new Adapter() });

describe('<Notifications />', () =>  {
  it('Test Render Notifications Component', () => {
    const wrapper = shallow(<Notifications />);
    expect(wrapper.contains(<Sidebar />)).to.be.true;
    expect(wrapper.find('.container')).to.have.length(1);
    expect(wrapper.find('.col-lg-9')).to.have.length(1);
  });
});

describe('<NavNotifications />', () =>  {
  it('Test Render NavNotifications Component', () => {
    const wrapper = shallow(<NavNotifications />);
    expect(wrapper.find('.text-center')).to.have.length(1);
    expect(wrapper.find('.dropdown-menu')).to.have.length(1);
  });
});

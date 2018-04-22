import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import { expect } from 'chai';
import Hero from '../common/Hero';
import Landing from '../Landing/Landing';
import Sidebar from '../common/Sidebar';
import UserBusinesses from '../Components/Users/UserBusinesses';
import Profile from '../Components/Users/Profile';

configure({ adapter: new Adapter() });

describe('<UserBusinesses />', () =>  {
  it('Test Render UserBusinesses Component', () => {
    const wrapper = shallow(<UserBusinesses />);
    expect(wrapper.contains(<Sidebar />)).to.be.true;
    expect(wrapper.find('.container')).to.have.length(1);
  });
});

describe('<Profile />', () =>  {
  it('Test Render Profile Component', () => {
    const wrapper = mount(<MemoryRouter><Profile /></MemoryRouter>);
    expect(wrapper.contains(<Sidebar />)).to.be.true;
  });
});

import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import Hero from '../common/Hero';
import Landing from '../Landing/Landing';
import Businesses from '../Components/Business/Businesses';
import SearchForm from '../Components/Business/SearchForm';
import NavigationBar from '../common/NavigationBar';
import Auth from '../Components/Auth/Auth.js';
import Dropdown from '../common/ElementComponents/Dropdown';


configure({ adapter: new Adapter() });

describe('<Landing />', () =>  {
  it('Test Render Landing Components', () => {
    const app = shallow(<Landing />);
    expect(app.contains(<Hero />)).to.be.true;
    expect(app.contains(<Businesses />)).to.be.true;
  });
});

describe('<SearchForm />', () =>  {
  it('Test Render Search Bar', () => {
    const form = shallow(<SearchForm />);
    expect(form.find('form').length).to.equal(1);
  });

  it('simulates click events', () => {
    const wrapper = shallow(<SearchForm />);
    expect(wrapper.find('.btn-default').length).to.equal(1);
  });
});

describe('<Hero />', () =>  {
  const hero = shallow(<Hero />);
  it('Test Render Hero', () => {
    expect(hero.find('.intro-header')).to.have.length(1);
  });

  it('Test if Hero can Render <SearchForm />', () => {
    expect(hero.contains(<SearchForm />)).to.be.true;
  });
});

describe('<NavigationBar />', () =>  {
  it('Renders without crashing', () => {
    const div = document.createElement('root');
    ReactDOM.render(<MemoryRouter><NavigationBar /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('<Dropdown />', () => {
  it('Contains Authenticated links', () => {
    Auth.authenticate();
    const wrapper = shallow(<Dropdown />);
    expect(wrapper.find('.navbar-nav')).to.have.length(1);
    expect(wrapper.find('.dropdown-notifications')).to.have.length(1);
  });

  it('Contains Un-Authenticated links', () => {
    Auth.signout();
    const wrapper = shallow(<Dropdown />);
    expect(wrapper.find('.login')).to.have.length(1);
    expect(wrapper.find('.logout')).to.have.length(0);
  });
});

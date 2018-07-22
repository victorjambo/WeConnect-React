import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import sinon from 'sinon';
import Hero from '../common/Hero';
import Landing from '../common/Landing';
import Businesses from '../Components/Business/Businesses';
import SearchForm from '../Components/SearchResults/SearchForm';
import NavigationBar from '../common/NavigationBar';
import Auth from '../helpers/Auth';
import Dropdown from '../common/ElementComponents/Dropdown';
import Sidebar from '../common/Sidebar';

// configure enzyme adapter
configure({ adapter: new Adapter() });

describe('Test <Landing />', () => {
  it('Test Render Landing Components', () => {
    const app = shallow(<Landing />);
    expect(app.contains(<Hero />)).to.be.true;
    expect(app.contains(<Businesses />)).to.be.true;
  });
});

describe('Test <SearchForm />', () => {
  it('Test Render Search Bar, should contain form element', () => {
    const form = shallow(<SearchForm />);
    expect(form.find('form').length).to.equal(1);
  });

  it('simulates click events', () => {
    const wrapper = shallow(<SearchForm />);
    expect(wrapper.find('.btn-default').length).to.equal(1);
  });
});

/**
 * Hero component contains search form and image bg
 */
describe('Test <Hero />', () => {
  const hero = shallow(<Hero />);
  it('Test Render Hero should have .intro-header class', () => {
    expect(hero.find('.intro-header')).to.have.length(1);
  });

  it('Test if Hero contains Render <SearchForm />', () => {
    expect(hero.contains(<SearchForm />)).to.be.true;
  });

  it('Test mount Hero after authentication', () => {
    Auth.authenticate();
    expect(hero.find('.link-bucket')).to.have.length(2);
    const wrapper = mount(<MemoryRouter><Hero /></MemoryRouter>);
    expect(wrapper.find('a').last().text()).to.be.equal('View your businesses');
  });
});

describe('Test <NavigationBar />', () => {
  beforeEach(() => {
    window.sessionStorage = {
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjQ1MDc2NDQsImlkIjo1NH0.Suqe5DBSWyAOQC7dRHUcn30ZYc8Idhz1OMm8SAE9g6Q',
      removeItem() {
        return this.token;
      },
      getItem() {
        return this.token;
      }
    };
  });
  it('NavigationBar Renders without crashing', () => {
    const div = document.createElement('root');
    ReactDOM.render(<MemoryRouter><NavigationBar /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Simulates logout on NavigationBar', () => {
    Auth.authenticate();
    const onButtonClick = sinon.spy();
    const wrapper = shallow(<Dropdown logout={onButtonClick}/>);
    wrapper.find('.logout').simulate('click');
    expect(onButtonClick).to.have.property('callCount', 1);
  });

  it('Test logout function when called, should set redirect to true', () => {
    const wrapper = shallow(<NavigationBar />);
    expect(wrapper.state().fireRedirect).to.be.false;
    wrapper.instance().logout();
    expect(wrapper.state().fireRedirect).to.be.true;
  });
});

/**
 * Test correct element are rendered when authenticated or unauthenticated
 * Authenticated should have notifications dropdown
 * un-Authenticated should have login button
 */
describe('Test <Dropdown />', () => {
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

describe('Test <Sidebar />', () => {
  it('Sidebar Render contains .list-group class element', () => {
    const wrapper = shallow(<Sidebar />);
    expect(wrapper.find('.list-group')).to.have.length(1);
  });
});

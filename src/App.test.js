import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Route } from 'react-router-dom';
import Register from './Auth/Register';
import Hero from './common/Hero';
import Login from './Auth/Login';
import { configure, shallow, mount } from 'enzyme';
import NavigationBar from './common/NavigationBar';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import Businesses from './Business/Businesses';
import SearchForm from './Business/SearchForm';
import ItemBusiness from './Business/ItemBusiness';
import sinon, { spy } from 'sinon';

configure({ adapter: new Adapter() });

describe('<BrowserRouter />', () =>  {
  it('Test Browser Routes', () => {
    const div = document.createElement('root');
    ReactDOM.render(
      <BrowserRouter>
    	  <div>
    	    <NavigationBar />
          <Route exact path="/" component={App} />
          <Route path="/auth/signup" component={Register} />
          <Route path="/auth/login" component={Login} />
        </div>
      </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('<App />', () =>  {
  it('Test Render App Components', () => {
    const app = shallow(<App />);
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

describe('<Businesses />', () =>  {
  it('Test Render Businesses', () => {
    const business = {name: '', logo: ''};
    const item = shallow(<BrowserRouter><ItemBusiness business={business} /></BrowserRouter>);
    item.render();
    expect(item.contains('.my-box')).to.equal(false);
  });
  
  it('Test calls componentDidMount', () => {
    spy(Businesses.prototype, 'componentDidMount');
    mount(<Businesses />);
    expect(Businesses.prototype.componentDidMount.calledOnce).to.equal(true);
  });
});

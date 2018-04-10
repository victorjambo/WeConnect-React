import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import Register from '../Auth/Register';
import Hero from '../common/Hero';
import Login from '../Auth/Login';
import App from '../App';
import NavigationBar from '../common/NavigationBar';
import Businesses from '../Business/Businesses';
import SearchForm from '../Business/SearchForm';

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

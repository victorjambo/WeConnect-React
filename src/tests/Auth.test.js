import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import sinon, { spy } from 'sinon';
import Register from '../Auth/Register';
import Hero from '../common/Hero';
import Login from '../Auth/Login';
import App from '../App';
import NavigationBar from '../common/NavigationBar';
import Businesses from '../Business/Businesses';
import SearchForm from '../Business/SearchForm';
import ItemBusiness from '../Business/ItemBusiness';

configure({ adapter: new Adapter() });

describe('<Login />', () => {
  let location;
  beforeEach(() => {
    location = { state: '/' };
  });
  it('Renders without crushing', () => {
    const div = document.createElement('login');
    ReactDOM.render(<BrowserRouter><Login location={location} /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('<Register />', () => {
  let location;
  beforeEach(() => {
    location = { state: '/' };
  });
  it('Renders without crushing', () => {
    const div = document.createElement('signup');
    ReactDOM.render(<BrowserRouter><Register location={location} /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});


/*****
* https://medium.com/airbnb-engineering/enzyme-javascript-testing-utilities-for-react-a417e5e5090f
* https://github.com/airbnb/enzyme/issues/435
* https://gist.github.com/alfonsomunozpomer/de992a9710724eb248be3842029801c8
* https://medium.com/@sangboaklee
*/

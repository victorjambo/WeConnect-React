import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Route } from 'react-router-dom';
import Register from './Auth/Register';
import Login from './Auth/Login';
import { configure, shallow } from 'enzyme';
import NavigationBar from './common/NavigationBar';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import Businesses from './Business/Businesses';
import SearchForm from './Business/SearchForm';

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
  it('Test Render Businesses', () => {
    const app = shallow(<App />);
    expect(app.contains(<Businesses />)).to.be.true;
  });

  it('Test Render Search Bar', () => {
    const form = shallow(<SearchForm />);
    expect(form.find('form').length).to.equal(1);
  });
});

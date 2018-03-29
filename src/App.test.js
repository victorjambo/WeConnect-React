import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Hero from './common/Hero';
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

it('renders without crashing', () => {
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

describe('<Hero />', () =>  {
  it('renders search bar', () => {
    const app = shallow(<App />);
    const form = shallow(<SearchForm />);
    expect(form.find('form').length).to.equal(1);
    expect(app.contains(<Businesses />)).to.equal(true);
  });
});

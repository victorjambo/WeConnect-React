import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import sinon from 'sinon';
import Register from '../Auth/Register';
import Login from '../Auth/Login';

configure({ adapter: new Adapter() });

describe('<Login />', () => {
  let location;
  beforeEach(() => {
    location = { state: '/' };
  });

  it('Contains form', () => {
    const div = document.createElement('login');
    ReactDOM.render(<MemoryRouter><Login location={location} /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Contains form', () => {
    const form = shallow(<Login location={location} />);
    expect(form.find('form').length).to.equal(1);
  });

  it('handles Submit', () => {
    let handleSubmit = sinon.stub(Login.prototype, 'handleSubmit').returns(true);
    
    let wrapper = mount(
      <MemoryRouter>
        <Login location={location} />
      </MemoryRouter>);
    
    wrapper.find('form').simulate('submit', { preventDefault() {} });
    
    expect(wrapper.find('.submit-btn')).to.have.length(1);
    
    expect(handleSubmit.called).to.be.true;
    
    handleSubmit.restore();
  });
});

describe('<Register />', () => {
  let location;
  beforeEach(() => {
    location = { state: '/' };
  });

  it('Renders without crushing', () => {
    const div = document.createElement('signup');
    ReactDOM.render(<MemoryRouter><Register location={location} /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('handles Submit', () => {
    let handleSubmit = sinon.stub(Register.prototype, 'handleSubmit').returns(true);
    
    let wrapper = mount(
      <MemoryRouter>
        <Register location={location} />
      </MemoryRouter>);
    
    wrapper.find('form').simulate('submit', { preventDefault() {} });
    
    expect(wrapper.find('.submit-btn')).to.have.length(1);
    
    expect(handleSubmit.called).to.be.true;
    
    handleSubmit.restore();
  });
});


/*****
* https://medium.com/airbnb-engineering/enzyme-javascript-testing-utilities-for-react-a417e5e5090f
* https://github.com/airbnb/enzyme/issues/435
* https://gist.github.com/alfonsomunozpomer/de992a9710724eb248be3842029801c8
* https://medium.com/@sangboaklee
*/

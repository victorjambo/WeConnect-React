import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import App from '../App';
import PageNotFound from '../Components/PageNotFound/PageNotFound.jsx';
import Landing from '../Landing/Landing';
import NavigationBar from '../common/NavigationBar.jsx';

configure({ adapter: new Adapter() });

test('sanity test', () => {
  expect(1).to.equal(1);
});

describe('<App />', () =>  {
  it('Test Browser Routes', () => {
    const div = document.createElement('root');
    ReactDOM.render(
      <BrowserRouter>
    	  <App />
      </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
  it('<App /> contains all components', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(NavigationBar)).to.have.length(1);
    expect(wrapper.find('Switch')).to.have.length(1);
    expect(wrapper.find('Route')).to.have.length(6);
    expect(wrapper.find('PrivateRoute')).to.have.length(1);
  });
});

describe('invalid path should redirect to 404', () => {
  let randomWrapper, landingWrapper;
  beforeEach(() => {
    randomWrapper = mount(
      <MemoryRouter initialEntries={[ '/random' ]}>
        <App/>
      </MemoryRouter>
    );
    landingWrapper = mount(
      <MemoryRouter initialEntries={[ '/' ]}>
        <App/>
      </MemoryRouter>
    );
  });

  it('Renders Without crushing', () => {
    expect(randomWrapper.find(PageNotFound)).to.have.length(1);
    expect(randomWrapper.find(Landing)).to.have.length(0);
    expect(randomWrapper.find('.action')).to.have.length(1);
  });

  it('loads content on correct path', () => {
    expect(landingWrapper.find(PageNotFound)).to.have.length(0);
    expect(landingWrapper.find(Landing)).to.have.length(1);
  });
});

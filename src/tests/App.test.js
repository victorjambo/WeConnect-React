import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import App from '../App';
import PageNotFound from '../Components/PageNotFound/PageNotFound';
import Landing from '../common/Landing';
import NavigationBar from '../common/NavigationBar';

// configure enzyme adapter
configure({ adapter: new Adapter() });

// sanity test to check if its running as it should
test('sanity test', () => {
  expect(1).to.equal(1);
});

/**
 * test main App renders
 */
describe('<App />', () => {
  it('App Component Renders', () => {
    const div = document.createElement('root');
    ReactDOM.render(
      <BrowserRouter>
        <App />
      </BrowserRouter>, div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('<App /> contains all components passed to it', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(NavigationBar)).to.have.length(1);
    expect(wrapper.find('Switch')).to.have.length(1);
    expect(wrapper.find('Route')).to.have.length(7);
    expect(wrapper.find('PrivateRoute')).to.have.length(6);
  });
});

/**
 * PageNotFound component work
 * Test it redirect to 404 page when hit with route that doesn't exist
 */
describe('invalid path should redirect to 404', () => {
  let randomWrapper, landingWrapper;
  beforeEach(() => {
    randomWrapper = mount(
      <MemoryRouter initialEntries={['/random']}>
        <App/>
      </MemoryRouter>
    );
    landingWrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <App/>
      </MemoryRouter>
    );
  });

  afterEach(() => {
    randomWrapper.unmount();
    landingWrapper.unmount();
  });

  it('test that PageNotFound component is rendered on wrong route', () => {
    expect(randomWrapper.find(PageNotFound)).to.have.length(1);
    expect(randomWrapper.find(Landing)).to.have.length(0);
    expect(randomWrapper.find('.NotFoundPage')).to.have.length(1);
  });

  it('test that PageNotFound is not rendered on correct path', () => {
    expect(landingWrapper.find(PageNotFound)).to.have.length(0);
    expect(landingWrapper.find(Landing)).to.have.length(1);
  });
});

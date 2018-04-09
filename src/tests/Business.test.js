import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import sinon, { spy } from 'sinon';
import Businesses from '../Business/Businesses';
import Business from '../Business/Business';
import ItemBusiness from '../Business/ItemBusiness';
import EditBusiness from '../Business/EditBusiness';
import NewBusiness from '../Business/NewBusiness';
import SearchForm from '../Business/SearchForm';

configure({ adapter: new Adapter() });

describe('<Businesses />', () =>  {
  it('Test Render Businesses without crashing', () => {
    const div = document.createElement('home');
    ReactDOM.render(<Businesses />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Test <Businesses />', () => {
    const businesses = shallow(<Businesses />);
    expect(businesses.find('.row.bucket')).to.have.lengthOf(1);
  });

});

describe('<ItemBusiness />', () => {
  let business, item;
  beforeEach(() => {
    business = {
      name: 'NNeka',
      logo: 'url_here',
      bio: 'this is a bio',
      category: 'Staffing',
      location: 'Nairobi',
      id: '1'
    };
    item = shallow(<ItemBusiness business={business} key={business.id} />);
  });

  it('Renders without crushing', () => {
    expect(item.find('.my-box')).to.have.lengthOf(1);
  })

  it('Renders Business name', () => {
    expect(item.find('h2').text()).to.be.equal(business.name);
  });
});

describe('<Business />', () => {
  let match, business;
  beforeEach(() => {
    match = { params: '1' };
    business = {
      name: 'NNeka',
      logo: 'url_here',
      bio: 'this is a bio',
      category: 'Staffing',
      location: 'Nairobi',
      id: '1'
    };
  });

  it('Renders Business without crashing', () => {
    const div = document.createElement('business');
    ReactDOM.render(<Business match={match} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  // it('Test Business', () => {});
});

describe('<EditBusiness />', () => {
  let match, business;
  beforeEach(() => {
    match = { params: '1' };
    business = {
      name: 'NNeka',
      logo: 'url_here',
      bio: 'this is a bio',
      category: 'Staffing',
      location: 'Nairobi',
      id: '1'
    };
  });

  it('Renders EditBusiness without crashing', () => {
    const div = document.createElement('edit-business');
    ReactDOM.render(<BrowserRouter><EditBusiness match={match} /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('<NewBusiness />', () => {
  it('Test Render NewBusiness without crashing', () => {
    const div = document.createElement('new-business');
    ReactDOM.render(<BrowserRouter><NewBusiness /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('<SearchForm />', () => {
  it('Renders SearchForm without crashing', () => {
    const div = document.createElement('search');
    ReactDOM.render(<SearchForm />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should have a form', () => {
    const searchForm = shallow(<SearchForm />);
    expect(searchForm.find('form')).to.have.lengthOf(1);
  });
});

import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import Businesses from '../Components/Business/Businesses';
import Business from '../Components/Business/Business';
import ItemBusiness from '../Components/Business/ItemBusiness';
import EditBusiness from '../Components/Business/EditBusiness';
import NewBusiness from '../Components/Business/NewBusiness';
import SearchForm from '../Components/Business/SearchForm';
import Form from '../Components/Business/Form';

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
    expect(item.find('h2').text()).to.be.equal('<Link />');
  });
});

describe('<Business />', () => {
  let match, business;
  beforeEach(() => {
    match = { params: { id: 23 }, isExact: false, path: "/", url: "/" };
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
    ReactDOM.render(<MemoryRouter><Business required={true} match={match} /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  // it('Test Business', () => {});
});

describe('<EditBusiness />', () => {
  let match, business;
  beforeEach(() => {
    match = { params: { id: '23' }, isExact: false, path: "/", url: "/" };
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
    const wrapper = shallow(<EditBusiness match={match}/>);
    expect(wrapper.find('.container').length).to.equal(1);
    expect(wrapper.contains(<Form paramId={'23'} />)).to.be.true;
  });
});

describe('<NewBusiness />', () => {
  it('Test Render NewBusiness without crashing', () => {
    const wrapper = shallow(<NewBusiness />);
    expect(wrapper.find('.container').length).to.equal(1);
    expect(wrapper.contains(<Form />)).to.be.true;
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

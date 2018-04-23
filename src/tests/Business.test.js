import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import Businesses from '../Components/Business/Businesses';
import Business from '../Components/Business/Business';
import ItemBusiness from '../Components/Business/ItemBusiness';
import EditBusiness from '../Components/Business/EditBusiness';
import NewBusiness from '../Components/Business/NewBusiness';
import SearchForm from '../Components/Business/SearchForm';
import Form from '../Components/Business/Form';
import Input from '../common/ElementComponents/Input';
import sinon from 'sinon';

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

describe('<Form />', () => {
  it('Renders Form without crashing', () => {
    const div = document.createElement('form-class');
    ReactDOM.render(<Form />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should have all Components', () => {
    const wrapper = shallow(<Form />);
    expect(wrapper.find('form')).to.have.lengthOf(1);
    expect(wrapper.find('Input')).to.have.lengthOf(3);
    expect(wrapper.find('Warning')).to.have.lengthOf(1);
    expect(wrapper.find('Textarea')).to.have.lengthOf(1);
    expect(wrapper.find('ButtonAuth')).to.have.lengthOf(1);
  });

  it('simulate click', () => {
    const handleSubmit = sinon.spy();
    const wrapper = mount(<Form onSubmit={handleSubmit}/>);
    expect(wrapper.find('.btn-primary')).to.have.lengthOf(1);
    wrapper.find('button').simulate('click');
    expect(handleSubmit).to.have.property('callCount', 0);
  });

  it('getBusiness', () => {
    const wrapper = shallow(<Form />);
    wrapper.instance().getBusiness(1);
    expect(wrapper.state().isLoading).to.be.false;
  });

  it('onDrop', () => {
    const wrapper = shallow(<Form />);
    wrapper.instance().onDrop(['test']);
    expect(wrapper.state().file).to.equal('test');
  });

  it('logChange', () => {
    let event = {
      target: {
        name: 'name',
        value: 'victor'
      }
    }
    const wrapper = shallow(<Form />);
    wrapper.instance().logChange(event);
    expect(wrapper.state().name).to.equal('victor');
  });
});

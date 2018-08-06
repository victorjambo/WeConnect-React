import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import sinon from 'sinon';
import Businesses from '../Components/Business/Businesses';
import Business from '../Components/Business/Business';
import ItemBusiness from '../Components/Business/ItemBusiness';
import EditBusiness from '../Components/Business/EditBusiness';
import NewBusiness from '../Components/Business/NewBusiness';
import SearchForm from '../Components/SearchResults/SearchForm';
import Form from '../Components/Business/Form';
import Reviews from '../Components/Reviews/Reviews';
import PageNotFound from '../Components/PageNotFound/PageNotFound';

// configure enzyme adapter
configure({ adapter: new Adapter() });

describe('<Businesses />', () => {
  it('Shallow renders Businesses component without crashing', () => {
    const businesses = shallow(<Businesses />);
    expect(businesses.find('.row.bucket')).to.have.lengthOf(1);
  });
});

describe('<ItemBusiness /> one business item', () => {
  let business, wrapper;
  beforeEach(() => {
    business = {
      name: 'NNeka',
      logo: 'url_here',
      bio: 'this is a bio',
      category: 'Staffing',
      location: 'Nairobi',
      id: '1'
    };
    wrapper = shallow(<ItemBusiness business={business} key={business.id} />);
  });

  it('test ItemBusiness has element with class .my-box', () => {
    expect(wrapper.find('.my-box')).to.have.lengthOf(1);
  });

  it('test h2 element in ItemBusiness has a link child', () => {
    expect(wrapper.find('h2').text()).to.be.equal('<Link />');
  });
});

describe('<Business /> single business component', () => {
  let match, location, initialState, wrapper;
  beforeEach(() => {
    match = { params: { id: '23' } };
    location = { pathname: '/' };
    initialState = {
      business: {
        bio: "bio",
        category: "Music",
        id: 62,
        location: "Nairobi Kenya",
        logo: "owlwhoumyhga3itgdqzo",
        name: "Super Agent",
        owner: "victorjambo"
      },
      isLoading: false,
      found: true,
      isCurrentUser: true
    };
    wrapper = shallow(<Business match={match} location={location}/>);
    wrapper.instance().refs = { refBusiness: true };
  });

  it('Renders Business, should have element with class .business & Review component', () => {
    wrapper.setState(initialState);
    expect(wrapper.find('.business').length).to.equal(1);
    expect(wrapper.contains(<Reviews businessId="23" path="/" isCurrentUser />)).to.be.true;
  });

  it('Redirect to <PageNotFound />', () => {
    wrapper.setState({ isLoading: false, found: false });
    expect(wrapper.contains(<PageNotFound />)).to.be.true;
  });

  it('Rendering Business while isLoading=false shouldnt have .business', () => {
    expect(wrapper.find('.business')).to.have.lengthOf(0);
  });
});

describe('Test <EditBusiness />', () => {
  let match;
  beforeEach(() => {
    match = {
      params: { id: '23' }, isExact: false, path: "/", url: "/"
    };
  });

  it('Renders EditBusiness, should have .container element & Form component', () => {
    const wrapper = shallow(<EditBusiness match={match}/>);
    expect(wrapper.find('.container').length).to.equal(1);
    expect(wrapper.contains(<Form paramId={'23'} />)).to.be.true;
  });
});

describe('Test <NewBusiness />', () => {
  it('Test Render NewBusiness, should have .container element & Form component', () => {
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
    };
    const wrapper = shallow(<Form />);
    wrapper.instance().logChange(event);
    expect(wrapper.state().name).to.equal('victor');
  });
});

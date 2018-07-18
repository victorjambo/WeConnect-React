import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import NewReview from '../Components/Reviews/NewReview';
import Review from '../Components/Reviews/Review';
import Reviews from '../Components/Reviews/Reviews';

// configure enzyme adapter
configure({ adapter: new Adapter() });

describe('<NewReview />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NewReview title="title"
      desc="desc"
      logChange={() => {}}
      handleSubmit={() => {}}
      errors={{}}
      isLoading/>);
  });

  it('renders NewReview and contains required elements', () => {
    expect(wrapper.find('.review-body')).to.have.lengthOf(1);
  });
});

describe('<Review />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Review review={{ title: "title" }}
      deleteReview={() => {}} currentUser={() => {}} />);
  });
  it('renders Review without crushing and contains required elements', () => {
    expect(wrapper.find('.review')).to.have.lengthOf(1);
  });

  it('test review passes all props to wrapper', () => {
    expect(wrapper.find('.title').text()).to.equal('title');
  });
});

describe('<Reviews />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Reviews businessId="1" />);
  });

  it('Renders Reviews without crushing and contains required elements', () => {
    expect(wrapper.find('.reviews')).to.have.lengthOf(1);
  });
});

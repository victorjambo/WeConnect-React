import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import request from 'superagent';
import sinon from 'sinon';
import NewReview from '../Components/Reviews/NewReview';
import Review from '../Components/Reviews/Review';
import Reviews from '../Components/Reviews/Reviews';

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

  it('renders NewReview', () => {
    expect(wrapper.find('.review-body')).to.have.lengthOf(1);
  });
});

describe('<Review />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Review review={{ title: "title" }}
      deleteReview={() => {}} currentUser={() => {}} />);
  });
  it('renders Review without crushing', () => {
    expect(wrapper.find('.review')).to.have.lengthOf(1);
  });

  it('passes all props to wrapper', () => {
    expect(wrapper.find('.title').text()).to.equal('title');
  });
});

describe('<Reviews />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Reviews businessId="1" />);
  });

  it('Renders Reviews without crushing', () => {
    expect(wrapper.find('.reviews')).to.have.lengthOf(1);
  });

  it('fetches async reviews', () => {
    const url = '/api/v2/businesses/1/reviews';
    const result = [{ title: 1 }, { title: 2 }, { title: 3 }];
    const promise = Promise.resolve(result);
    sinon.stub(request, 'get').withArgs(url).returns(promise);
    promise.then(() => {
      expect(wrapper.state().reviews).to.equal(result);
    });
  });
});

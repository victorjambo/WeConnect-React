import React from 'react';
import request from 'superagent';
import notify from '../../helpers/notify.js';
import Textarea from '../../common/ElementComponents/Textarea.jsx';
import BASE_URL from '../../helpers/url.js';
import ButtonAuth from '../../common/ElementComponents/ButtonAuth.jsx';
import Input from '../../common/ElementComponents/Input.jsx';
import validateInput from '../../helpers/validations.js';

/**
 * leave a comment
 */
class NewReview extends React.Component {
  
  /**
   * constructor that takes
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      desc: '',
      errors: {},
      serverErrors: {},
      isLoading: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.logChange = this.logChange.bind(this);
  }
  
  /**
   * @returns {bool} true
   */
  isValid() {
    const { title, desc } = this.state;
    const { errors, isValid } = validateInput({ title, desc });

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }
  
  /**
   * @param {object} e
   * @returns {object} setState
   */
  handleSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ isLoading: true});
      const { title, desc } = this.state;
      const token = window.sessionStorage.getItem('token');
      const url = `${BASE_URL}/api/v2/businesses/${this.props.businessId}/reviews`;
      request
        .post(url)
        .set({ 'x-access-token': token })
        .send({ title, desc })
        .then((res) => {
          if (res.status === 201) {
            this.setState({ isLoading: false, title: '', desc: '' });
            notify('success', res.body.success);
          }
          else {
            this.setState({ errors: res.body.success, isLoading: false });
          }
        })
        .catch((err) => {
          notify('warning', err.response.body.warning);
          this.setState({ isLoading: false, serverErrors: err.response.body });
        });
    }
  }
  
  /**
   * @param {object} e event
   * @returns {object} setState
   */
  logChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  
  /**
   * @return {jsx} html to be rendered
   */
  render() {
    return (
      <div className="add-review bucket">
        <h2>Give us feedback</h2>
        <div className="review-body">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <Input label={true} classname="form-group" name="title" autoFocus="autofocus"
                value={this.state.title} onChange={this.logChange} placeholder="Review title" 
                error={this.state.errors.title}/>
              
              <Textarea name="desc" value={this.state.desc} onChange={this.logChange} 
                placeholder="Add Review" classname="desc" error={this.state.errors.desc}/>
            </div>
            <div className="form-group">
              <ButtonAuth disabled={this.state.isLoading} label="Submit" classname="btn btn-primary"/>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default NewReview;

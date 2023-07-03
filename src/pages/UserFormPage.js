import React, { Component } from 'react';
import PropTypes from 'prop-types';
import User from '../models/User';
import UserAPI from '../api/UserAPI';

export default class UserFormPage extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      userForm: {
        firstName: '',
        lastName: '',
      }
    }

    this.userAPI = new UserAPI();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    if (this.props.isEditing) {
      this.getUser(this.props.match.params.id);
    }
  }

  async getUser(id) {
    this.setState({ isLoading: true });

    try {
      const response = await this.userAPI.getUser(id);
      if (response.status === 200) {
        const user = new User({ ...response.data.data });
				this.setState({ userForm: user });
			}
			this.setState({ isLoading: false });
    } catch (e) {
      this.setState({ isLoading: false });
      alert(e.response.data?.message);
    }
  }

  handleKeyDown(event) {
    if (event.key === 'Enter') {
      this.handleSubmit();
    }
  }

  handleInputChange(key, event) {
    const userForm = { 
      ...this.state.userForm, 
      [key]: event.target.value 
    }
    this.setState({ userForm });
  }

  async handleSubmit() {
    this.setState({ isLoading: true });

    try {
      let response;
      if (!this.props.isEditing) {
        response = await this.userAPI.createUser(this.state.userForm);
      } else {
        response = await this.userAPI.updateUser(this.state.userForm);
      }

      if (response.status === 200) {
        this.props.history.goBack();
      }
    } catch (e) {
      alert(e.response.data?.message);
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { isEditing } = this.props;
    const { isLoading, userForm } = this.state;

    return <div>
      <h1>{ !isEditing ? 'Add' : 'Update' } User</h1>
      <div>
        <div className="my-4">
          <label className="block my-2" htmlFor="firstName"> First Name </label>
          <input 
            id="firstName" 
            type="text" 
            disabled={isLoading} 
            value={userForm.firstName} 
            onKeyDown={this.handleKeyDown} 
            onChange={this.handleInputChange.bind(this, 'firstName')}/>
        </div>

        <div className="my-4">
          <label className="block my-2" htmlFor="lastName"> Last Name </label>
          <input 
            id="lastName" 
            type="text"
            disabled={isLoading} 
            value={userForm.lastName} 
            onKeyDown={this.handleKeyDown} 
            onChange={this.handleInputChange.bind(this, 'lastName')}/>
        </div>

        <div className="text-right">
          <button className="btn-primary" disabled={isLoading} onClick={this.handleSubmit}>
            { !isEditing ? 'Submit' : 'Save Changes' }
          </button>
        </div>
      </div>
    </div>
  }
}

UserFormPage.propTypes = {
  isEditing: PropTypes.bool,
}
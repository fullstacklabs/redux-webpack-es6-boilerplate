import React, { Component, PropTypes } from 'react';

export default class LoginForm extends Component {
  static propTypes = {
    loginUser: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    var inputState = {};

    inputState[e.target.name] = e.target.value;
    this.setState(inputState);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.loginUser(this.state.email, this.state.password);
  }

  render() {
    let data = this.props.data;
    let errorMessage;
    if (data) {
      errorMessage = data.loginFailed ? 'Login failed' : '' ;
    }

    return (
      <div>
        <p>{errorMessage}</p>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email"> Email </label>
          <input name="email" type="email" onChange={this.handleChange}/>

          <label htmlFor="password"> Passord </label>
          <input name="password" type="password" onChange={this.handleChange}/>

          <input type="submit"/>
        </form>
      </div>
    );
  }
}

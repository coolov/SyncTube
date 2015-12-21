'use strict';

var React = require('react');

var LoginForm = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      password: ''
    }
  },
  usernameChange: function(event) {
    this.setState({username: event.target.value});
  },
  passwordChange: function(event) {
    this.setState({password: event.target.value});
  },
  loginFormSubmit: function(event) {
    event.preventDefault();
    console.log(this.state.username);
    console.log(this.state.password);
  },
  render: function() {
    return (
      <form onSubmit={this.loginFormSubmit}>
	<input type="text" value={this.state.username} onChange={this.usernameChange} name="username" />
	<input type="text" value={this.state.password} onChange={this.passwordChange} name="password" />
	<input type="submit" value="Login" />
      </form>
    );
  }
});

module.exports = {
  LoginForm: LoginForm
};

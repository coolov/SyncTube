'use strict';

var React = require('react');
var userStore = require('./../stores/userStore');
var userActions= require('./../actions/userActions');

var LoginForm = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      password: '',
      user: null
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
    userActions.login(this.state.username, this.state.password);
  },
  componentDidMount: function() {
    var self = this;
    userStore.onChange(function() {
      self.setState(userStore.getState());
    });
  },
  render: function() {
    console.log('=====');
    console.log(this.state.user);
    var foo = !this.state.user ? <h1>test</h1> : <h1>{this.state.user.username}</h1>;

    return (
      <div>
	{foo}
	<form onSubmit={this.loginFormSubmit}>
	  <input type="text" value={this.state.username} onChange={this.usernameChange} name="username" />
	  <input type="text" value={this.state.password} onChange={this.passwordChange} name="password" />
	  <input type="submit" value="Login" />
	</form>
      </div>
    );
  }
});

module.exports = {
  LoginForm: LoginForm
};

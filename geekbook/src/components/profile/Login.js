import React, { Component } from 'react';
import axios from 'axios';

class ProfilePage extends Component {

  constructor(props) {
      super(props);
      this.state = {
        usersObject:'',
        loginValid: true,
        username: '',
        password: '',
      };

      this.usernameChange = this.usernameChange.bind(this);
      this.passwordChange = this.passwordChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

  usernameChange(event) {
    this.setState({username: event.target.value});
  };
  passwordChange(event) {
    this.setState({password: event.target.value});
  }

  componentDidMount() {
    this.setState({usersObject:''});
    axios.get('http://localhost:4200/Users')
      .then(response => {
        this.setState({ usersObject: response.data });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  validateUsername() {
    if (this.state.usersObject instanceof Array) {
      for (var i = this.state.usersObject.length - 1; i >= 0; i--) {
        if ((this.state.usersObject[i].credentials.local.username == this.state.username)) {
          return true;
        }
      }
    }
    return false;
  }

  validatePassword() {
    if (this.state.usersObject instanceof Array) {
      for (var i = this.state.usersObject.length - 1; i >= 0; i--) {
        if ((this.state.usersObject[i].credentials.local.password == this.state.password)) {
          return true;
        }
      }
    }
    return false;
  }

  getUserID() {
    if (this.state.usersObject instanceof Array) {
      for (var i = this.state.usersObject.length - 1; i >= 0; i--) {
        if ((this.state.usersObject[i].credentials.local.username == this.state.username)) {
          return this.state.usersObject[i]._id;
        }
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    var userValid = false;
    var passValid = false;
    if (this.validateUsername()) {
      userValid = true;
    }

    if (this.validatePassword()) {
      passValid = true;
    }

     if (userValid && passValid) {
      this.props.history.push('../profile/' + this.getUserID());
    }

    if (!userValid || !passValid) {
      this.setState({loginValid: false});
    }
    else {
      this.setState({loginValid: true});
    }
  }

  render()
  {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          Username: <input type="text" value={this.state.username} onChange={this.usernameChange} required />
          Password: <input type="password" value={this.state.password} onChange={this.passwordChange} required /> <p/>
            {
              (!this.state.loginValid) &&
              'Wrong username or password. Please check your credentials.'
            } <p/>
        <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}


export default ProfilePage;

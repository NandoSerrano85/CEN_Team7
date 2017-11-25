import React, { Component } from 'react';
import UserService from './UserService';
import axios from 'axios';

class ProfilePage extends Component {

  constructor(props) {
      super(props);
      this.state = {
        usersObject:'',
        emailValid: true,
        usernameValid: true,
        username: '',
        password: '',
        fullName: '',
        email: '',
        nickname: '',
        id: '',
      };
      this.newUserService = new UserService();

      this.usernameChange = this.usernameChange.bind(this);
      this.passwordChange = this.passwordChange.bind(this);
      this.fullNameChange = this.fullNameChange.bind(this);
      this.emailChange = this.emailChange.bind(this);
      this.nicknameChange = this.nicknameChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

  usernameChange(event) {
    this.setState({username: event.target.value});
  };
  passwordChange(event) {
    this.setState({password: event.target.value});
  }
  fullNameChange(event) {
    this.setState({fullName: event.target.value});
  }
  emailChange(event) {
    this.setState({email: event.target.value});
  }
  nicknameChange(event) {
    this.setState({nickname: event.target.value});
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



  validateEmail() {
    if (this.state.usersObject instanceof Array) {
      for (var i = this.state.usersObject.length - 1; i >= 0; i--) {
        if ((this.state.usersObject[i].emails[0].email == this.state.email)) {
          return false;
        }
      }
    }
    return true;
  }

  validateUsername() {
    if (this.state.usersObject instanceof Array) {
      for (var i = this.state.usersObject.length - 1; i >= 0; i--) {
        if ((this.state.usersObject[i].credentials.local.username == this.state.username)) {
          return false;
        }
      }
    }
    return true;
  }

  getUserID() {
    if (this.state.usersObject instanceof Array) {
      for (var i = this.state.usersObject.length - 1; i >= 0; i--) {
        if ((this.state.usersObject[i].credentials.local.username == this.state.username)) {
          return(this.state.usersObject[i]._id);
        }
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.validateEmail()) {
      this.setState({emailValid: false});
    }
    else {
      this.setState({emailValid: true});
    }
    if (!this.validateUsername()) {
      this.setState({usernameValid: false});
    }
    else {
      this.setState({usernameValid: true});
    }

    if (this.validateEmail() && this.validateUsername()) {
      this.newUserService.sendData([this.state.username, this.state.password, this.state.fullName, this.state.email, this.state.nickname]);
      this.props.history.push('../login');
    }
  }

  render()
  {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
        Username: <input type="text" value={this.state.username} onChange={this.usernameChange} required />
            {
              (!this.state.usernameValid) &&
              'Username is taken. Please choose another one.'
            } <p/>
        Password: <input type="password" value={this.state.password} onChange={this.passwordChange} required /> <p/>
        Full Name: <input type="text" value={this.state.fName} onChange={this.fullNameChange} required /> <p/>
        Email: <input type="email" value={this.state.email} onChange={this.emailChange} required />
            {
              (!this.state.emailValid) &&
              'This email is already associated with an account here. Please log in.'
            } <p/>
        Public Nickname: <input type="text" value={this.state.nickname} onChange={this.nicknameChange} required /> <p/>
        <input type="submit" value="Cancel" />
        <input type="submit" value="Create Account" />
        </form>
      </div>
    );
  }
}


export default ProfilePage;

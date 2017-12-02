import React, { Component } from 'react';
import axios from 'axios';
import AppHeader from "../Header";
import '../../App.css';

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
      this.createAcct = this.createAcct.bind(this);
    }

  usernameChange(event) {
    this.setState({username: event.target.value});
  };
  passwordChange(event) {
    this.setState({password: event.target.value});
  }

  componentDidMount() {
    try {
      var cookieValid = false;
      if((new Date(this.getCookie("expires"))) >= (new Date()))
      {
        cookieValid = true;
      }

      if (cookieValid) {
        var x = this.getCookie('id');
        this.props.history.push('../profile/' + x);
      }
    }
    catch(err) {};
    this.setState({usersObject:''});
    axios.get('http://localhost:4200/user/')
      .then(response => {
          console.log(response)
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

  createAcct(event) {
      this.props.history.push('../signup');
  }

  getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
  }

  setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
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
      this.setCookie("id", this.getUserID(), 1)
      this.setCookie("expires", 'Thu, 28 Dec 2017 00:00:00 UTC', 1)
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
      <div className="login">
        <div className = "row">
          <div className="App">
            <AppHeader />
          </div>
        </div>
        <form onSubmit={this.handleSubmit}>
          Username: <input type="text" value={this.state.username} onChange={this.usernameChange} required /> <p/>
          Password: <input type="password" value={this.state.password} onChange={this.passwordChange} required /> <p/>
            {
              (!this.state.loginValid) &&
              'Wrong username or password. Please check your credentials.'
            } <p/>
        <input type="submit" value="Login" />
        <input type="submit" value="Create New Account" onClick={this.createAcct}/>
        </form>
      </div>
    );
  }
}


export default ProfilePage;

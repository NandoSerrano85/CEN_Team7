import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import AddressField from './AddressField';
import CreditCardField from './CreditCardField';
import axios from 'axios';
import UserService from './UserService';
import InputMask from 'react-input-mask';
import AppHeader from "../Header";
import '../../App.css';

class ProfilePage extends Component {


  constructor(props) {
    super(props);
    this.state = {
      userID: '',
      username: '',
      password: '',
      fName: '',
      email: '',
      phone: '',
      nickname: '',
    };
    this.newUserService = new UserService();

    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handlePersonalChange = this.handlePersonalChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.fNameChange = this.fNameChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.phoneChange = this.phoneChange.bind(this);
    this.logout = this.logout.bind(this);
    this.nicknameChange = this.nicknameChange.bind(this);
  }

  componentDidMount(){
    axios.get('http://localhost:4200/Users/edit/'+this.props.match.params.id)
    .then(response => {
      this.setState({ userID: this.props.match.params.id});
      this.setState({ username: response.data.credentials.local.username});
      this.setState({ password: response.data.credentials.local.password});
      this.setState({ fName: response.data.name});
      this.setState({ email: response.data.emails[0].email});
      try {
        this.setState({ phone: response.data.phones[0].phone});
      } catch(err) {}
      this.setState({ nickname: response.data.nickname});
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  handleLoginChange(event) {
    this.newUserService.updateLogin(this.state.password,this.state.userID);
  }
  handlePersonalChange(event) {
    this.newUserService.updatePersonal([this.state.fName, this.state.email, this.state.phone, this.state.nickname],this.state.userID);
  }

  passwordChange(event) {
    this.setState({password: event.target.value});
  }
  fNameChange(event) {
    this.setState({fName: event.target.value});
  }
  emailChange(event) {
    this.setState({email: event.target.value});
  }
  phoneChange(event) {
    this.setState({phone: event.target.value});
  }
  nicknameChange(event) {
    this.setState({nickname: event.target.value});
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

  logout(event) {
    this.setCookie('expires', 'Thu, 01 Jan 1970 00:00:00 UTC', -10);
    this.props.history.push('../login');
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
          <Tabs>
            <TabList>
              <Tab>Login Info</Tab>
              <Tab>Personal Info</Tab>
              <Tab>Address Info</Tab>
              <Tab>Payment Info</Tab>
            </TabList>
            <TabPanel>
              <form onSubmit={this.handleLoginChange}>
                Username: <input type="text" disabled="true" value={this.state.username} /> <p/>
                Password: <input type="password" value={this.state.password} onChange={this.passwordChange} /> <p/>
                <input type="button" value="Log Out" onClick={this.logout}/>
                <input type="submit" value="Submit Changes" />
              </form>
            </TabPanel>
            <TabPanel>
              <form onSubmit={this.handlePersonalChange}>
                Full Name: <input type="text" value={this.state.fName} onChange={this.fNameChange} /> <p/>
                Email: <input type="email" value={this.state.email} onChange={this.emailChange} /> <p/>
                Phone Number: <InputMask mask="(999) 999-9999" value={this.state.phone} onChange={this.phoneChange} /> <p/>
                Public Nickname: <input type="text" value={this.state.nickname} onChange={this.nicknameChange} /> <p/>
                <input type="submit" value="Submit Changes" />
              </form>
            </TabPanel>
            <TabPanel>
              <AddressField userID={this.state.userID} />
            </TabPanel>
            <TabPanel>
              <CreditCardField userID={this.state.userID}/>
            </TabPanel>
          </Tabs>
    </div>

    );

  }

}


export default ProfilePage;

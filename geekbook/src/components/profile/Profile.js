import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import AddressField from './AddressField';
import CreditCardField from './CreditCardField';
import axios from 'axios';
import UserService from './UserService';
import InputMask from 'react-input-mask';

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

  render()
  {
    return (
      <div className="App">
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

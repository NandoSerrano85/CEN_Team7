import React, { Component } from 'react';


//import Tabs from 'react-simpletabs';
//import TabPanel from 'react-tab-panel';
//import 'react-tab-panel/index.css';


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
/*

          <TabPanel>
            <div tabTitle="Login Info">
              Username: <input type="text" value={this.state.username} onChange={this.usernameChange} /> <p/>
              Password: <input type="password" value={this.state.password} onChange={this.passwordChange} /> <p/>
            </div>  
            <div tabTitle="Personal Info">
              Full Name: <input type="text" value={this.state.username} onChange={this.usernameChange} /> <p/>
              Email: <input type="password" value={this.state.password} onChange={this.passwordChange} /> <p/>
              Public Nickname: <input type="password" value={this.state.password} onChange={this.passwordChange} /> <p/>
            </div>
          </TabPanel>
          */

  render()
  {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>


        </form>
    </div>

    );

  }

}


export default ProfilePage;

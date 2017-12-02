import React, { Component } from "react";
import axios from 'axios';
import { Navbar, Nav, NavItem, Glyphicon, NavDropdown, MenuItem } from "react-bootstrap";

import "../App.css";

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
          loggedIn:false,
          id: '',
          cart_qty: '',
        }
    }

    componentDidMount() {
        try {
          var cookieValid = false;
          if((new Date(this.getCookie("expires"))) >= (new Date()))
          {
            cookieValid = true;
          }

          if (cookieValid) {
            this.setState({ loggedIn: true });
          }
        }
        catch(err) {};
        axios.get('http://localhost:4200/cart/shopping-cart', {withCredentials: true})
        .then((response) => {
            this.setState({ cart_qty: response.data.Qty })
        })
        .catch(function (error) {
            console.log(error);
        })

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

    render() {
        const login = this.state.loggedIn;

        return (
            <Navbar fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">Welcome to Geekstore</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <NavItem eventKey={1} href="/">
                            Home
                        </NavItem>
                        {!login ? (
                        <NavDropdown title="Profile" eventKey={2} href="#">
                            <MenuItem href="/login">Login</MenuItem>
                            <MenuItem href="/signup">Sign up</MenuItem>
                        </NavDropdown>
                        ) : (
                        <NavDropdown title="Profile" eventKey={2} href="#">
                            <MenuItem href="/login">Account</MenuItem>
                        </NavDropdown>
                        )}
                        <NavItem eventKey={3} href="/cart">
                            <Glyphicon glyph="shopping-cart" /><span className="badge">{this.state.cart_qty}</span>
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Header;

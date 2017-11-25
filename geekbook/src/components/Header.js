import React, { Component } from "react";
import { Navbar, Nav, NavItem, Glyphicon } from "react-bootstrap";

import "../App.css";

class Header extends Component {
  render() {
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
            <NavItem eventKey={2} href="#">
              <ul>Profile
                <li><a href="/login">Login</a></li>
                <li><a href="/signup">Sign up</a></li>
                <li><a href="/profile/">Account</a></li>
              </ul>
            </NavItem>
            <NavItem eventKey={3} href="#">
              <Glyphicon glyph="shopping-cart" />
              {" Cart"}
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;

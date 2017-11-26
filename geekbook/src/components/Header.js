import React, { Component } from "react";
import { Navbar, Nav, NavItem, Glyphicon, NavDropdown, MenuItem } from "react-bootstrap";

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
            <NavDropdown title="Profile" eventKey={2} href="#">
                <MenuItem href="/login">Login</MenuItem>
                <MenuItem href="/signup">Sign up</MenuItem>
                <MenuItem href="/profile/">Account</MenuItem>
            </NavDropdown>
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

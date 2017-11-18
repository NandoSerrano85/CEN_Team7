import React, { Component } from "react";
import { Navbar, Nav, NavItem, Glyphicon } from "react-bootstrap";

import "../App.css";

class AppHeader extends Component {
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
            <NavItem eventKey={1} href="#">
              Home
            </NavItem>
            <NavItem eventKey={2} href="#">
              Profile
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

export default AppHeader;

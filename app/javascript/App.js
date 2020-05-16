// app/javascript/App.js
import React from 'react';
import {
  HashRouter as Router,
  Link
} from "react-router-dom";
import Routes from './Routes';

import { ToastContainer } from 'react-toastify';

import {
  Navbar, NavbarBrand, Container, Nav,
  NavItem,
  NavLink, UncontrolledDropdown, ButtonGroup, ButtonDropdown, Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';

import 'react-toastify/dist/ReactToastify.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends React.Component {
  render() {
    console.count("Render App")
    return (
      <div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false} />
        <Navbar color="primary" dark expand="md" className="clearfix">
          <NavbarBrand href="/">{this.props.appName}</NavbarBrand>
        </Navbar>
        <Container style={{paddingTop: '10px'}}>
          <Router>
            <Routes />
          </Router>
        </Container>
      </div >
    );
  }
}

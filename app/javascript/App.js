// app/javascript/App.js
import React from 'react';
import {
  HashRouter as Router
} from "react-router-dom";
import Routes from './Routes';

import actionCable from 'actioncable';

import { ToastContainer, toast } from 'react-toastify';

import { Navbar, NavbarBrand, NavbarText, Container, Button } from 'reactstrap';

import 'react-toastify/dist/ReactToastify.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import currentUser from './bundles/support/currentUser'

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.cable = actionCable.createConsumer('ws://localhost:3000/cable');

    this.cable.subscriptions.create({
      channel: `AssetsChannel`
    }, {
      connected: () => {
        console.log("Cable connected!")
      },
      disconnected: () => {
        console.log("Cable disconnected!")
      },
      received: (message) => {
        console.debug('Cable message =>', message);
        let msg = null;
        switch (message.action) {
          case 'update':
            msg = `${message.type} [id:${message.asset}] updated!`
            break;
          case 'create':
            msg = `${message.type} [id:${message.asset}] created!`
            break;
          case 'destroy':
            msg = `${message.type} [id:${message.asset}] deleted!`
            break;
          case 'buy':
            msg = `${message.type} [id:${message.asset}] purchased!`
            currentUser.emit('change');
            break;
          default:
            break;
        }
        if (msg) toast.success(msg);
      }
    })
  }

  componentDidMount() {
    currentUser.setUser(this.props.currentUser);
    console.log('currentUser', this.props.currentUser);
    console.log('userSession', this.props.userSession);
  }

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
        <Container style={{ paddingTop: '10px' }}>
          <Router>
            <Routes />
          </Router>
        </Container>
      </div >
    );
  }
}

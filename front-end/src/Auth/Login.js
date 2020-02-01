import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import { Redirect } from 'react-router-dom'

import 'mdbreact/dist/css/mdb.css';
import '../fontawesome/css/all.css'
import {authController} from '../Controllers/AuthController';
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    }
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }
  }
  mySubmitHandler = (e) => {
    e.preventDefault();
    var email = document.querySelector("#email");
    var password = document.querySelector("#password");
    var bodyFormData = {
      'email': email.value,
      'password': password.value
    };
    var self = this;
    authController.Login(bodyFormData).then(function (response) {
      self.setRedirect();
    });
  }

  render = () => {
    return (
      <div>
        {this.renderRedirect()}
        <MDBContainer>
          <MDBRow>
            <MDBCol md="6">
              <form onSubmit={this.mySubmitHandler}>
                <p className="h5 text-center mb-4">Sign in</p>
                <div className="grey-text">
                  <MDBInput
                    id="email"
                    label="Type your email"
                    icon="envelope"
                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput
                    id="password"
                    label="Type your password"
                    icon="lock"
                    group
                    type="password"
                    validate
                  />
                </div>
                <div className="text-center">
                  <MDBBtn type="submit">Login</MDBBtn>
                </div>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  };

}
export default Login;


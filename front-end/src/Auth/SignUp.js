import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import Header from '../BaseUI/Header';
import NavigationBar from '../BaseUI/NavigationBar';

import 'mdbreact/dist/css/mdb.css';
import '../fontawesome/css/all.css'
const API_URL = 'http://localhost:5000';

class SignUp extends React.Component
{
    constructor(props)
    {
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
    mySubmitHandler=(e)=>{
        e.preventDefault();
        var email = document.querySelector("#email");
        var password = document.querySelector("#password");
        var bodyFormData = {
            'email': email.value,
            'password': password.value
        }
        const url_ = `${API_URL}/UserManagement/SignUp`;
        var self=this;
        axios({
            method: 'post',
            url: url_,
            data: bodyFormData,
            config: { headers: {'Content-Type': 'application/json' }}
            })
            .then(function (response) {
                //handle success
                //var auth_token = response.data["token"];
                //localStorage.setItem("AUTH_TOKEN",auth_token);
                console.log(response);
                self.setRedirect();
                //this.props.history.push('/')
                //window.location.href='localhost:3000';
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
    }
    
    render = () => {
        return (
            <div>
                {this.renderRedirect()}
                <Header/> 
         <NavigationBar/> 
          <MDBContainer>
            <MDBRow>
              <MDBCol md="6">
                <form  onSubmit={this.mySubmitHandler}>
                  <p className="h5 text-center mb-4">Sign Up</p>
                  <div className="grey-text">
                  <MDBInput
                      id="username"
                      label="Type your username"
                      icon="user"
                      group
                      type="text"
                      validate
                      error="wrong"
                      success="right"
                    />
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
                    <MDBBtn type="submit">Sign Up</MDBBtn>
                  </div>
                </form>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
          </div>
        );
      };
      
}
export default SignUp;


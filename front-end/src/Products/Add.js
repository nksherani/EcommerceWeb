import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import Header from '../BaseUI/Header';
import NavigationBar from '../BaseUI/NavigationBar';

import 'mdbreact/dist/css/mdb.css';
import '../fontawesome/css/all.css'
const API_URL = 'http://localhost:5000';
var config = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5rc2hlcmFuaUBvdXRsb29rLmNvbSIsImVtYWlsIjoibmtzaGVyYW5pQG91dGxvb2suY29tIiwiaWF0IjoxNTgwNDA3MjA5fQ.Xjf-pACKHqpXvg74PGzLuOEuVhtfTbvySml1f1Y2hAI'
    }
};

class Add extends React.Component
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
        var productName = document.querySelector("#productName");
        var productCode = document.querySelector("#productCode");
        var bodyFormData = {
            'ProductName': productName.value,
            'ProductCode': productCode.value
        }
        const url_ = `${API_URL}/Products/Add`;
        var self=this;
        console.log(bodyFormData);
        axios({
            method: 'post',
            url: url_,
            data: bodyFormData,
            config: config
            })
            .then(function (response) {
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
                    <br/>
                  <p className="h5 text-center mb-4">Add Product</p>
                  <div className="grey-text">
                  <MDBInput
                      id="productName"
                      label="Type Product Name"
                      icon="star"
                      group
                      type="text"
                      validate
                      error="wrong"
                      success="right"
                    />
                     <MDBInput
                      id="productCode"
                      label="Type Product Code"
                      icon="circle"
                      group
                      type="text"
                      validate
                      error="wrong"
                      success="right"
                    />
                   
                  </div>
                  <div className="text-center">
                    <MDBBtn type="submit">Add Product</MDBBtn>
                  </div>
                </form>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
          </div>
        );
      };
      
}
export default Add;


import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import Header from '../BaseUI/Header';
import NavigationBar from '../BaseUI/NavigationBar';
import { productsController } from '../Controllers/ProductsController';

import 'mdbreact/dist/css/mdb.css';
import '../fontawesome/css/all.css'
const API_URL = 'http://localhost:5000';


class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      selectedFile: null
    }
  }
  onChangeHandler = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    });
    console.log(event.target.files[0]);
  }
  onClickUploadButton = event => {
    productsController.BulkUpload(this.state.selectedFile);

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
    var productName = document.querySelector("#productName");
    var productCode = document.querySelector("#productCode");
    var bodyFormData = {
      'ProductName': productName.value,
      'ProductCode': productCode.value
    }
    productsController.AddProduct(bodyFormData);
  }

  render = () => {
    return (
      <div>
        {this.renderRedirect()}
        <Header />
        <NavigationBar />
        <MDBContainer>
          <MDBRow>
            <MDBCol md="6">
              <input type="file" name="file" onChange={this.onChangeHandler} />
              <MDBBtn type="button" onClick={this.onClickUploadButton}>Bulk Upload Products</MDBBtn>
              <form onSubmit={this.mySubmitHandler}>
                <br />
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


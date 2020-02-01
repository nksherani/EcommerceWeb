import axios from 'axios';

const API_URL = 'http://localhost:5000/Products';
export const productsController = {
    AddProduct, BulkUpload, API_URL
};
function BulkUpload(file)
{
    const url_ = `${API_URL}/Upload`;
    var config = {
      headers: {
        'Authorization': 'bearer ' + localStorage.getItem("AUTH_TOKEN"),
        'Content-Type': 'multipart/form-data'
      }
    };
    console.log(config);
    const data = new FormData();
    data.append('file', file);
    return axios.post(url_,data,config)

      .then(function (response) {
        console.log(response);
        //self.setRedirect();
      })
      .catch(function (response) {
        console.log(response);
      });
}
function AddProduct(bodyFormData)
{
    const url_ = `${API_URL}/Add`;
    //var self=this;
    var config_ = {
      headers: {
        'Authorization': 'bearer ' + localStorage.getItem("AUTH_TOKEN"),
        'Content-Type': 'application/json'
      }
    };
    axios.post(url_,bodyFormData,config_)
      .then(function (response) {
        console.log(response);
        //self.setRedirect();
      })
      .catch(function (response) {
        console.log(response);
      });
}
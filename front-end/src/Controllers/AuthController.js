import axios from 'axios';

const API_URL = 'http://localhost:5000';
export const authController = {
    Login, signUp,logout, API_URL
};
function Login(bodyFormData) {
    const url_ = `${API_URL}/auth/login/`;
    return axios({
        method: 'post',
        url: url_,
        data: bodyFormData,
        config: { headers: { 'Content-Type': 'application/json' } }
    })
        .then(function (response) {
            //handle success
            var auth_token = response.data["token"];
            localStorage.setItem("AUTH_TOKEN", auth_token);
            console.log(response);
            //this.props.history.push('/')
            //window.location.href='localhost:3000';
            return true;
        })
        .catch(function (response) {
            //handle error
            console.log(response);
            return false;
        });

}
function signUp(bodyFormData) {
    const url_ = `${API_URL}/UserManagement/SignUp`;
    //var self = this;
    axios({
        method: 'post',
        url: url_,
        data: bodyFormData,
        config: { headers: { 'Content-Type': 'application/json' } }
    })
        .then(function (response) {
            //handle success
            //var auth_token = response.data["token"];
            //localStorage.setItem("AUTH_TOKEN",auth_token);
            console.log(response);
            //self.setRedirect();
            //this.props.history.push('/')
            //window.location.href='localhost:3000';
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
}
function logout() {
    localStorage.removeItem("AUTH_TOKEN");
}
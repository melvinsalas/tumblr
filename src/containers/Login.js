import '../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js';
import '../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { API_SERVER } from '../constants.js';
import TumblrLogo from '../assets/images/tumblr.svg';

require('./login.scss');

class Login extends React.Component {

    // constructors and states init
    constructor() {
        super();
        this.state = {
            user: {
                email: '',
                password: '',
                name: '',
                photo: 'https://s3.us-east-2.amazonaws.com/melvinsalas.tumblr/default/unnamed.png',
                blogname: '',
            },
            next: false,
            passwordError: false,
            signup: false,
            userError: false,
            loadingImage: false,
            token: 'bWVsdmluQG1lbHZpbnNhbGFzLmNvbTo1ZjRkY2MzYjVhYTc2NWQ2MWQ4MzI3ZGViODgyY2Y5OQ=='
        }
    }

    // review regex and show password field
    next = () => {
        var regexSingleTag = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        if (!!regexSingleTag.exec(this.state.user.email)) {
            this.setState({ next: true });
        } else {
            this.setState({ userError: true });
        }
    }

    showSignUp = () => {
        this.setState({ 
            signup: true
        });
    }

    // review regex and save info in local storage
    log = () => {
        const { history } = this.props;
        var regexMinLen = /^[a-zA-Z0-9]{5,}$/;
        if (!!regexMinLen.exec(this.state.user.password)) {
            var md5 = require('md5');
            var axios = require('axios');

            var token = this.base64EncodingUTF8(this.state.user.email + ':' + md5(this.state.user.password));
            
            var instance = axios.create({
                baseURL: API_SERVER,
                headers: { 'Authorization': 'Basic ' + token }
            });

            const self = this;
            instance.get('/auth')
                .then(function (response) {
                    localStorage.setItem('token', token);
                    localStorage.setItem('name', response.data.name);
                    localStorage.setItem('photo', response.data.photo);
                    history.push('/');
                })
                .catch(function (error) {
                    console.log(error);
                    self.setState({ 
                        passwordError: true
                    });
                });

        } else {
            this.setState({ passwordError: true });
        }
    }

    makeSignup = () => {
        const { history } = this.props;
        var regexSingleTag = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        if (!!regexSingleTag.exec(this.state.user.email)) {
            var regexMinLen = /^[a-zA-Z0-9]{5,}$/;
            if (!!regexMinLen.exec(this.state.user.password)) {

                var md5 = require('md5');
                var axios = require('axios');

                const user = JSON.parse(JSON.stringify(this.state.user ));
                user.password = md5(user.password);
                const self = this;
                var instance = axios.create({
                    baseURL: API_SERVER,
                    headers: { 'Authorization': 'Basic ' + self.state.token }
                });

                instance.post('/users', user)
                    .then(function (response) {
                        self.log();
                    })
                    .catch(function (error) {
                        console.log('error', error);
                    });

            } else {
                this.setState({ passwordError: true });
            }
        } else {
            this.setState({ userError: true });
        }
    }

    base64EncodingUTF8(text) {
        var base64 = require('base-64');
        var utf8 = require('utf8');
        var bytes = utf8.encode(text);
        var encoded = base64.encode(bytes);
        return encoded;
    }

    // handler user input changes
    userHandleChange(event) {
        let newUser = this.state.user;
        newUser.email = event.target.value.toLowerCase();
        this.setState({
            user: newUser,
            userError: false
        });
    }

    // handles password input changes
    passHandleChange(event) {
        let newUser = this.state.user;
        newUser.password = event.target.value;
        this.setState({
            user: newUser,
            passwordError: false
        });
    }

    // handles password input changes
    nameHandleChange(event) {
        let newUser = this.state.user;
        newUser.name = event.target.value;
        this.setState({
            user: newUser
        });
    }

    // handles password input changes
    blognameHandleChange(event) {
        let newUser = this.state.user;
        newUser.blogname = event.target.value;
        this.setState({
            user: newUser
        });
    }

    loadfile = (e) => {
        const self = this;
        if (e.target.files.length) {
            this.setState({
                loadingImage: true
            });
            var file = e.target.files[0];
            var reader = new FileReader();
            reader.readAsBinaryString(file);
            reader.onload = function () {

                var axios = require('axios');
                var instance = axios.create({
                    baseURL: API_SERVER,
                    headers: { 'Authorization': 'Basic ' + self.state.token }
                });
                instance.post('/media', {
                    name: file.name,
                    bytes: btoa(reader.result)
                })
                    .then(function (response) {
                        var user = self.state.user;
                        user.photo = ("https://s3.us-east-2.amazonaws.com/melvinsalas.tumblr/" + response.data);
                        self.setState({
                            user: user,
                            loadingImage: false
                        });
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            reader.onerror = function () {
                console.log('there are some problems');
            };
        } else {
            console.log('You need to select a file');
        }
    }

    // render method
    render() {
        // bind change handlers
        let userHandleChange = this.userHandleChange.bind(this);
        let passHandleChange = this.passHandleChange.bind(this);
        let nameHandleChange = this.nameHandleChange.bind(this);
        let blognameHandleChange = this.blognameHandleChange.bind(this);
        let loadfile = this.loadfile.bind(this); 

        // return the render
        return (
            <div className="login-back">
                <div className="login-transparency"></div>
                <div className="login-gradient"></div>
                <div className="login row">
                    <div className="login-form col-md-offset-4 col-md-4 col-sm-offset-3 col-sm-6 text-center">
                        <img src={TumblrLogo} alt="tumblr" className="logo" />
                        <div>
                            {this.state.signup && 
                                <div>
                                    <div className="col-xs-12 user-form">
                                        <div className="col-xs-3 panel">
                                            <input onChange={this.loadfile} className="input-hide" type="file"/>
                                            {this.state.loadingImage && 
                                                <span className="photo-user">loading...</span>
                                            }
                                            {!this.state.loadingImage && 
                                                <img className="photo-user" src={this.state.user.photo} alt="Photo"/>
                                            }
                                        </div>
                                        <div className="col-xs-offset-1 col-xs-8 form-new-user">
                                            <input placeholder="Name"
                                                value={this.state.user.name}
                                                className="form-control input-lg login-round-up"
                                                onChange={nameHandleChange} />
                                            <input placeholder="Blogname"
                                                value={this.state.user.blogname}
                                                className="form-control input-lg login-round-down"
                                                onChange={blognameHandleChange} />
                                        </div>
                                    </div>
                                </div>
                            }
                            <input type="email"
                                value={this.state.user.email}
                                onChange={userHandleChange}
                                className={`form-control input-lg ${this.state.userError && "inputError"} ${(this.state.next || this.state.signup) && "login-round-up"}`}
                                disabled={this.state.next}
                                placeholder="Email" />
                            {!this.state.next && !this.state.signup && 
                                <div>
                                    <button onClick={this.next} className="btn btn-login btn-lg btn-block"><strong>Next</strong></button>
                                    <button onClick={this.showSignUp} className="btn btn-signup btn-lg btn-block"><strong>Sign up</strong></button>
                                </div>
                            }
                            {this.state.next && 
                                <div>
                                    <input type="password"
                                        value={this.state.user.password}
                                        onChange={passHandleChange}
                                        className={`form-control input-lg ${this.state.passwordError && "inputError"} login-round-down`}
                                        placeholder="Password" />
                                    <button onClick={this.log} className="btn btn-login btn-lg btn-block"><strong>Login</strong></button>
                                </div>
                            }
                            {this.state.signup && 
                                <div>
                                    <input type="password"
                                        value={this.state.user.password}
                                        onChange={passHandleChange}
                                        className={`form-control input-lg ${this.state.passwordError && "inputError"} login-round-down`}
                                        placeholder="Password" />
                                    <button onClick={this.makeSignup} className="btn btn-login btn-lg btn-block"><strong>Create user</strong></button>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="login-footer col-md-offset-4 col-md-4 col-sm-offset-3 col-sm-6">
                        <div className="col-xs-3">Terms</div>
                        <div className="col-xs-3">Privacy</div>
                        <div className="col-xs-3">Jobs</div>
                        <div className="col-xs-3">Support</div>
                    </div>
                </div>
            </div>
        );
    };
}

export default connect()(Login);
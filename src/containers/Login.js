import '../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js';
import '../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { API_SERVER } from '../constants.js';

require('./login.scss');

class Login extends React.Component {

    // constructors and states init
    constructor() {
        super();
        this.state = {
            next: false,
            user: 'melvin@melvinsalas.com',
            userError: false,
            password: 'password',
            passwordError: false
        }
    }

    // review regex and show password field
    next = () => {
        var regexSingleTag = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        if (!!regexSingleTag.exec(this.state.user)) {
            this.setState({ next: true });
        } else {
            this.setState({ userError: true });
        }
    }

    // review regex and save info in local storage
    log = () => {
        const { history } = this.props;
        var regexMinLen = /^[a-zA-Z0-9]{5,}$/;
        if (!!regexMinLen.exec(this.state.password)) {
            var md5 = require('md5');
            var axios = require('axios');
            var token = this.base64EncodingUTF8(this.state.user + ':' + md5(this.state.password));
            
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
                    localStorage.setItem('username', response.data.userName);
                    history.push('/home');
                })
                .catch(function (error) {
                    console.log(error);
                });

        } else {
            this.setState({ passwordError: true });
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
        this.setState({
            user: event.target.value.toLowerCase(),
            userError: false
        });
    }

    // handles password input changes
    passHandleChange(event) {
        this.setState({
            password: event.target.value,
            passwordError: false
        });
    }

    // render method
    render() {
        // bind change handlers
        let userHandleChange = this.userHandleChange.bind(this);
        let passHandleChange = this.passHandleChange.bind(this);

        // return the render
        return (
            <div className="login-back">
                <div className="login-transparency"></div>
                <div className="login-gradient"></div>
                <div className="login row">
                    <div className="login-form col-md-offset-4 col-md-4 col-sm-offset-3 col-sm-6 text-center">
                        <img src="src/assets/images/tumblr.svg" alt="tumblr" className="logo" />
                        <div>
                            <input type="email"
                                value={this.state.user}
                                onChange={userHandleChange}
                                className={`form-control input-lg ${this.state.userError && "inputError"} ${this.state.next && "login-round-up"}`}
                                disabled={this.state.next}
                                placeholder="Email" />
                            {this.state.next && (<div>
                                <input type="password"
                                    value={this.state.password}
                                    onChange={passHandleChange}
                                    className={`form-control input-lg ${this.state.passwordError && "inputError"} login-round-down`}
                                    placeholder="Passport" />
                                <button onClick={this.log} className="btn btn-login btn-lg btn-block"><strong>Login</strong></button>
                            </div>)}
                            {!this.state.next && (<div>
                                <button onClick={this.next} className="btn btn-login btn-lg btn-block"><strong>Next</strong></button>
                                <Link to="/home" className="btn btn-signup btn-lg btn-block"><strong>Sign up</strong></Link>
                            </div>)}
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
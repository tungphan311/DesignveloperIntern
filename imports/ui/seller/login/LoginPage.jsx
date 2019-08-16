import React, { Component } from 'react';
import './login-page.css';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            isValid: true,
        }
    }

    textChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
            isValid: true,
        });

        this.normalInput();
    }

    normalInput = () => {
        document.getElementById('email').style.backgroundColor = "white";
        document.getElementById('email').style.border = "solid 1px #ededed";

        document.getElementById('password').style.backgroundColor = "#f6f6f6";
        document.getElementById('password').style.border = "solid 1px #ededed";
    }

    inputInvalid = () => {
        document.getElementById('email').style.backgroundColor = "rgba(246, 63, 69, 0.4)";
        document.getElementById('email').style.borderColor = "#f63f45";

        document.getElementById('password').style.backgroundColor = "rgba(246, 63, 69, 0.4)";
        document.getElementById('password').style.borderColor = "#f63f45";
    }

    login = () => {
        const { email, password } = this.state;
        if (email != 'tungpt@dgroup.co') {
            this.setState({isValid: false});
            this.inputInvalid();
            return;
        }

        Meteor.loginWithPassword(email, password, (error) => {
            if (error) {
                // alert(error);
                this.setState({
                    isValid: false,
                });
                this.inputInvalid();
            } else {
                this.props.history.push('/admin');
            } 
        });
    }

    render() { 
        return ( 
            <div className="login-page">
                <img src="/logo@3x.png" alt="logo" className="login-page-logo" />
                <div className="login-form">
                    <div className="login-text-center">Log in</div>

                    <div className="error-text-container">
                        { !this.state.isValid && 
                            <div className="login-error-text">Your e-mail/password is invalid!</div>
                        }
                    </div>

                    <label className="label-text">Email</label>
                    <input className="login-page-input" type="email" placeholder="email@sample.com" onChange={this.textChange}
                        id="email" name="email" />
                    <label className="label-text" id="password-label">Password</label>
                    <input className="login-page-input" type="password" placeholder="Enter password" onChange={this.textChange}
                        id="password" name="password" />

                    <button className="login-page-login-button" disabled={!this.state.email || !this.state.password}
                        onClick={this.login}>
                        Log in
                        </button>
                    <button className="login-page-forgotpass-button">Forgot password</button>
                </div>
            </div>
        );
    }
}
 
export default LoginPage;
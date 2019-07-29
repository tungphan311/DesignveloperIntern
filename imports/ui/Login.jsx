import React from 'react';
import { Meteor } from 'meteor/meteor'
import SignUpModal from './SignUp';

export default class LoginModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            showSignupModal: false,
            isValid: true,
        }
    }

    resetPassword = (event) => {
        event.preventDefault();
    }

    // xử lý khi nhập input
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

    // xử lý khi nhấn login
    login = (event) => {
        event.preventDefault();
        console.log('login');
        const { email, password } = this.state;
        Meteor.loginWithPassword(email, password, (error) => {
            if (error) {
                console.log(error);
                this.setState({
                    isValid: false,
                });
                this.inputInvalid();
            } 
            else {
                console.log('logged in');
            }
        });

        this.props.close();
    }

    // đổi màu input khi invalid
    inputInvalid = () => {
        document.getElementById('emailInput').style.backgroundColor = "rgba(246, 63, 69, 0.04)";
        document.getElementById('emailInput').style.borderColor = "#f63f45";

        document.getElementById('passwordInput').style.backgroundColor = "rgba(246, 63, 69, 0.04)";
        document.getElementById('passwordInput').style.borderColor = "#f63f45";
    }

    // hàm chuyển input về lại bình thường
    normalInput = () => {
        document.getElementById('emailInput').style.backgroundColor = "#f6f6f6";
        document.getElementById('emailInput').style.border = "solid 1px #b7b7b7";

        document.getElementById('passwordInput').style.backgroundColor = "#f6f6f6";
        document.getElementById('passwordInput').style.border = "solid 1px #b7b7b7";
    }

    render() {
        return (
            <div>
                <div className="modal-body">
                    <button className="close" onClick={this.props.close}>
                        &times;
                    </button> 
                    <br />
                    <label className="title">Log In</label>
                    { !this.state.isValid && 
                        <div className="login-error text-center">Your e-mail/password is invalid!</div>
                    }

                    <form className="form-group">
                        <label className="input-label">E-MAIL</label>
                        <input type="email" name="email" placeholder="Enter your email..." id="emailInput"
                            className="form-control" onChange={this.textChange}/>

                        <label className="input-label margin-top-20">PASSWORD</label>
                        <input type="password" name="password" placeholder="Enter your password..." id="passwordInput"
                            className="form-control" onChange={this.textChange}/>

                        <ul className="list-inline">
                            <li className="list-item-inline">
                                <input type="checkbox" />
                            </li>
                            <li className="list-item-inline">
                                <span className="checkbox-text">Remember password</span>
                            </li>
                            <li className="list-item-inline">
                                <button className="btn-forgotPass" onClick={this.resetPassword}>Forgot your password?</button>  
                            </li>
                        </ul>

                        <button disabled={!this.state.email || !this.state.password} className="btn-login" onClick={this.login}>Log In</button>
                    </form>
                </div>
                <div className="modal-footer">
                    <ul className="list-inline text-center">
                        <span className="footer-text">Don't have an account?</span>
                        <button className="btn-haveAccount" onClick={this.props.register}>Register</button>
                    </ul>
                </div>
            </div>
        );
    }
}
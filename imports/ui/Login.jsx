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
        }
    }

    resetPassword = (event) => {
        event.preventDefault();
    }

    textChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    login = (event) => {
        event.preventDefault();
        console.log('login');
        const { email, password } = this.state;
        Meteor.loginWithPassword(email, password, (error) => {
            if (error) {
                console.log(error);
            } 
            else {
                console.log('logged in');
            }
        })
    }

    register = () => {
        this.setState({
            showSignupModal: true,
        })
    }

    closeRegister = () => {
        this.setState({
            showSignupModal: false,
        })
    }

    render() {
        let styles = this.props.show ? { display: "block" } : { display: "none" };
        return (
            <div id="login" className="modal fade in" role="dialog" style={styles}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <button className="close" onClick={this.props.close}>
                                &times;
                            </button> 
                            <br />
                            <label className="title">Log In</label>

                            <form className="form-group">
                                <label className="input-label">E-MAIL</label>
                                <input type="email" name="email" placeholder="Enter your email..." 
                                    className="form-control" onChange={this.textChange}/>

                                <label className="input-label margin-top-20">PASSWORD</label>
                                <input type="password" name="password" placeholder="Enter your password..." 
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
                                <button className="btn-haveAccount" onClick={this.register}>Register</button>
                            </ul>
                        </div>
                    </div>
                </div>
                <SignUpModal show={this.state.showSignupModal} close={this.closeRegister} />
            </div>
        );
    }
}
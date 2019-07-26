import React from 'react';
import { Accounts } from 'meteor/accounts-base';

class SignUpModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            register: false,
        }
    }

    textChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
            register: false,
        });
    }

    nameValidation = () => {
        const name = this.state.name;

        if (name.length == 0) {
            return false;
        }

        if (typeof name !== "undefined") {
            if (!name.match(/^[a-zA-Z]+$/)) {
                return false;
            }
        }
        return true;
    }

    emailValidation = () => {
        const email = this.state.email;

        if (email.length == 0) {
            return false;
        }

        if(typeof email !== "undefined"){
            let lastAtPos = email.lastIndexOf('@');
            let lastDotPos = email.lastIndexOf('.');
 
            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') == -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
               return false;
            }
        }  

        return true;
    }

    passwordValidation = () => {
        const password = this.state.password;

        if (password.length < 6) {
            return false;
        }
        return true;
    }

    validation = () => {
        return this.nameValidation() && this.emailValidation() && this.passwordValidation();
    }

    register = (event) => {
        event.preventDefault();
        console.log('register');

        this.setState({
            register: true,
        })

        if (this.validation() == false) {
            return;
        }

        const options = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }

        Accounts.createUser(options, (error) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log('success');
            }
        });
    }

    login = (event) => {
        event.preventDefault();
    }

    render() {
        let styles = this.props.show ? { display: "block" } : { display: "none" };
        let nameErrors, emailErrors, passwordErrors, passwordInfo;
        
        if (this.state.register) {
            passwordInfo = null;
            if (!this.nameValidation()) {
                var name = "Please enter a valid name!"
                nameErrors = <small className="form-text error-text">{name}</small>;
            } else {
                nameErrors = null;
            }
            
            if (!this.emailValidation()) {
                var email = "Please enter a valid e-mail!"
                emailErrors = <small className="form-text error-text">{email}</small>
            } else {
                emailErrors = null;
            }

            if (!this.passwordValidation()) {
                var password = "Your passwords must be more than 6 characters!"
                passwordErrors = <small className="form-text error-text">{password}</small>
            } else {
                passwordErrors = null;
            }
        } else {
            if (this.state.password.length > 0) {
                passwordInfo = <small className="form-text text-muted">Your passwords must be more than 6 characters</small>;
            } else {
                passwordInfo = null;
            }
        }
        return (
            <div id="signUp" className="modal fade in" role="dialog" style={styles}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <button className="close" onClick={this.props.close}>
                                &times;
                            </button> 
                            <br />
                            <label className="title">Register</label>
                            
                            <form className="form-group">
                                <label className="input-label">NAME</label>
                                <input type="text" name="name" placeholder="Enter your name..." 
                                    className="form-control" onChange={this.textChange}/>
                                { nameErrors }

                                <br />
                                <label className="input-label">E-MAIL</label>
                                <input type="email" name="email" placeholder="Enter your email..." 
                                    className="form-control" onChange={this.textChange}/>
                                { emailErrors }

                                <br />
                                <label className="input-label">PASSWORD</label>
                                <input type="password" name="password" placeholder="Enter your password..." 
                                    className="form-control" onChange={this.textChange}/>
                                { passwordInfo }
                                { passwordErrors }

                                <p className="term">
                                    By creating an account you agree to the <a href="#" className="text-link">Terms of Service</a> and <a href="#" className="text-link">Privacy Policy</a>
                                </p>

                                <button disabled={!this.validation()} className="btn-register" onClick={this.register}>Register</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <ul className="list-inline text-center">
                                <span className="footer-text">Do you have an account?</span>
                                <button className="btn-haveAccount" onClick={this.login}>Login</button>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUpModal;
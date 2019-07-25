import React from 'react';
import { PropTypes } from 'prop-types';

class SignUpModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
        }
    }

    textChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    register = () => {

    }

    render() {
        let styles = this.props.show ? { display: "block" } : { display: "none" };
        return (
            <div id="signUp" className="modal fade in" role="dialog" style={styles}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button className="close" onClick={this.props.close}>
                            &times;
                            </button> 
                        </div>
                        <div className="modal-body">
                            <label className="title">Register</label>
                            
                            <form className="form-group" onSubmit={this.register}>
                                <label className="input-label">NAME</label>
                                <input type="text" name="name" placeholder="Enter your name..." 
                                    className="form-control" onChange={this.textChange}/>

                                <label className="input-label">E-MAIL</label>
                                <input type="email" name="email" placeholder="Enter your email..." 
                                    className="form-control" onChange={this.textChange}/>

                                <label className="input-label">PASSWORD</label>
                                <input type="password" name="password" placeholder="Enter your password..." 
                                    className="form-control" onChange={this.textChange}/>
                                { this.state.password.length > 0 && 
                                  <small className="form-text text-muted">Your passwords must be more than 6 characters</small>
                                }
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUpModal;
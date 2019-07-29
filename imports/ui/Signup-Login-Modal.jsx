import React from 'react';
import LoginModal from './Login';
import SignUpModal from './SignUp';

export default class LoginAndSignupModal extends React.Component {
    render() {
        let styles = this.props.show ? { display: "block" } : { display: "none" };
        return (
            <div id="modal" className="modal fade in" role="dialog" style={styles}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        { this.props.kind == 'login' && 
                            <LoginModal close={this.props.close} register={this.props.change} /> 
                        }
                        { this.props.kind == 'register' && 
                            <SignUpModal close={this.props.close} login={this.props.change} />
                        }
                    </div>
                </div>
            </div>
        );
    }
}
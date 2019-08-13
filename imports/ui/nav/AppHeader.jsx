import React, { Component, Fragment } from 'react';
import { Meteor } from 'meteor/meteor';
import LoginAndSignupModal from './Signup-Login-Modal';
import NavBar from './NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCartPlus } from '@fortawesome/free-solid-svg-icons';

export default class AppHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            kindModal: '',
            showDropdown: false
        };
    }

    openRegisterModal = () => {
        this.setState({
          showModal: true,
          kindModal: 'register',
        });
    }
    
    closeModal = () => {
        this.setState({
            showModal: false,
            kindModal: '',
        });
    }
    
    openLoginModal = () => {
        this.setState({
            showModal: true,
            kindModal: 'login',
        });
    }
    
    changeModal = () => {
        console.log('change modal');
        if (this.state.kindModal == 'login') {
            this.setState({
            kindModal: 'register',
            })
        } else {
            this.setState({
            kindModal: 'login',
            })
        }
    }
    
    logout = () => {
        Meteor.logout((error) => {
            if (error) {
            console.log(error);
            } else {
            console.log('logged out');
            }
        });
        this.setState({showDropdown: false});
    }

    logoClicked = () => {
        console.log('logo clicked');
        this.props.history.push('/');
    }

    showDropdown = () => {
        this.setState({ showDropdown: !this.state.showDropdown });
    }

    render() {
        return (
            <div>
                <div className="Navbar">
                    <div className="search-bar">
                        <input type="text" className="search-wrapper" placeholder="Search" />
                        <FontAwesomeIcon icon={faSearch} className="right-input-icon" />
                    </div>
                    <img className="Logo" src="/logo@3x.png" alt="Logo" onClick={this.logoClicked} />
                    <div className="nav-group">
                        { !this.props.currentUser && 
                            <Fragment>
                                <button className="signup-btn" onClick={this.openRegisterModal}>Register</button>
                                <button className="login-btn" onClick={this.openLoginModal}>Login</button>
                            </Fragment>
                        }
                     
                        {  this.props.currentUser && 
                            <div className="place-for-user">
                                <button className="btn-logout" onClick={this.showDropdown}>
                                    <img src="/image.png" alt="" className="user-avatar" />
                                </button>

                                { this.state.showDropdown && 
                                    <div className="user-dropdown">
                                        <button className="dropdown-btn">Account setting</button>
                                        <button className="dropdown-btn" onClick={this.logout}>Log out</button>
                                    </div>
                                }
                            </div>
                        }
                        <button className="btn-cart">
                            <FontAwesomeIcon icon={faCartPlus} />
                        </button>
                        <span id='lblCartCount'>{this.props.cart.length}</span>
                    </div>
                    
                    <hr className="top-line" />

                    <NavBar subjects={this.props.subjects} kinds={this.props.kinds} />
                </div>

                <LoginAndSignupModal show={this.state.showModal} kind={this.state.kindModal} close={this.closeModal} 
                change={this.changeModal} />
            </div>
        );
    }
}
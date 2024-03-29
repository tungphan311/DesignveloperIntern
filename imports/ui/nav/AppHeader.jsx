import React, { Component, Fragment } from 'react';
import { Meteor } from 'meteor/meteor';
import LoginAndSignupModal from './Signup-Login-Modal';
import NavBar from './NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import CartItem from './CartItem';

export default class AppHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            kindModal: '',
            showDropdown: false,
            showCart: false,
            showNavbar: false,
        };
    }

    componentDidMount = () => {
        document.body.addEventListener('click', this.clickEventHandler);
    }

    componentWillMount = () => {
        document.body.removeEventListener('click', this.clickEventHandler);
    }

    componentDidUpdate = () => {
        if (this.state.showCart) {
            document.getElementById('cartList').focus();
        }
    }

    clickEventHandler = (e) => {
        const id = e.target.id;

        const { showCart, showDropdown } = this.state;

        if (id === 'cartBtn') {
            this.setState(curState => {
                return {
                    showCart: !curState.showCart,
                }
            });
        } 
        
        if (showCart && id !== 'btnViewCart') {
            this.setState({ showCart: false });
        } 

        if (id === 'userAvatar') {
            this.setState(curState => {
                return {
                    showDropdown: !curState.showDropdown,
                }
            });
        }

        const btnGroup = ['accountSetting', 'logoutBtn'];
        if (showDropdown && !btnGroup.includes(id)) {
            this.setState({ showDropdown: false })
        }
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
                alert(error);
            } 
        });
        this.setState({showDropdown: false});
    }

    logoClicked = () => {
        this.props.history.push('/');
    }

    // showDropdown = () => {
    //     this.setState({ showDropdown: !this.state.showDropdown });
    // }

    // showListCart = () => {
    //     this.setState({ showCart: !this.state.showCart, showDropdown: false });
    // }

    renderCart = () => {
        return this.props.cart.map(item => (
            <Fragment key={item.productDetailId}>
                <CartItem item={item} />
                <hr className="cart-line" />
            </Fragment>
        ));
    }

    viewCart = (e) => {
        this.props.history.push("/cart/listProducts");
        this.setState({ showCart: false });
    }

    userAvaBlur = () => {
        this.setState({showDropdown: false});
    }

    render() {
        // console.log('appheader', this.props.cart)
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
                                <button className="btn-logout">
                                    <img src="/image.png" alt="" id="userAvatar" className="user-avatar" />
                                </button>

                                { this.state.showDropdown && 
                                    <div className="user-dropdown">
                                        <button className="dropdown-btn" id='accountSetting'>Account setting</button>
                                        <button className="dropdown-btn" id='logoutBtn' onClick={this.logout}>Log out</button>
                                    </div>
                                }
                            </div>
                        }
                        <div className="place-for-cart">
                            <button className="btn-cart">
                                <img src="/cart.png" alt="cart" id="cartBtn" />
                            </button>
                            <span id='lblCartCount'>{this.props.cart.length}</span>

                            { this.state.showCart && 
                                <div className="cart-list" id="cartList">
                                    { this.props.cart.length > 0 ? 
                                        <Fragment>
                                            { this.renderCart() }
                                            <div>
                                                <button className="btn-viewCart" id="btnViewCart" onClick={this.viewCart}>View cart</button>
                                            </div>
                                        </Fragment>
                                        :
                                        <Fragment>
                                            <div className="cart-noItem">
                                                Không có sản phẩm nào
                                            </div> 
                                            <hr className="cart-line" />
                                        </Fragment>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                    
                    <hr className="top-line" />

                    <NavBar subjects={this.props.subjects} kinds={this.props.kinds} show={this.state.showNavbar} history={this.props.history} />
                </div>

                <LoginAndSignupModal show={this.state.showModal} kind={this.state.kindModal} close={this.closeModal} 
                change={this.changeModal} />
            </div>
        );
    }
}
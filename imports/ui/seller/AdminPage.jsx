import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Redirect } from 'react-router-dom';
import './admin-page.css';
import LeftMenu from './LeftMenu';
import Orders from './Orders';
import Products from './Products';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

class AdminPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            menus: [
                { name: "Overview", unselected_image: "/overview-dark.png", selected_image: "" },
                { name: "Orders", unselected_image: "/orders-dark.png", selected_image: "/orders-orange.png" },
                { name: "Products", unselected_image: "/products-orange.png", selected_image: "/products-dark.png" },
                { name: "Payments", unselected_image: "/payment-dark.png", selected_image: "" },
                { name: "Promotions", unselected_image: "/promotion-dark.png", selected_image: "" },
                { name: "Setting", unselected_image: "/setting-dark.png", selected_image: "" }
            ],
            selected_menu: 1,
        }
    }

    componentDidMount = () => {
        this.setState({ selected_menu: this.props.selected });
    }
   
    checkUser = () => {
        const user = this.props.currentUser;
        if (user && user.emails[0].address != 'tungpt@dgroup.co') {
            Meteor.logout((error) => {
                if (error) {
                    alert(error);
                }
            });
        }
    }

    changeMenu = (id) => {
        this.setState({selected_menu: id});

        if (id == 1) {
            this.props.history.push('?orders');
        } else if (id == 2) {
            this.props.history.push('?products');
        }
        
    }

    renderContent = () => {

        if (this.props.location.search === "?orders") {
            // this.setState({selected_menu: 1});
            return <Orders />
        }

        if (this.props.location.search === "?products") {
            // this.setState({selected_menu: 2});
            return <Products />
        }
    }

    render() { 
        const user = this.props.currentUser;
        // console.log(user);
        const { menus, selected_menu } = this.state;
        this.checkUser();

        return ( 
            <div>
                {/* { (!user || user.emails[0].address != 'tungpt@dgroup.co') &&
                    <Redirect to='/admin/login' />
                } */}
                <div className="admin-page-left-side">
                    <img src="/logo@3x.png" alt="logo" className="admin-page-logo"/>

                    <LeftMenu menus={this.state.menus} selected={this.state.selected_menu} changeMenu={this.changeMenu} />
                </div>
                
                <div className="admin-page-right-side">
                    <div className="adminpage-topbar">
                        <span className="adminpage-title">{menus[selected_menu].name}</span>
                    
                        <span className="adminpage-topbar-rightside">
                            {/* <span id="adminpage-avatar">
                                <img src="/image.png" alt="admin-avatar" className="user-avatar" />
                            </span> */}
                            <img src="/image.png" alt="admin-avatar" className="adminpage-avatar" />

                            <button id="adminpage-user">
                                { user && user.emails[0].address }
                                <FontAwesomeIcon icon={faChevronDown} className="right-icon" />
                            </button>

                            <span style={{position: "relative", marginRight: "calc(35vw/9)"}}>
                                <img src="/mail.png" alt="mail" className="topbar-icon" />
                                <span className='lbCount'>9+</span>
                            </span>
                            <span style={{position: "relative"}}>
                                <img src="/notification.png" alt="notification" className="topbar-icon" />
                                <span className='lbCount'>9+</span>
                            </span>
                        </span>
                    </div>  
                    { this.renderContent() }
                </div>   
            </div>
        );
    }
}
 
export default withTracker((props) => {
    const search = props.location.search;
    if (search == "") {
       props.history.push('?orders');
    }

    let selected = 1;
    if (search == '?orders') {
        selected = 1;
    } else if (search == '?products') {
        selected = 2;
    }

    return {
        currentUser: Meteor.user(),
        selected
    }
})(AdminPage);
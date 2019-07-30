import React, { Component } from 'react';
import NavBarItem from './NavBarItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

class NavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            lists: [],
        }
    }
    renderNavbar = () => {
        return this.props.menus.map((item) => (
            <li key={item._id} className="list-inline-item">
                <button id={item._id} className="menu-item" onClick={(e) => this.showDropdown(e, item.children)}>
                    {item.name}
                    <FontAwesomeIcon icon={faChevronDown} className="right-icon" />
                </button>
            </li>
        )); 
    }

    showDropdown = (event, lists) => {
        event.preventDefault();

        this.setState({
            show: true,
            lists: lists
        });
    }

    render() {
        return (
            <div>
                <ul className="list-inline text-center">
                    {this.renderNavbar()}
                </ul>
                <NavBarItem show={this.state.show} item={this.state.lists} />
            </div>
        );
    }  
}

export default NavBar;
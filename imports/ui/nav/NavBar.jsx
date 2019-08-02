import React, { Component } from 'react';
import NavBarItem from './NavBarItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Meteor } from 'meteor/meteor';
import { KindOfClothes } from '../../api/kind-of-clothes';

class NavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            lists: [],
            choosedSubject: 0,
        }
    }
    
    renderNavbar = () => {
        return this.props.subjects.map((item) => (
            <li key={item._id} className="list-inline-item">
                <button id={item.id} className="menu-item" onClick={this.showDropdown}>
                    {item.name}
                    <FontAwesomeIcon icon={faChevronDown} className="right-icon" />
                </button>
            </li>
        )); 
    }

    showDropdown = (event) => {
        event.preventDefault();

        const subjectId = event.target.id;

        const lists = this.props.kinds.filter((kind) => kind.subjectId == subjectId );
        
        if (!this.state.show) {
            this.setState({
                show: true,
                choosedSubject: subjectId,
                lists: lists,
            });
        } else {
            if (subjectId == this.state.choosedSubject) {
                this.setState({
                    show: false,
                    choosedSubject: 0,
                    lists: [],
                });
            } else {
                this.setState({
                    show: true,
                    choosedSubject: subjectId,
                    lists: lists,
                })
            }
        }  
    }

    render() {
        return (
            <div className="menu">
                <ul className="list-inline text-center">
                    {this.renderNavbar()}
                </ul>
                <NavBarItem show={this.state.show} item={this.state.lists} />
            </div>
        );
    }  
}

export default NavBar;
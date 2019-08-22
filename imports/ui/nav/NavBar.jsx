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
            choosedSubject: '',
        }
    }

    componentDidMount = () => {
        document.body.addEventListener('click', this.eventHandler);
    }

    componentWillMount = () => {
        document.body.removeEventListener('click', this.eventHandler);
    }
    
    eventHandler = (e) => {
        const name = e.target.name;
        const subjectId = event.target.id;
        const { show, choosedSubject } = this.state;

        const lists = this.props.kinds.filter((kind) => kind.subjectId == subjectId );

        if (name === 'navbar') {
            if (!show) {
                this.setState({
                    show: true,
                    choosedSubject: subjectId,
                    lists: lists,
                });
            } else {
                if (subjectId === choosedSubject) {
                    this.setState({
                        show: false,
                        choosedSubject: '',
                        lists: [],
                    });
                } else {
                    this.setState({
                        show: true,
                        choosedSubject: subjectId,
                        lists: lists,
                    });
                }
            }
        }

        const btnWrapper = ['btnNavbar', 'navbar']
        if (show && !btnWrapper.includes(name)) {
            this.setState({ show: false, choosedSubject: '', lists: [] });
        }
    }

    renderNavbar = () => {
        return this.props.subjects.map((item) => (
            <li key={item._id} className="list-inline-item" >
                <button id={item._id} className="menu-item" name="navbar" onClick={this.showDropdown}> 
                    {item.name}
                    <FontAwesomeIcon icon={faChevronDown} className="right-icon" />
                </button>
            </li>
        )); 
    }

    // showDropdown = (event) => {
    //     const { choosedSubject } = this.state;
    //     const subjectId = event.target.id;

    //     const lists = this.props.kinds.filter((kind) => kind.subjectId == subjectId );
        
    //     if (!this.state.show) {
    //         this.setState({
    //             show: true,
    //             choosedSubject: subjectId,
    //             lists: lists,
    //         });
    //     } else {
    //         if (subjectId == choosedSubject) {
    //             this.setState({
    //                 show: false,
    //                 choosedSubject: '',
    //                 lists: [],
    //             });
    //         } else {
    //             this.setState({
    //                 show: true,
    //                 choosedSubject: subjectId,
    //                 lists: lists,
    //             })
    //         }
    //     }  
    // }

    showItemDropdown = () => {
        this.setState({
            show: false,
            choosedSubject: '',
            lists: [],
        });
    }

    render() {
        return (
            <div className="menu">
                <ul className="list-inline text-center">
                    {this.renderNavbar()}
                </ul>
                <NavBarItem show={this.state.show} item={this.state.lists} showDropdown={this.showItemDropdown} />
            </div>
        );
    }  
}

export default NavBar;
import React, { Component } from 'react';

class NavBarItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
        }
    }

    renderDropdown = () => {
        return this.props.item.map(child => (
            <li key={child}>
                <div>{child}</div>
            </li>
        ));
    }

    render() {
        return (
            <div className="dropdown">
                { this.props.show &&
                    <ul className="list-inline">
                        {this.renderDropdown()}
                    </ul>
                }
            </div>
        );
    }
}

export default NavBarItem;
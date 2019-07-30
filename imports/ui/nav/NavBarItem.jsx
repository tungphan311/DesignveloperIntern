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
            <li key={child}>{child}</li>
        ));
    }

    render() {
        return (
            <div>
                { this.props.show &&
                    <ul className="list-inline text-center dropdown">
                        {this.renderDropdown()}
                    </ul>
                }
            </div>
        );
    }
}

export default NavBarItem;
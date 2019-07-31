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
            <div key={child}>
                <button className="btn-group-item">{child}</button>
            </div>
        ));
    }

    render() {
        return (
            <div className="dropdown">
                { this.props.show &&
                    <div className="btn-group" role="group">
                        {this.renderDropdown()}
                    </div>
                }
            </div>
        );
    }
}

export default NavBarItem;
import React, { Component } from 'react';

class NavBarItem extends Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef()
    }

    renderDropdown = () => {
        return this.props.item.map(child => (
            <React.Fragment key={child._id}>
                <button className="btn-group-item">{child.name}</button>
            </React.Fragment>
        ));
    }

    render() {
        return (
            <div className="dropdown" ref={this.wrapperRef}>
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
import React, { Component } from 'react';

class NavBarItem extends Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef()
    }

    onBlur = () => {
        this.props.showDropdown(false);
    }

    componentDidUpdate = () => {
        if (this.props.show) {
            document.getElementById('dropdown').focus();
        }
    }

    renderDropdown = () => {
        return this.props.item.map(child => (
            <React.Fragment key={child._id}>
                <button className="btn-group-item" name="btnNavbar">{child.name}</button>
            </React.Fragment>
        ));
    }

    render() {
        return (
            <div className="dropdown" id="dropdown" ref={this.wrapperRef} name="bavbarItem">
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
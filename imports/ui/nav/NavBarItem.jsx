import React, { Component } from 'react';

class NavBarItem extends Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef()
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClick)
    }
    
    componentWillUnmount() {
        // important
        document.removeEventListener('click', this.handleClick)
    }

    renderDropdown = () => {
        return this.props.item.map(child => (
            <div key={child._id}>
                <button className="btn-group-item">{child.name}</button>
            </div>
        ));
    }

    handleClick = (event) => {
        const { target } = event;

        if (!this.wrapperRef.current.contains(target) && this.props.show) {
            console.log('click outside');
        }
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
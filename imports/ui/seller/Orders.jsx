import React, { Component } from 'react';

class Orders extends Component {
    state = {  }

    componentDidMount = () => {
        this.props.changeMenu(1);
    }

    render() { 
        return ( 
            <div>Orders Page</div>
        );
    }
}
 
export default Orders;
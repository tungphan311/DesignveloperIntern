import React, { Component } from 'react';

class OrderRow extends Component {
    state = {  }

    dateFormat = (date) => {
        return new Intl.DateTimeFormat('en-VN', {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
            weekday: 'short'
        }).format(date);
    }
    
    render() { 
        const { order } = this.props;
        return ( 
            <div className="adminpage-table-row">
                <div className="adminpage-table-body-cell" id="orderIdCell">
                    { order._id }
                </div>
                <div className="adminpage-table-body-cell" id="orderDateCell">
                    { this.dateFormat(order.createAt) }
                </div>
                <div className="adminpage-table-body-cell">
                    
                </div>
                <div className="adminpage-table-body-cell">
                    
                </div>
                <div className="adminpage-table-body-cell">
                    
                </div>
                <div className="adminpage-table-body-cell">
                    
                </div>
            </div>
        );
    }
}
 
export default OrderRow;
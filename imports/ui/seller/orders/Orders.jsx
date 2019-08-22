import React, { Component, Fragment } from 'react';
import './order.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Orders } from '../../../api/orders';
import OrderRow from './OrderRow';

class OrderPage extends Component {
    state = { 
        query: {
            sort: 1,
            page: 1,
            limit: 10,
        }
    }

    componentDidMount = () => {
        this.props.changeMenu(1);

        // document.getElementById('datePicker').value = new Date().toDateInputValue();
    }

    renderOrderRow = () => {
        return this.props.orders.map(order => (
            <OrderRow key={order._id} order={order} />
        ))
    }

    render() { 
        const { sort, page, limit } = this.state.query; 
        return ( 
            <Fragment>
                <div id="order-page-filter-row">
                    <span className="adminpage-filter-title">ORDERED DATE</span>

                    <input type="date" id="datePicker" />
                    <button id="datetime-today-btn">Today</button>
                    <button id="datetime-yesterday-btn">Yesterday</button>

                    <span id="order-page-filter-row-right">
                        <FontAwesomeIcon icon={faSearch} className="search-product-btn" />
                        <input type="text" placeholder="Search product" id="search-product" />

                        <button id="order-filter-row-export-btn">
                            <img src="/export-orange.png" alt="export logo" className="filter-btn-logo" />
                            Export
                        </button>
                    </span>
                </div>

                <div id="order-list-place">
                    <div className="adminpage-custom-table">
                        <div className="adminpage-table-header">
                            <div className="adminpage-table-header-cell" id="orderId">
                                ORDER ID
                                <hr className="custom-table-devide-line" />
                            </div>
                            <div className="adminpage-table-header-cell" id="orderDate">
                                ORDER DATE
                                <hr className="custom-table-devide-line" />
                            </div>
                            <div className="adminpage-table-header-cell" id="orderDetail">
                                DETAIL
                                <hr className="custom-table-devide-line" />
                            </div>
                            <div className="adminpage-table-header-cell" id="orderTotal">
                                TOTAL($)
                                <hr className="custom-table-devide-line" />
                            </div>
                            <div className="adminpage-table-header-cell" id="orderStatus">
                                STATUS
                                <hr className="custom-table-devide-line" />
                            </div>
                            <div className="adminpage-table-header-cell" id="adminpage-action">
                                ACTION
                                <hr className="custom-table-devide-line" />
                            </div>
                        </div>

                        <div className="adminpage-table-body">
                            { this.renderOrderRow() }
                        </div>      
                    </div>

                    <div className="adminpage-product-list-footer">
                        <span className="adminpage-product-list-footer-label">
                            {`Show ${(page - 1)*limit + 1} to ${page*limit} of ${this.props.orderLength} entries`}
                        </span>
                    </div>
                </div>
            </Fragment>
        );
    }
}
 
export default withTracker(() => {
    Meteor.subscribe('orders');

    return {
        orderLength: Orders.find({}).count(),
        orders: Orders.find({}).fetch()
    }
})(OrderPage);
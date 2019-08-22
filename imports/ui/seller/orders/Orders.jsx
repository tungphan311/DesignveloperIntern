import React, { Component, Fragment } from 'react';
import './order.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Orders } from '../../../api/orders';
import OrderRow from './OrderRow';
import qs from 'query-string';
import Pagination from "react-js-pagination";

class OrderPage extends Component {
    state = { 
        limit: 10,
        query: {
            sort: 0,
            page: 1,
        },
        showAction: 0,
    }

    componentDidMount = () => {
        this.props.changeMenu(1);
        let { page, sortId } = this.props;

        this.setState(curState => {
            let newQuery = {...curState.query};

            newQuery.page = page;
            newQuery.sort = sortId;

            const searchString = qs.stringify(newQuery);
            this.props.history.push('?' + searchString);

            return {
                query: newQuery,
            }
        })
    }

    renderOrderRow = () => {
        const { showAction } = this.state;
        return this.props.orders.map(order => (
            <OrderRow key={order._id} order={order} showAction={this.showActionEvent} show={showAction} />
        ))
    }

    showActionEvent = (id) => {
        const showAction = this.state.showAction;

        if (id === showAction) {
            this.setState({ showAction: 0});
        } else {
            this.setState({ showAction: id });
        }
    }

    handlePageChange = (pageNumber) => {
        let newQuery = {...this.state.query};

        newQuery.page = pageNumber;

        const searchString = qs.stringify(newQuery);
        this.props.history.push('?' + searchString);

        this.setState({query: newQuery});
    }

    changSort = () => {
        this.setState(curState => {
            let newQuery = {...curState.query};

            if (newQuery.sort === 2) {
                newQuery.sort = 0;
            } else {
                newQuery.sort += 1;
            }

            const searchString = qs.stringify(newQuery);
            this.props.history.push('?' + searchString);

            return {
                query: newQuery,
            }
        })
    }

    render() { 
        const { sort, page } = this.state.query; 
        const { limit } = this.state;
        const { orderLength } = this.props;

        let max = page*limit > orderLength ? orderLength :  page*limit;
        const icon = sort === 0 ? "" : (sort === 1 ? faSortDown : faSortUp);
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
                            <div className="adminpage-table-header-cell" id="orderStatus" onClick={this.changSort}>
                                STATUS 
                                <span>
                                    <FontAwesomeIcon icon={icon} style={{ width: "calc(200vw/144)"}} />
                                </span>
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
                            {`Show ${(page - 1)*limit + 1} to ${max} of ${orderLength} entries`}
                        </span>

                        <span className="adminpage-product-right-side">
                            <div className="product-page-sort-btn-wrapper">
                                <button id="btn-select-limit" onClick={this.showLimitDropdown}>
                                    {limit}
                                    <FontAwesomeIcon icon={faSortDown} className="btn-select-limit-icon" />
                                </button>

                                {/* { this.state.showLimit && 
                                    <div className="select-limit-dropdown">
                                        <button id={limits[1].value} className="dropdown-btn" onClick={this.changeLimit}>{limits[1].value}</button>
                                        <button id={limits[2].value} className="dropdown-btn" onClick={this.changeLimit}>{limits[2].value}</button>
                                        <button id={limits[3].value} className="dropdown-btn" onClick={this.changeLimit}>{limits[3].value}</button>
                                    </div>
                                } */}
                            </div>

                            <Pagination 
                                activePage={page}
                                itemsCountPerPage={limit}
                                totalItemsCount={this.props.orderLength}
                                pageRangeDisplayed={5}
                                onChange={this.handlePageChange}
                            />
                        </span>
                    </div>
                </div>
            </Fragment>
        );
    }
}
 
export default withTracker((props) => {
    Meteor.subscribe('orders');
    const search = props.history.location.search;

    const limit = 10;

    const sortIndex = search.indexOf('sort');
    let sortId = 0;
    if (sortIndex > -1) {
        sortId = parseInt(search.substring(sortIndex+5)[0]);
    } else {
        sortId = 0;
    }

    let sort = null;
    if (sortId === 0) {
        sort = { createAt: -1 };
    } else if (sortId === 1) {
        sort = { status: -1, createAt: -1 };
    } else if (sortId === 2) {
        sort = { status: 1, createAt: -1 };
    }

    let pageString = null;
    const pageIndex = search.indexOf('page');
    if (pageIndex > -1) {
        pageString = search.substring(pageIndex+5);
    } else {
        pageString = '1';
    }
    let page = parseInt(pageString);
    let skip = (page - 1) * limit;

    return {
        orderLength: Orders.find({}).count(),
        orders: Orders.find({}, { limit: limit, skip: skip, sort: sort }).fetch(),
        page, sortId
    }
})(OrderPage);
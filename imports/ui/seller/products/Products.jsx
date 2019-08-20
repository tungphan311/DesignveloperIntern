import React, { Component, Fragment } from 'react';
import './products.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faSearch } from '@fortawesome/free-solid-svg-icons';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Products } from '../../../api/products';
import ProductRow from './ProductRow';
import qs from 'query-string';
import Pagination from "react-js-pagination";

class AdminProducts extends Component {
    state = { 
        showDropdown: false,
        showLimit: false,
        showAction: 0,
        
        query: {
            sort: 1,
            page: 1,
            limit: 5,
        }
    }

    componentDidMount = () => {
        this.props.changeMenu(2);

        this.setState((curState) => {
            let newQuery = {...curState.query};

            newQuery.sort = this.props.sortId;
            newQuery.limit = this.props.limit;
            newQuery.page = this.props.page;

            return {
                query: newQuery,
            }
        });
    }

    renderProductRow = () => {
        return this.props.products.map(product => (
            <ProductRow key={product._id} product={product} showAction={this.showActionEvent} 
                show={this.state.showAction} currentUser={this.props.currentUser} />
        ));
    }

    showDropdown = () => {
        this.setState({showDropdown: !this.state.showDropdown});
    }

    changeSort = (event) => {
        const value = event.target.id;
        let newQuery = {...this.state.query};
        newQuery.sort = value;

        const searchString = qs.stringify(newQuery);
        this.props.history.push('?' + searchString);

        this.setState({
            showDropdown: false,
            query: newQuery,
        });
    }

    showLimitDropdown = () => {
        this.setState({showLimit: !this.state.showLimit});
    }

    changeLimit = (event) => {
        const value = event.target.id;
        let newQuery = {...this.state.query};
        newQuery.limit = value;

        const searchString = qs.stringify(newQuery);
        this.props.history.push('?' + searchString);

        this.setState({
            showLimit: false,
            query: newQuery,
        });
    }

    handlePageChange = (pageNumber) => {
        let newQuery = {...this.state.query};

        newQuery.page = pageNumber;

        const searchString = qs.stringify(newQuery);
        this.props.history.push('?' + searchString);

        this.setState({query: newQuery});
    }

    showActionEvent = (id) => {
        const showAction = this.state.showAction;

        if (id == showAction) {
            this.setState({ showAction: 0});
        } else {
            this.setState({ showAction: id });
        }
    }

    addProduct = () => {
        this.props.history.push('/admin/products/add');
    }

    render() { 
        let { sort, page, limit } = this.state.query;
        const sorts = {
            1: { value: 'Date added' },
            2: { value: 'A - Z' },
            3: { value: 'Z - A' }
        }

        const limits = {
            1: { value: '5' },
            2: { value: '10' },
            3: { value: '15' },
        }

        let height = 64 * (3 + limit);
        let styles = {
            productListPlace: {
                height: `calc(${height*10}vw/144`,
            }
        }
        
        return ( 
            <Fragment>
                <div id="product-page-filter-row">
                    <span className="adminpage-filter-title">ORDER BY</span>

                    <div className="product-page-sort-btn-wrapper">
                        <button id="product-page-filter-btn" onClick={this.showDropdown}>
                            { sorts[sort].value }
                            <FontAwesomeIcon icon={faSortDown} id="product-page-filter-btn-icon" />
                        </button>

                        { this.state.showDropdown && 
                            <div className="sort-btn-dropdown">
                                <button id="1" className="dropdown-btn" onClick={this.changeSort}>{sorts[1].value}</button>
                                <button id="2" className="dropdown-btn" onClick={this.changeSort}>{sorts[2].value}</button>
                                <button id="3" className="dropdown-btn" onClick={this.changeSort}>{sorts[3].value}</button>
                            </div>
                        }
                    </div>

                    <span id="product-page-filter-row-right">
                        <FontAwesomeIcon icon={faSearch} id="search-product-btn" />
                        <input type="text" placeholder="Search product" id="search-product" />

                        <button id="filter-row-add-product-btn" onClick={this.addProduct}>
                            <img src="/plus-white.png" alt="plus logo" className="filter-btn-logo " />
                            Add product
                        </button>
                        <button id="filter-row-export-btn">
                            <img src="/export-orange.png" alt="export logo" className="filter-btn-logo" />
                            Export
                        </button>
                    </span>
                </div>
            
                <div id="product-list-place">
                    <div id="adminpage-custom-table">
                        <div id="adminpage-table-header">
                            <div className="adminpage-table-header-cell" id="adminpage-product">
                                PRODUCTS
                                <hr className="custom-table-devide-line" />
                            </div>
                            <div className="adminpage-table-header-cell" id="adminpage-sold">
                                SOLD
                                <hr className="custom-table-devide-line" />
                            </div>
                            <div className="adminpage-table-header-cell" id="adminpage-date">
                                DATE ADDED
                                <hr className="custom-table-devide-line" />
                            </div>
                            <div className="adminpage-table-header-cell" id="adminpage-profit">
                                PROFIT ($)
                                <hr className="custom-table-devide-line" />
                            </div>
                            <div className="adminpage-table-header-cell" id="adminpage-action">
                                ACTION
                                <hr className="custom-table-devide-line" />
                            </div>
                        </div>
                        
                        <div id="adminpage-table-body">
                            { this.renderProductRow() }
                        </div>
                    </div>

                    <div id="adminpage-product-list-footer">
                        <span id="adminpage-product-list-footer-label">
                            {`Show ${(page - 1)*limit + 1} to ${page*limit} of ${this.props.productLength} entries`}
                        </span>

                        <span id="adminpage-product-right-side">
                            <div className="product-page-sort-btn-wrapper">
                                <button id="btn-select-limit" onClick={this.showLimitDropdown}>
                                    {limit}
                                    <FontAwesomeIcon icon={faSortDown} className="btn-select-limit-icon" />
                                </button>

                                { this.state.showLimit && 
                                    <div className="select-limit-dropdown">
                                        <button id={limits[1].value} className="dropdown-btn" onClick={this.changeLimit}>{limits[1].value}</button>
                                        <button id={limits[2].value} className="dropdown-btn" onClick={this.changeLimit}>{limits[2].value}</button>
                                        <button id={limits[3].value} className="dropdown-btn" onClick={this.changeLimit}>{limits[3].value}</button>
                                    </div>
                                }
                            </div>

                            <Pagination 
                                activePage={page}
                                itemsCountPerPage={limit}
                                totalItemsCount={this.props.productLength}
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
    const search = props.history.location.search;
    const sortIndex = search.indexOf('sort');
    let sortId = 0;
    if (sortIndex > -1) {
        sortId = search.substring(sortIndex+5)[0];
    } else {
        sortId = 1;
    }

    let sort = null;
    if (sortId == 2) {
        sort = { name: 1 };
    } else if (sortId == 3) {
        sort = { name: -1 };
    } else {
        sort = { createAt: 1 };
    }

    let limitString = null;
    const limitIndex = search.indexOf('limit');
    if (limitIndex > -1) {
        let andPos = limitIndex;
        for (var i = limitIndex; i<search.length; i++) {
            if (search[i] == '&') {
                andPos = i;
                break;
            }
        }
        limitString = search.substring(limitIndex+6, andPos);
    } else {
        limitString = '5';
    }
    let limit = parseInt(limitString);

    let pageString = null;
    const pageIndex = search.indexOf('page');
    if (pageIndex > -1) {
        let andPos = pageIndex;
        for (var i = pageIndex; i<search.length; i++) {
            if (search[i] == '&') {
                andPos = i;
                break;
            }
        }
        pageString = search.substring(pageIndex+5, andPos);
    } else {
        pageString = '1';
    }
    let page = parseInt(pageString);
    let skip = limit * (page - 1);

    Meteor.subscribe('productList');

    return {
        sortId,
        limit, page,
        productLength: Products.find({}).count(),
        products: Products.find({}, { sort: sort ,limit: limit, skip: skip }).fetch(),
        currentUser: Meteor.user(),
    }
})(AdminProducts);
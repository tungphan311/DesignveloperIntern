import React, { Component, Fragment } from 'react';
import './products.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faSearch } from '@fortawesome/free-solid-svg-icons';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Products } from '../../api/products';
import ProductRow from './ProductRow';

class AdminProducts extends Component {
    state = { 
        sortId: 1,
        
        querry: {
            page: 1,
            limit: 5,
        }
    }

    componentDidMount = () => {
        this.props.changeMenu(2);
    }

    renderProductRow = () => {
        return this.props.products.map(product => (
            <ProductRow key={product._id} product={product} />
        ));
    }

    render() { 
        const sortId = this.state.sortId;
        const sort = {
            1: { value: 'Date added' },
            2: { value: 'A - Z' },
            3: { value: 'Z - A' }
        }

        let { page, limit } = this.state.querry;
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

                    <button id="product-page-filter-btn">
                        { sort[sortId].value }
                        <FontAwesomeIcon icon={faSortDown} id="product-page-filter-btn-icon" />
                    </button>

                    <span id="product-page-filter-row-right">
                        <FontAwesomeIcon icon={faSearch} id="search-product-btn" />
                        <input type="text" placeholder="Search product" id="search-product" />

                        <button id="filter-row-add-product-btn">
                            <img src="/plus-white.png" alt="plus logo" className="filter-btn-logo " />
                            Add product
                        </button>
                        <button id="filter-row-export-btn">
                            <img src="/export-orange.png" alt="export logo" className="filter-btn-logo" />
                            Export
                        </button>
                    </span>
                </div>
            
                <div id="product-list-place" style={styles.productListPlace}>
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
                    </div>
                </div>
            </Fragment>
        );
    }
}
 
export default withTracker((props) => {
    let limit = 5;
    let page = 1;
    let skip = limit * (page - 1);

    Meteor.subscribe('productList');

    return {
        productLength: Products.find({}).count(),
        products: Products.find({}, { limit: limit, skip: skip }).fetch(),
    }
})(AdminProducts);
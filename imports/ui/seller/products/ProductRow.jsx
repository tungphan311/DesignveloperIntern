import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { Meteor } from 'meteor/meteor';

class ProductRow extends Component {
    state = { 
        showAction: false,
    }

    dateFormat = (date) => {
        return new Intl.DateTimeFormat('en-VN', {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
            weekday: 'short'
        }).format(date);
    }

    showAction = (event) => {
        this.props.showAction(event.target.id);
    }

    removeProduct = (event) => {
        // Products.remove(event.target.id);
        Meteor.call('products.remove', this.props.currentUser, event.target.id);

        this.props.showAction(0);
    }
    render() { 
        const {product} = this.props
        return ( 
            <div className="adminpage-table-row">
                <div className="adminpage-table-body-cell">
                    <span className="adminpage-table-body-cell-leftside">
                        <img src={product.images[0]} alt="" className="adminpage-table-product-image" />
                    </span>

                    <div style={{marginLeft: "calc(700vw/144)"}}>
                        <div className="product-row-name">{product.name}</div>
                        <div className="product-row-detail">{product.categoryId} </div>
                    </div>
                </div>
                <div className="adminpage-table-body-cell">
                    
                </div>
                <div className="adminpage-table-body-cell">
                    {this.dateFormat(product.createAt)}
                </div>
                <div className="adminpage-table-body-cell">

                </div>
                <div className="adminpage-table-body-cell" style={{textAlign: "right", position: "relative"}}> 
                    <button id={product._id} className="product-row-button" onClick={this.showAction}>
                        Action
                        <FontAwesomeIcon icon={faSortDown} className="product-row-button-icon" />
                    </button>

                    { this.props.show == product._id && 
                        <div id="select-action-dropdown">
                            <button className="action-btn" onClick={this.changeLimit}>
                                <img src="/edit.png" alt="edit" className="action-btn-icon" />
                                Edit
                            </button>
                            <button id={product._id} className="action-btn" onClick={this.changeLimit} onClick={this.removeProduct}>
                                <img src="/remove.png" alt="edit" className="action-btn-icon" />
                                Remove
                            </button>
                        </div>
                    }
                </div>
            </div>
        );
    }
}
 
export default ProductRow;
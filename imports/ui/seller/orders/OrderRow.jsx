import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { ProductDetails } from '../../../api/product-details';
import { Products } from '../../../api/products';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { Colors } from '../../../api/colors';

class OrderRow extends Component {
    state = {  
        showAction: false,
    }

    customPrice = (price) => { 
        return price.toFixed(2);
    }

    dateFormat = (date) => {
        return new Intl.DateTimeFormat('en-VN', {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
            weekday: 'short'
        }).format(date);
    }

    formatDetail = (detail) => {
        const { productDetails, products, colors } = this.props;
        let result = '';
        detail.map(dt => {
            const pdt = productDetails.find(pros => pros._id === dt.productDetailId);
            if (!pdt) return;

            const color = colors.find(cl => cl._id === pdt.colorId);
            if (!color) return;

            const product = products.find(pro => pro._id === pdt.productId);
            if (!product) return;

            result += product.name + '(' + pdt.size + ', ' + color.name +  ')' + ' x' + dt.amount;

            if (detail.indexOf(dt) < detail.length - 1) {
                result += ', ';
            }
        });

        return result;
    }

    showAction = () => {
        this.props.showAction(event.target.id);
    }

    changeStatus = (event) => {
        const status = event.target.id;
        const { order, productDetails, products } = this.props;
        this.props.showAction(0);

        Meteor.call('orders.update', order._id, status, (error) => {
            if (error) {
                window.alert(error);
            } else {
                order.detail.map(item => {
                    const detail = productDetails.find(dt => dt._id === item.productDetailId) || { };

                    const product = products.find(p => p._id === detail.productId) || {};

                    const amount = item.amount * (-1);

                    Meteor.call('products.update', product._id, amount);
                });

                if (status === 'canceled') {
                    // Meteor.call('sendEmail', )
                }
            }
        });
    }
    
    render() { 
        const styles = {
            complete: {
                backgroundColor: "#82bf11",
            },
            pending: {
                backgroundColor: "#fbba4e",
            },
            cancel: {
                backgroundColor: "#f05d62",
            }
        };

        const { showAction } = this.state;
        const { order, show } = this.props;
        return ( 
            <div className="adminpage-table-row">
                <div className="adminpage-table-body-cell" id="orderIdCell">
                    { order._id }
                </div>
                <div className="adminpage-table-body-cell" id="orderDateCell">
                    { this.dateFormat(order.createAt) }
                </div>
                <div className="adminpage-table-body-cell" id="orderDetailCell">
                    { this.formatDetail(order.detail) }
                </div>
                <div className="adminpage-table-body-cell" id="orderTotalCell">
                    { this.customPrice(order.total) }
                </div>
                <div className="adminpage-table-body-cell" id="orderStatusCell">
                    <div className="order-row-status"
                        style={ order.status === 'pending' ? styles.pending : (order.status === 'completed' ? styles.complete : styles.cancel) }>
                        { order.status }
                    </div>
                </div>
                <div className="adminpage-table-body-cell" style={{textAlign: "right", position: "relative"}}>
                    <button id={order._id} className="product-row-button" onClick={this.showAction}>
                        Action
                        <FontAwesomeIcon icon={faSortDown} className="product-row-button-icon" />
                    </button>

                    { (show === order._id && order.status === 'pending' ) &&  
                        <div className="select-order-action-dropdown">
                            <button className="order-action-btn" id="completed" onClick={this.changeStatus}>
                                <span id="complete-icon" />
                                Mark as Completed
                            </button>
                            <button id="canceled" className="order-action-btn" onClick={this.changeStatus}>
                                <span id="cancel-icon" />
                                Mark as Cancel
                            </button>
                        </div>
                    }
                </div>
            </div>
        );
    }
}
 
export default withTracker(() => {
    Meteor.subscribe('details');
    Meteor.subscribe('productList');
    Meteor.subscribe('colors');

    return {
        productDetails: ProductDetails.find({}).fetch(),
        products: Products.find({}).fetch(),
        colors: Colors.find({}).fetch(),
    }
})(OrderRow);
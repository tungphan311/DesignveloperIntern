import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Categories, KindOfClothes } from '../../../api/kind-of-clothes';
import { Subjects } from '../../../api/subjects';
import { ProductDetails } from '../../../api/product-details';
import { Orders } from '../../../api/orders';

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

    findOrder = (product) => {
        const { productDetails, orders } = this.props;
        let sold = 0;

        productDetails.map(detail => {
            // console.log('detail: ', detail);
            orders.map(order => {
                // console.log('order detail: ', order.detail);
                const exist = order.detail.find(dt => dt.productDetailId === detail._id);

                if (exist) {
                    sold += exist.amount;
                }
            });
        });
        
        return sold;
    }

    sold = (product) => {
        const amountInStock = product.quantity;
        
        const sold = this.findOrder(product);

        return sold + '/' + parseInt(sold+amountInStock);
    }

    profit = (product) => {
        const sold = this.findOrder(product);

        const profit = sold * product.price;

        return profit.toFixed(2);
    }

    render() { 
        const { product, category, kindOfClothes, subjects } = this.props;

        if (!category || !subjects || !kindOfClothes) {
            return null;
        }

        const subject = subjects.find(sub => sub._id == kindOfClothes.subjectId);

        return ( 
            <div className="adminpage-table-row">
                <div className="adminpage-table-body-cell">
                    <span className="adminpage-table-body-cell-leftside">
                        <img src={product.images[0]} alt="" className="adminpage-table-product-image" />
                    </span>

                    <div style={{marginLeft: "calc(700vw/144)"}}>
                        <div className="product-row-name">{product.name}</div>
                        <div className="product-row-detail">{`${subject.name}, ${category.name}`}</div>
                    </div>
                </div>
                <div className="adminpage-table-body-cell">
                    { this.sold(product) }
                </div>
                <div className="adminpage-table-body-cell">
                    {this.dateFormat(product.createAt)}
                </div>
                <div className="adminpage-table-body-cell" style={{textAlign: "center"}}>
                    { this.profit(product) }
                </div>
                <div className="adminpage-table-body-cell" style={{textAlign: "right", position: "relative"}}> 
                    <button id={product._id} className="product-row-button" onClick={this.showAction}>
                        Action
                        <FontAwesomeIcon icon={faSortDown} className="product-row-button-icon" />
                    </button>

                    { this.props.show == product._id && 
                        <div className="select-action-dropdown">
                            <button className="action-btn">
                                <img src="/edit.png" alt="edit" className="action-btn-icon" />
                                Edit
                            </button>
                            <button id={product._id} className="action-btn" onClick={this.removeProduct}>
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
 
export default withTracker((props) => {
    const { product } = props;
    // console.log(product);

    Meteor.subscribe('subjects');
    Meteor.subscribe('kindOfClothes');
    Meteor.subscribe('categories');
    Meteor.subscribe('details');
    Meteor.subscribe('orders');

    const category = Categories.findOne({ _id: product.categoryId });
    const kindOfClothes = KindOfClothes.findOne({ _id: product.kindOfClothesId });

    return {
        category,
        kindOfClothes,
        subjects: Subjects.find({}).fetch(),
        productDetails: ProductDetails.find({ productId: product._id }).fetch(),
        orders: Orders.find({ status: 'completed' }).fetch(),
    }
})(ProductRow);
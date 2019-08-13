import React, { Component } from 'react';
import './CartItem.css';
import { withTracker } from 'meteor/react-meteor-data';
import { Products } from '../../api/products';
import { ProductDetails } from '../../api/product-details';

class CartItem extends Component {
    customPrice = (price) => {
        if (price) {
            return "$" + price.toFixed(1);
        }
    }

    render() {
        const { item, productItem, productDetail } = this.props;
        const product = productItem[0];
        return (
            <div className="cart-item">
                <div className="cart-left" style={{backgroundImage: `url(${product.images[0]})`, backgroundSize: "cover"}} />
        
                <div className="cart-right">
                    <div className="cart-item-name">{product.name}</div>
                    <div>
                        <span className="cart-item-price">{this.customPrice(product.price * item.amount)}</span>
                        <div className="cart-item-detail">{`${productDetail.size}.${productDetail.colorId}.${this.props.item.amount}`}</div>
                    </div>
                </div>   
            </div>
        );
    }  
}

export default withTracker((props) => {
    const item = props.item;
    // Meteor.subscribe('productWithDetailId', item.productDetailId);

    const productDetail = ProductDetails.findOne({ _id:  item.productDetailId })
    if (productDetail) {
        productItem = Products.find({ _id: productDetail.productId });
    }

    return {
        productItem: Products.find({}).fetch(),
        productDetail: ProductDetails.findOne({ _id:  item.productDetailId })
    }
})(CartItem);
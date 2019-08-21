import React, { Component } from 'react';
import './CartItem.css';
import { withTracker } from 'meteor/react-meteor-data';
import { Products } from '../../api/products';
import { ProductDetails } from '../../api/product-details';
import { Colors } from '../../api/colors';

class CartItem extends Component {
    customPrice = (price) => {
        if (price) {
            return "$" + price.toFixed(1);
        }
    }

    findColorName = (colorId) => {
        const color = this.props.colors.find(color => color._id == colorId) || {};

        return color.name;
    }

    render() {
        const { item, productItem: product, productDetail } = this.props;
        if (!product) return null

        return (
            <div className="cart-item">
                <div className="cart-left" style={{backgroundImage: `url(${product.images[0]})`, backgroundSize: "cover"}} />
        
                <div className="cart-right">
                    <div className="cart-item-name">{product.name}</div>
                    <div className="cart-item-info">
                        <span className="cart-item-price">{this.customPrice(product.price * item.amount)}</span>
                        <span className="cart-item-detail">
                            {`${productDetail.size} . ${this.findColorName(productDetail.colorId)} . ${this.props.item.amount}pcs`}
                        </span>
                    </div>
                </div>   
            </div>
        );
    }  
}

export default withTracker((props) => {
    const item = props.item;
    Meteor.subscribe('productDetails');
    
    console.log(item);

    let productItem = null

    const productDetail = ProductDetails.findOne({ _id:  item.productDetailId });
    console.log(productDetail);
    if (productDetail) {
        productItem = Products.findOne({ _id: productDetail.productId });
    }

    Meteor.subscribe('colors');

    return {
        productItem,
        productDetail: ProductDetails.findOne({ _id:  item.productDetailId }),
        colors: Colors.find({}).fetch()
    }
})(CartItem);
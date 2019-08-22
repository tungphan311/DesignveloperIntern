import React, { Component, Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Products } from '../../api/products';
import { ProductDetails } from '../../api/product-details';
import { Colors } from '../../api/colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

class CartRow extends Component {
    customPrice = (price) => {
        if (price) {
            this.props.getPrice(price);
            return "$" + price.toFixed(1);
        }
    }

    findColorValue = (colorId) => {
        const color = this.props.colors.find(color => color._id == colorId);

        return color.value;
    }

    decreaseAmount = (event) => {
        // console.log("Card: ", event.target.id);
        this.props.decreaseAmount(event.target.id);
    }

    increaseAmount = (event) => {
        // console.log("Card: ", event.target);
        this.props.increaseAmount(event.target.id);
    }

    removeProduct = (event) => {
        this.props.removeProduct(event.target.id);
    }

    render() {
        const { item, productItem, productDetail } = this.props;
        // console.log(productItem);
        if (!productItem) return null;

        return (
            <Fragment>
                <div className="table-body-cell">
                    <div className="cartpage-product-info-left" style={{backgroundImage: `url(${productItem.images[0]})`, backgroundSize: "cover"}} />
            
                    <div className="cartpage-product-info-right">
                        <div className="cartpage-productname">{productItem.name}</div>
                        
                        <div className="cartpage-buttonwrapper">
                            <button className="cartpage-product-button change-btn">Change</button>
                            <button className="cartpage-product-button" id={productDetail._id} onClick={this.removeProduct}>
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
                <div className="table-body-cell" style={{textAlign: "-webkit-center"}}>
                    <span className="product-cirlce-color" style={{backgroundColor: `${this.findColorValue(productDetail.colorId)}`}} />
                </div>
                <div className="table-body-cell" style={{textAlign: "-webkit-center"}}>
                    <span className="cartpage-productsize">{productDetail.size}</span>
                </div>
                <div className="table-body-cell" style={{textAlign: "-webkit-center"}}>
                    <div className="product-detail-quantity">
                        <button className="quantity-button" onClick={this.decreaseAmount}>
                            <FontAwesomeIcon icon={faMinus} id={productDetail._id} style={{margin: "0", zIndex: "100"}} />
                        </button>
                        <label className="amount-number">{item.amount}</label>
                        <button className="quantity-button" onClick={this.increaseAmount}>
                            <FontAwesomeIcon icon={faPlus} id={productDetail._id} style={{margin: "0", zIndex: "100"}} />
                        </button>
                    </div>
                </div>
                <div className="table-body-cell" style={{textAlign: "right"}}>
                    <div>{this.customPrice(productItem.price * item.amount)}</div>
                </div>
            </Fragment>
        );
    }
}

export default withTracker((props) => {
    const item = props.item;
    Meteor.subscribe('productDetails');

    // console.log(item);

    let productItem = null

    const productDetail = ProductDetails.findOne({ _id:  item.productDetailId });
    // console.log(productDetail);
    if (productDetail) {
        productItem = Products.findOne({ _id: productDetail.productId });
    }

    Meteor.subscribe('colors');

    return {
        productItem,
        productDetail,
        colors: Colors.find({}).fetch()
    }
})(CartRow);
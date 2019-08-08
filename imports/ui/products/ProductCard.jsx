import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Brands } from '../../api/products';

class ProductCard extends React.Component {
    customPrice = (price) => {
        return "$" + price;
    }

    render() {
        const styles = {
            avatar: {
                background: `url(${this.props.avatar})`,
                backgroundSize: "cover",
            }
        }

        return (
            <div className="product-card">
                <div className="avatar-wrapper">
                    <img className="avatar" src={this.props.product.images[0]} alt="avatar"/>
                    <button className="product-card-btn animate">+ Quick shop</button>
                </div>
                <div className="product-name">{this.props.product.name}</div>
                <div className="product-price">{this.customPrice(this.props.product.price)}</div>
            </div>
        );
    }
}

export default withTracker(() => {
    Meteor.subscribe('brands');

    return {
        brands: Brands.find({}).fetch()
    };
})(ProductCard);
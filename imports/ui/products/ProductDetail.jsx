import React from 'react';
import './Product.css';
import { withTracker } from 'meteor/react-meteor-data';
import { Products } from '../../api/products';

class ProductDetail extends React.Component {
    renderImage = () => {
        const product = this.props.product[0];
        
        if (product != undefined) {
            let images = product.images;

            images = images.slice(1);
            
            return images.map(img => (
                <div key={img} className="small-image">
                    <img src={img} alt="image of product" style={ {width: "100%"} } />
                </div>
            ));
        }
    }

    render() {
        const img = this.props.product[0] == undefined? "": this.props.product[0].images[0];
        const product = this.props.product[0] == undefined ? {} :
        {
            name: this.props.product[0].name,
            price: this.props.product[0].price
        }

        const styles = {
            image: {
                background: `url(${img})`,
                backgroundSize: "cover"
            }
        }
        return (
            <div>
                <div className="product-detail">
                    <div className="first-col">
                        {this.renderImage()}
                    </div>
                    <div className="main-img" style={styles.image}>
                        {/* <img src={img} alt="main image" style={ {width: "100%"} } /> */}
                    </div>
                    <div className="detail-col">
                        <div className="product-detail-name">{product.name}</div>
                        <div className="product-detail-price">{product.price}</div>
                    </div>
                    <div className="other-product">
                        abvs
                    </div>
                </div>
            </div>
        );
    }
}

export default withTracker((props) => {
    const productId = props.location.pathname.slice(1);
    // console.log(props);
    Meteor.subscribe('products', {});

    return {
        product: Products.find({ _id: productId }).fetch(),
        // product: Products.find({ }).fetch(),
    };
})(ProductDetail);
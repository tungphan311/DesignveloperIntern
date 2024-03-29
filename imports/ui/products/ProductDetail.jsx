import React from 'react';
import './Product.css';
import { withTracker } from 'meteor/react-meteor-data';
import { Products } from '../../api/products';
import { Colors } from '../../api/colors';
import { ProductDetails } from '../../api/product-details';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import RatingStar from './Rating';
import { Redirect } from 'react-router-dom';

class ProductDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            size: '',
            amountOfSizeS: 0,
            amountOfSizeM: 0,
            amountOfSizeL: 0,
            getSize: false,
            getColors: false,
            listColors: [],
            colorId: '',
            amount: 0,
            reachMaxAmount: false,
        }
    }

    componentDidMount = () => {
        this.setState({size: "S"});
        this.calcRate(3.7);
    }

    componentDidUpdate = () => {
        if (!this.state.getSize && this.props.productDetails.length > 0) {
            this.getSize();
        }
        if (!this.state.getColors && this.props.productDetails.length > 0) {
            this.getColors();
        }
    }

    calcRate = (r) => {
        const f = ~~r, id = 'star' + f + (r % f ? 'half' : '');
        id && (document.getElementById(id).checked = !0);
    }

    renderImage = () => {
        const product = this.props.product[0];
        // console.log(this.props.product);
        
        if (product != undefined) {
            let images = product.images;
            // console.log(images);

            images = images.slice(1);
            
            return images.map(img => (
                <div key={img} className="small-image">
                    <img src={img} alt="image of product" style={ {width: "100%"} } />
                </div>
            ));
        }
    }

    getSize = () => {
        let numberOfSizeS = 0;
        let numberOfSizeM = 0;
        let numberOfSizeL = 0;

        this.props.productDetails.map(detail => {
            if (detail.size == "S") {
                numberOfSizeS += 1;
            } else if (detail.size == "M") {
                numberOfSizeM += 1;
            } else {
                numberOfSizeL += 1;
            }
        });

        this.setState({
            amountOfSizeS: numberOfSizeS,
            amountOfSizeM: numberOfSizeM,
            amountOfSizeL: numberOfSizeL,
            getSize: true
        })
    }

    chooseSize = (event) => {
        const size = event.target.id;

        this.setState({size: size});
    }

    getColors = () => {      
        let result = [];
        const { productDetails } = this.props;
        // console.log(productDetails);
        productDetails.map(detail => {
            if (!result.includes(detail.colorId)) {
                result = [...result, detail.colorId];
            }
        });

        this.setState({
            getColors: true,
            listColors: result
        });
    }

    selectColor = (event) => {
        const id = event.target.id;
        if (this.state.colorId != id) {
            this.setState({colorId: id});
        } else {
            this.setState({colorId: ''});
        }
    } 

    renderColors = () => {
        // console.log(this.props.colors);
        if (this.state.listColors.length > 0) {
            return this.state.listColors.map(colorId => {
                const color = this.props.colors.find(col => col._id === colorId);
                if (!color) return null;
                const { _id, value } = color;
                return (
                    <button key={_id} id={_id} className="product-detail-color-btn" onClick={this.selectColor}
                        style={{
                            backgroundColor: `${value}`,
                            opacity: `${this.state.colorId == _id ? 1 : 0.3 }`
                    }}></button>
                );
            })
        }
    }

    customPrice = (price) => {
        if (price) {
            return "$" + price.toFixed(2);
        }
    }

    decreaseAmount = () => {
        if (this.state.amount) {
            this.setState({amount: this.state.amount - 1, reachMaxAmount: false});
        }
    }

    increaseAmount = () => {
        if (this.state.colorId == '') {
            return false;
        }
        const detail = this.props.productDetails.find((productDetail) => {
            return productDetail.size == this.state.size && productDetail.colorId == this.state.colorId;
        });

        const maxValue = detail.amountInStock;

        if (this.state.amount >= maxValue) {
            this.setState({amount: maxValue, reachMaxAmount: true});
        } else {
            this.setState({amount: this.state.amount + 1});
        }
    }

    addToCart = () => {
        const { colorId, amount } = this.state;

        if (colorId == '') {
            alert("Please choose a color!!!");
            return;
        }

        if (amount == 0) {
            alert("Please choose an amount of product!!!");
            return;
        }

        const addToCart = this.props.addToCart;
        
        const detail = this.props.productDetails.find((productDetail) => {
            return productDetail.size == this.state.size && productDetail.colorId == this.state.colorId;
        });

        addToCart(detail._id, this.state.amount);
        this.setState({ colorId: '', amount: 0 })
    }

    render() {
        let productSelected;
        if (this.props.product.length > 0) {
            productSelected = this.props.product.find(prd => prd._id == this.props.productId);
        }

        const img = productSelected == undefined ? "" : productSelected.images[0];
        const product = productSelected == undefined ? {} :
        {
            name: productSelected.name,
            price: productSelected.price
        }

        const styles = {
            image: {
                backgroundImage: `url(${img})`,
                backgroundSize: "cover"
            },
            sizeSelected: {
                fontWeight: "bold",
                color: "white",
                backgroundColor: "#ffa15f",
                border: "none",
            },
            sizeUnselected: {
                fontWeight: "normal",
                color: "#202124",
                backgroundColor: "white",
                border: "solid 1px #808080",
            },
            sizeNotAvailable: {
                fontWeight: "500",
                color: "#4d4d4d",
                backgroundColor: "white",
                border: "solid 1px #d4d3d3",
                opacity: "0.3"
            }
        }
        return (
            <div>
                { this.props.product.length == 0 &&
                    <Redirect to='/' />
                }
                <div className="product-detail">
                    <div className="first-col">
                        {this.renderImage()}
                    </div>
                    <div className="main-img" style={styles.image}>
                        {/* <img src={img} alt="main image" style={ {width: "100%"} } /> */}
                    </div>
                    <div className="detail-col">
                        <div className="product-detail-name">{product.name}</div>
                        <div className="product-detail-price">{this.customPrice(product.price)}</div>

                        <RatingStar rating={this.state.rating} />

                        <div className="product-detail-size">Size</div>
                        <ul className="list-inline">
                            <li className="list-inline-item">
                                <button className="product-detail-size-btn" onClick={this.chooseSize} disabled={!this.state.amountOfSizeS}
                                    id="S" style={ this.state.amountOfSizeS 
                                            ? (this.state.size == "S" ? styles.sizeSelected : styles.sizeUnselected) 
                                            : styles.sizeNotAvailable }
                                >S
                                </button>
                            </li>
                            <li className="list-inline-item">
                                <button className="product-detail-size-btn" onClick={this.chooseSize} disabled={!this.state.amountOfSizeM}
                                    id="M" style={ this.state.amountOfSizeM 
                                        ? (this.state.size == "M" ? styles.sizeSelected : styles.sizeUnselected) 
                                        : styles.sizeNotAvailable }
                                >M
                                </button>
                            </li>
                            <li className="list-inline-item">
                                <button className="product-detail-size-btn" onClick={this.chooseSize} disabled={!this.state.amountOfSizeL}
                                    id="L" style={ this.state.amountOfSizeL
                                        ? (this.state.size == "L" ? styles.sizeSelected : styles.sizeUnselected) 
                                        : styles.sizeNotAvailable }
                                >L
                                </button>
                            </li>
                        </ul>
                        
                        <div className="product-detail-title">Color</div>
                        {this.renderColors()}

                        <div className="product-detail-quantity-box">
                            Quantity    
                            <div className="product-detail-quantity">
                                <button className="quantity-button" onClick={this.decreaseAmount}>
                                    <FontAwesomeIcon icon={faMinus} style={{margin: "0"}} />
                                </button>
                                <label className="amount-number">{this.state.amount}</label>
                                <button className="quantity-button" onClick={this.increaseAmount}>
                                    <FontAwesomeIcon icon={faPlus} style={{margin: "0"}} />
                                </button>
                            </div>
                        </div>

                        <button className="btn-addToCart" onClick={this.addToCart}>Add to cart</button>
                    </div>
                    <div className="other-product">
                        <div className="more-from">More from</div>
                        <div className="brand-name">Zara</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withTracker((props) => {
    const lastSlashPos = props.location.pathname.lastIndexOf('/');
    const productId = props.location.pathname.slice(lastSlashPos + 1);
    // console.log(productId);
    
    // Meteor.subscribe('productWithBrand', productId);
    // Meteor.subscribe('productWithId', productId);
    Meteor.subscribe('colors');
    Meteor.subscribe('productDetails', productId);

    return {
        productId: productId,
        product: Products.find({ _id: productId }).fetch(),
        colors: Colors.find({}).fetch() || [],
        productDetails: ProductDetails.find({ productId: productId }).fetch()
    };
})(ProductDetail);
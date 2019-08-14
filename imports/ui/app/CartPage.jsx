import React, { Component, Fragment } from 'react';
import './CartPage.css';
import CartRow from './CartRow';


export default class CartPage extends Component {
    renderBody = () => {
        return this.props.cart.map(item => (
            <div key={item.productDetailId} id="custom-table-body">
                <CartRow decreaseAmount={this.props.decreaseAmount} increaseAmount={this.props.increaseAmount} 
                    key={item.productDetailId} item={item} removeProduct={this.props.removeProduct} />
            </div>
        ));
    }
    render() {
        return (
            <div>
                <label className="cartpage-title">My bag</label>

                { this.props.cart.length == 0 ? 
                    <div>
                        There's no item in your bag !
                    </div>
                    : 
                    <Fragment>
                        <div className="cartpage-leftside">
                            <div id="custom-table">
                                <div id="custom-table-header">
                                    <div className="table-header-cell" id="product">
                                        Product
                                    </div>
                                    <div className="table-header-cell" id="color">
                                        Color
                                    </div>
                                    <div className="table-header-cell" id="size">
                                        Size
                                    </div>
                                    <div className="table-header-cell" id="quantity">
                                        Quantity
                                    </div>
                                    <div className="table-header-cell" id="amount">
                                        Amount
                                    </div>
                                </div>
                                
                                { this.renderBody() }
                            </div>
                        </div>
                        <div className="cartpage-rightside">
                            <div className="checkout-title">Total</div>

                            <div className="checkout-detail">
                                <div>
                                    <span className="checkout-detail-text">Shipping & Handling:</span>
                                    <span className="checkout-detail-text" style={{float: "right"}}>Free</span>
                                </div>
                                <div>
                                    <span className="checkout-detail-text">Total product: </span>
                                    <span className="checkout-detail-text" style={{float: "right"}}>6900</span>
                                </div>
                                <hr className="checkout-detail-line" />
                                <div>
                                    <span className="checkout-detail-subtext">Subtotal: </span>
                                    <span className="checkout-detail-subtext" style={{float: "right"}}>6900</span>
                                </div>
                            </div>

                            <div className="checkout-submit">
                                <button className="checkout-submit-btn">Check out</button>
                            </div>
                        </div>
                    </Fragment>
                }
            </div>
        );
    }
}


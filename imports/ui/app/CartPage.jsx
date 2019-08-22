import React, { Component, Fragment } from 'react';
import './CartPage.css';
import CartRow from './CartRow';
import { Meteor } from 'meteor/meteor';
import Orders from '../../api/orders';

export default class CartPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            prices: [],
        }
    }

    renderBody = () => {
        return this.props.cart.map(item => (
            <div key={item.productDetailId} id="custom-table-body">
                <CartRow decreaseAmount={this.props.decreaseAmount} increaseAmount={this.props.increaseAmount} 
                    key={item.productDetailId} item={item} getPrice={this.getPrice} removeProduct={this.props.removeProduct} />
            </div>
        ));
    }

    getPrice = (price) => {
        this.setState(curState => {
            let newState = [...curState.prices, price];

            return {
                prices: newState,
            }
        });
    }

    totalPrice = () => {
        let total = this.state.prices.reduce( (total, item) => total += item, 0);

        return "$" + total.toFixed(1);
    }

    total = () => {
        return this.state.prices.reduce( (total, item) => total += item, 0);
    }

    createOrder = () => {
        // Meteor.call('orders.insert', Meteor.user(), {}, (error) => {
        //     if (error) {
        //         console.log(error);
        //         if (error.error === 'no-user') {
        //             window.alert(error.message);
        //         }
        //     }
        // });

        const { currentUser, cart } = this.props;

        if (!currentUser) {
            window.alert('You have to login first!!!');
            return;
        }

        console.log(cart);

        const createAt = new Date();
        const order = { createAt, detail: cart, total: this.total() };

        Meteor.call("ordersInsert", order, (error) => {
            if (error) {
                window.alert(error);
            } else {
                window.alert('create order successful');
                this.props.history.push('/');
            }
        });
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
                                    <span className="checkout-detail-text" style={{float: "right"}}>{this.totalPrice()}</span>
                                </div>
                                <hr className="checkout-detail-line" />
                                <div>
                                    <span className="checkout-detail-subtext">Subtotal: </span>
                                    <span className="checkout-detail-subtext" style={{float: "right"}}>{this.totalPrice()}</span>
                                </div>
                            </div>

                            <div className="checkout-submit">
                                <button className="checkout-submit-btn" onClick={this.createOrder}>Check out</button>
                            </div>
                        </div>
                    </Fragment>
                }
            </div>
        );
    }
}


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
            getTotal: false,
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
        if (!this.state.getTotal) {
            this.setState(curState => {
                let newState = [...curState.prices, price];
    
                return {
                    prices: newState,
                    getTotal: true,
                }
            });
        }
    }

    totalPrice = () => {
        console.log(this.state.prices);
        let total = this.state.prices.reduce( (total, item) => total += item, 0);

        return "$" + total.toFixed(1);
    }

    total = () => {
        return this.state.prices.reduce( (total, item) => total += item, 0);
    }

    createOrder = () => {
        const { currentUser, cart } = this.props;

        if (!currentUser) {
            window.alert('You have to login first!!!');
            return;
        }

        Meteor.call('orders.insert', cart, this.total(), currentUser.emails[0].address, (error, resopnse) => {
            if (error) {
                window.alert(error);
            } else {
                const orderId = resopnse;
                window.alert('create order successful');
                const emailBody = (
                    <div>
                        <label><b>Thanks for your orders.</b></label>
                        <p>Aware is happy to inform that your order has been received and in processing</p>
                        <div>
                            <label>Order's detail</label>
                            { cart.map(item => (
                                <div>
                                    {`${item.productDetailId} ( x${item.amount} )`}
                                </div>
                            ))}

                            <label>{this.totalPrice()}</label>
                        </div>
                    </div>
                );
                const total = this.totalPrice();
                const html = `<div><label><b>Thanks for your orders.</b></label><p>Aware is happy to inform that your order has been received and in processing</p><div>Total price: ${total}</div></div>`;
                Meteor.call('sendEmail', currentUser.emails[0].address, 'tungpt@dgroup.co', `Order confirmation #${orderId}`, html);
                this.props.emptyCart();
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


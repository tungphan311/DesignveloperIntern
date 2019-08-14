import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import AppHeader from '../nav/AppHeader';
import AppFooter from './AppFooter';
import { Router, Route, Switch } from 'react-router-dom';
import Home from '../home/Home';
import { Subjects } from '../../api/subjects';
import { KindOfClothes } from '../../api/kind-of-clothes';
import ProductList from '../products/ProductList';
import ProductDetail from '../products/ProductDetail';
import CartPage from './CartPage';
import { ProductDetails } from '../../api/product-details';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: []
    }
  }

  addToCart = (detailId, amount) => {
    const product = {
      productDetailId: detailId,
      amount: amount
    }

    this.setState((currentState) => {
      const newCart = [...currentState.cart, product]

      return {
        cart: newCart,
      }
    });
  }

  decreaseAmount = (id) => {
    this.setState((curState) => {

      let newCart = curState.cart.map(product => {
        if (product.productDetailId != id) {
          return product;
        } else {
          if (product.amount == 1) {
            return product;
          } else {
            let newProduct = {...product};
            newProduct.amount -= 1;
            return newProduct;
          }
        }
      });

      return {
        cart: newCart,
      }
    });
  }

  increaseAmount = (id) => {
    this.setState((curState) => {

      let newCart = curState.cart.map(product => {
        if (product.productDetailId != id) {
          return product;
        } else {
          Meteor.subscribe('productDetails');
          
          const prodDetail = this.props.productDetails.find(prd => prd._id == id);
          const maxValue = prodDetail.amountInStock;

          if (product.amount >= maxValue) {
            return product;
          } else {
            let newProduct = {...product};
            newProduct.amount += 1;
            return newProduct;
          }
        }
      });

      return {
        cart: newCart,
      }
    });
  }

  removeProduct = (id) => {
    this.setState(curState => {
      let newCart = [...curState.cart];

      const product = newCart.find(p => p.productDetailId == id);
      const index = newCart.indexOf(product);

      newCart = newCart.filter(p => p != product);

      return {
        cart: newCart,
      }
    });
  }

  render() {
    // console.log(this.state.cart);
    return(
      <div className="app">
        <AppHeader currentUser={this.props.currentUser} subjects={this.props.subjects} kinds={this.props.kindOfClothes} 
          history={this.props.history} cart={this.state.cart} />
        <div className="content">
          <Switch>
            <Route exact path="/" render={(props) => <Home subjects={this.props.subjects} {...props} />} />
            <Route path={["/men", "/ladies/dresses", "/boys", "/girls"]} render={(props) => 
              <ProductList subjects={this.props.subjects} kindOfClothes={this.props.kindOfClothes} {...props} />} />
            <Route path="/product/:productId" render={(props) => 
              <ProductDetail currentUser={this.props.currentUser} addToCart={this.addToCart} {...props} />} />
            <Route exact path="/cart" render={(props) => 
              <CartPage currentUser={this.props.currentUser} cart={this.state.cart} decreaseAmount={this.decreaseAmount} 
                increaseAmount={this.increaseAmount} removeProduct={this.removeProduct} {...props} />} />
          </Switch> 
        </div>
        <AppFooter history={this.props.history} />
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('subjects');
  Meteor.subscribe('kindOfClothes');

  return {
    currentUser: Meteor.user(),
    subjects: Subjects.find({}).fetch(),
    kindOfClothes: KindOfClothes.find({}).fetch(),
    productDetails: ProductDetails.find({}).fetch()
  };
})(App);

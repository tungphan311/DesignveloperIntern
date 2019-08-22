import React, { Component, Fragment } from 'react';
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
import WrongRouter from './WrongRouter';
import AdminPage from '../seller/home/AdminPage';
import { Products } from '../../api/products';

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
      let newCart = [...currentState.cart];

      const isExist = newCart.filter(prd => prd.productDetailId == product.productDetailId);

      if (isExist.length > 0) {
        newCart = newCart.map(prd => {
          if (prd.productDetailId == product.productDetailId) {
            let newProduct = {...prd};

            newProduct.amount += product.amount;

            return newProduct;
          } else {
            return prd;
          }
        });
      } else {
        newCart = [...newCart, product];
      }

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

      return {
        cart: newCart.filter(p => p != product),
      }
    });
  }

  emptyCart = () => {
    console.log('empty cart');
    this.setState({ cart: [] });
  }

  render() {
    console.log(this.props.products);
    const pathname = this.props.history.location.pathname;
    let isAdmin = pathname.substring(1, 6) == 'admin' ? true: false;
    return(
      <Fragment>
        { !isAdmin && 
          <div className="app">
            <AppHeader currentUser={this.props.currentUser} subjects={this.props.subjects} kinds={this.props.kindOfClothes} 
              history={this.props.history} cart={this.state.cart} />
            <div className="content">
              <Switch>
                <Route exact path="/" render={(props) => <Home subjects={this.props.subjects} {...props} />} />
                {/* <Route path={["/men", "/ladies/dresses", "/boys", "/girls"]} render={(props) =>  */}
                <Route path="/products/:subjectName/:kindOfClothesName" render={(props) =>
                  <ProductList subjects={this.props.subjects} kindOfClothes={this.props.kindOfClothes} {...props} />} />

                <Route exact path="/:productId" render={(props) => 
                  <ProductDetail currentUser={this.props.currentUser} addToCart={this.addToCart} {...props} />} />

                <Route exact path="/cart/listProducts" render={(props) => 
                  <CartPage currentUser={this.props.currentUser} cart={this.state.cart} decreaseAmount={this.decreaseAmount} 
                    increaseAmount={this.increaseAmount} removeProduct={this.removeProduct} {...props} emptyCart={this.emptyCart} />} />

                <Route path="**" component={WrongRouter} />
              </Switch> 
            </div>
            <AppFooter history={this.props.history} />
          </div>
        }
        { isAdmin &&
          <div >         
            <Switch>
              <Route path="/admin" component={AdminPage} />
              {/* <Route exact path="/admin/login" component={LoginPage} /> */}
            </Switch>
          </div>
        }
      </Fragment>
    );
  }
}

export default withTracker((props) => {
  Meteor.subscribe('subjects');
  Meteor.subscribe('kindOfClothes');
  Meteor.subscribe('productDetails');

  Meteor.subscribe('products', 'S', 'a');
  // console.log(props);

  return {
    currentUser: Meteor.user(),
    subjects: Subjects.find({}).fetch(),
    kindOfClothes: KindOfClothes.find({}).fetch(),
    productDetails: ProductDetails.find({}).fetch(),
    products: Products.find({}).count(),
  };
})(App);

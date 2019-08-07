import React from 'react';
import './Product.css';
import { withTracker } from 'meteor/react-meteor-data';
import { Categories } from '../../api/kind-of-clothes';
import Category from './Category';
import Filter from './Filter';

class ProductList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            kindOfClothes: {},
            category: 0,
            listProducts: [],
            filter: {
                size: '',
                color: '',
                brand: '',
                price: 0,
                available: '',
            }
        }
    }

    componentDidMount = () => {
        // this.getListProduct();
    }

    getPathName = () => {
        const location = window.location.pathname;

        let lastSplash = location.lastIndexOf('/');

        const pathname = location.substring(lastSplash + 1);

        return pathname;
    }

    customPathName = () => {
        const location = window.location.pathname;
        let lastSplash = location.lastIndexOf('/');

        const kinds = location.substring(1, lastSplash);
        const detail = location.substring(lastSplash + 1);

        const beforeSplash = kinds.charAt(0).toUpperCase() + kinds.slice(1);
        const afterSplash = detail.charAt(0).toUpperCase() + detail.slice(1);

        return beforeSplash + "/" + afterSplash;
    }

    getListProduct = () => {
        const location = window.location.pathname;
        let lastSplash = location.lastIndexOf('/');

        const detail = location.substring(lastSplash + 1);
        const afterSplash = detail.charAt(0).toUpperCase() + detail.slice(1);
        
        const koc = this.props.kindOfClothes.find((obj) => {
            return obj.name === afterSplash;
        });

        const newList = this.props.categories.filter((cat) => cat.kindOfClothesId === koc.id);

        this.setState({
            kindOfClothes: koc,
            listCategories: newList
        });
    }

    categoryClick = (id) => {
        this.setState({category: id});
    }

    chooseSize = (size) => {
        this.setState({
            filter: {
                size: size,
            }
        });
    }

    render() {
        console.log(this.props.categories);
        return (
            <div className="product-list">
                <label className="router">{this.customPathName()}</label>
                <div className="left-side">
                    <Category kindOfClothes={this.state.kindOfClothes} category={this.state.category} 
                        listCategories={this.props.categories} onClick={this.categoryClick} />

                    <Filter onSizeClick={this.chooseSize} size={this.state.filter.size} />
                </div>     
                
                <div className="right-side">
                    asd
                </div>
            </div>
        );
    }
}

export default withTracker((props) => {
    const location = props.history.location.pathname;
    let lastSplash = location.lastIndexOf('/');
    const detail = location.substring(lastSplash + 1);
    const afterSplash = detail.charAt(0).toUpperCase() + detail.slice(1);
    const kindOfClothes = props.kindOfClothes;
    const koc = kindOfClothes.find(obj => {
        return obj.name === afterSplash;
    });
    
    if (koc != undefined) {
        Meteor.subscribe('categories', koc.id);
    }
  
    return {
      categories: Categories.find({}).fetch(),
    };
  })(ProductList);

import React from 'react';
import './Product.css';
import { withTracker } from 'meteor/react-meteor-data';
import { Categories } from '../../api/kind-of-clothes';
import { Products } from '../../api/products';
import Category from './Category';
import Filter from './Filter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import ProductCard from './ProductCard';

class ProductList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            kindOfClothes: {},
            category: 0,
            listProducts: [],
            filter: {
                kindOfClothesId: 0,
                categoryId: 0,
                size: {},
                color: {},
                brand: {},
                price: 0,
                available: '',
            },
            sort: 1,
            showDropdown: false,
            page: 1,
        }
    }

    componentDidMount = () => {
        this.getListProduct();
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
        console.log(this.props);
        const location = window.location.pathname;
        let lastSplash = location.lastIndexOf('/');

        const detail = location.substring(lastSplash + 1);
        const afterSplash = detail.charAt(0).toUpperCase() + detail.slice(1);
        
        const koc = this.props.kindOfClothes.find((obj) => {
            return obj.name === afterSplash;
        });

        if(koc) {
            this.setState({
                kindOfClothes: koc,
                filter: {
                    ...this.state.filter,
                    kindOfClothesId: koc.id
                }
            });
        }    
    }

    categoryClick = (id) => {
        this.setState({
            ...this.state,
            category: id,
            filter: {
                ...this.state.filter,
                categoryId: id
            }
        });
        
        this.props.history.push('category', id);
    }

    chooseSize = (size) => {
        this.setState({
            filter: {
                size: size,
            }
        });
    }

    changeSort = (event) => {
        const value = event.target.id;

        this.setState({
            sort: value,
            showDropdown: false,
        });
    }

    showDropdown = () => {
        this.setState({showDropdown: !this.state.showDropdown});
    }

    renderProductCard = () => {
        return this.props.products.map(product => (
            <ProductCard key={product._id} product={product} history={this.props.history} />
        ));
    }

    render() {
        const sort = {
            1: { value: 'Popularity'},
            2: { value: 'Name: A - Z' },
            3: { value: 'Price: lowest to heightest' },
            4: { value: 'Price: heightest to lowest' }
        };
        let selectSort = this.state.sort;
        return (
            <div className="product-list">
                <label className="router">{this.customPathName()}</label>
                <div className="left-side">
                    <Category kindOfClothes={this.state.kindOfClothes} category={this.state.category} 
                        listCategories={this.props.categories} onClick={this.categoryClick} />

                    <Filter onSizeClick={this.chooseSize} size={this.state.filter.size} />
                </div>     
                
                <div className="right-side">
                    <div className="top-bar">
                        <button className="sort-btn" onClick={this.showDropdown}>
                            <span className="sort-btn-label">Sort by: </span>
                            <span className="sort-btn-value">{sort[selectSort].value}</span>
                            <FontAwesomeIcon icon={faChevronDown} className="sort-btn-icon" />
                        </button>
                        
                        { this.state.showDropdown && 
                            <div className="sort-dropdown">
                                <button id="1" className="dropdown-btn" onClick={this.changeSort}>{sort[1].value}</button>
                                <button id="2" className="dropdown-btn" onClick={this.changeSort}>{sort[2].value}</button>
                                <button id="3" className="dropdown-btn" onClick={this.changeSort}>{sort[3].value}</button>
                                <button id="4" className="dropdown-btn" onClick={this.changeSort}>{sort[4].value}</button>
                            </div>
                        }

                        <div className="paginator">
                            <button className="btn-page">
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </button>
                            <span>{ this.state.page + "/10"}</span>
                            <button className="btn-page">
                                <FontAwesomeIcon icon={faChevronRight} />
                            </button>
                        </div>
                    </div>
                    
                    <div className="product-list">
                        {this.renderProductCard()}
                    </div>
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
        Meteor.subscribe('products', {
            kindOfClothesId: koc.id, 
        });        
    }
  
    return {
      categories: Categories.find({}).fetch(),
      products: Products.find({}, { limit: 20 }).fetch()
    };
  })(ProductList);

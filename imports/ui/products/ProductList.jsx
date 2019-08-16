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
import qs from 'query-string';

class ProductList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            kindOfClothes: {},
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
            showDropdown: false,
            getListProduct: false,
            query: {
                page: 1,
                sort: 1,
                category: 0,
            }
        }
    }

    componentDidUpdate = () => {
        if (this.props.kindOfClothes.length > 0 && !this.state.getListProduct) {
            this.getListProduct();
        }
    }

    componentDidMount = () => {
        this.setState((curState) => {
            let newQuery = {...curState.query};

            newQuery.sort = this.props.sortId;
            newQuery.page = parseInt(this.props.page);

            return {
                query: newQuery,
            }
        });
    }

    getPathName = () => {
        const location = this.props.location.pathname;

        let lastSplash = location.lastIndexOf('/');

        const pathname = location.substring(lastSplash + 1);

        return pathname;
    }

    customPathName = () => {
        // const location = this.props.location.pathname;
        // let lastSplash = location.lastIndexOf('/');

        // const kinds = location.substring(1, lastSplash);
        // const detail = location.substring(lastSplash + 1);

        // const beforeSplash = kinds.charAt(0).toUpperCase() + kinds.slice(1);
        // const afterSplash = detail.charAt(0).toUpperCase() + detail.slice(1);

        // return beforeSplash + "/" + afterSplash;

        const { subjectName, kindOfClothesName } = this.props.match.params;

        return subjectName + '/' + kindOfClothesName;
    }

    getListProduct = () => {
        const location = this.props.location.pathname;
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
                },
                getListProduct: true
            });
        }    
    }

    categoryClick = (id) => {
        let newQuery = {...this.state.query};

        newQuery.category = id;

        const searchString = qs.stringify(newQuery);
        this.props.history.push('?' + searchString);
        this.setState({query: newQuery});
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
        let newQuery = {...this.state.query};
        newQuery.sort = value;

        const searchString = qs.stringify(newQuery);
        this.props.history.push('?' + searchString);

        this.setState({
            showDropdown: false,
            query: newQuery,
        });
    }

    showDropdown = () => {
        this.setState({showDropdown: !this.state.showDropdown});
    }

    renderProductCard = () => {
        return this.props.products.map(product => (
            <ProductCard key={product._id} product={product} history={this.props.history} 
                subjectName={this.props.subjectName} kindOfClothesName={this.props.kindOfClothesName} />
        ));
    }

    toPreviousPage = () => {
        let newQuery = {...this.state.query};

        if (newQuery.page > 1) {
            newQuery.page -= 1;
        }

        const searchString = qs.stringify(newQuery);
        this.props.history.push('?' + searchString);
        this.setState({query: newQuery});
    }

    toNextPage = () => {
        let newQuery = {...this.state.query};

        newQuery.page += 1;

        const searchString = qs.stringify(newQuery);
        this.props.history.push('?' + searchString);
        this.setState({query: newQuery});
    }

    render() {
        const sort = {
            1: { value: 'Popularity'},
            2: { value: 'Name: A - Z' },
            3: { value: 'Price: lowest to heightest' },
            4: { value: 'Price: heightest to lowest' }
        };
        let selectSort = this.state.query.sort;
        return (
            <div className="product-list">
                <label className="router">{this.customPathName()}</label>
                <div className="left-side">
                    <Category kindOfClothes={this.state.kindOfClothes} category={this.state.query.category} 
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
                                <FontAwesomeIcon icon={faChevronLeft} onClick={this.toPreviousPage} />
                            </button>
                            <span>{ this.state.query.page + "/10"}</span>
                            <button className="btn-page">
                                <FontAwesomeIcon icon={faChevronRight} onClick={this.toNextPage} />
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
    console.log(props);
    // const location = props.history.location.pathname;
    // let lastSplash = location.lastIndexOf('/');
    // const detail = location.substring(lastSplash + 1);
    // const afterSplash = detail.charAt(0).toUpperCase() + detail.slice(1);
    const kindOfClothes = props.kindOfClothes;

    const params = props.match.params;
    const subjectName = params.subjectName;
    const kindOfClothesName = params.kindOfClothesName;

    const koc = kindOfClothes.find(obj => {
        return obj.name.toLowerCase() === kindOfClothesName;
    });

    const search = props.history.location.search;

    const categoryIndex = search.indexOf('category');
    let categoryId = 0;
    if (categoryIndex > -1) {
        categoryId = search.substring(categoryIndex+9)[0];
    } else {
        categoryId = 0;
    }

    const sortIndex = search.indexOf('sort');
    let sortId = 1;
    if (sortIndex > -1) {
        sortId = search.substring(sortIndex+5)[0];
    } else {
        sortId = 1;
    }
    
    let sort = null;

    if (sortId == 1) {
        sort = {};
    } else if (sortId == 2) {
        sort = { name: 1 };
    } else if (sortId == 3) {
        sort = { price: 1 };
    } else if (sortId == 4) {
        sort = { price: -1 };
    }

    let pageIndex = search.indexOf('page');
    let page = 1;
    if (pageIndex > -1) {
        page = search.substring(pageIndex+5)[0];
    } else {
        page = 1;
    }
 
    if (koc != undefined) {
        Meteor.subscribe('categories', koc.id);
        Meteor.subscribe('products', {
            kindOfClothesId: koc.id, 
        }, page);        
    }

    let products = [];
    if (categoryId == 0) {
        products = Products.find({}, { sort: sort ,limit: 20 }).fetch();
    }
    else {
         const oldProduct = Products.find({}, { sort: sort ,limit: 20 }).fetch();
         products = oldProduct.filter(prd => prd.categoryId == categoryId);
    }
  
    return {
        page: page,
        sortId: sortId,
        categories: Categories.find({}).fetch(),
        products,
        subjectName,
        kindOfClothesName
    };
  })(ProductList);

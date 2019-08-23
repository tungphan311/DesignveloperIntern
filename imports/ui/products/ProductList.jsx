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
import { Brands } from '../../api/brands';

class ProductList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            kindOfClothes: {},
            listProducts: [],
            // filter: {
            //     kindOfClothesId: 0,
            //     categoryId: '',
            //     size: {},
            //     color: {},
            //     brand: {},
            //     price: 0,
            //     available: '',
            // },
            showDropdown: false,
            getListProduct: false,
            query: {
                page: 1,
                sort: 1,
                category: '',
                brands: [],
            }
        }
    }

    componentDidUpdate = () => {
        if (this.props.kindOfClothes.length > 0 && !this.state.getListProduct) {
            this.getListProduct();
        }
    }

    componentDidMount = () => {
        const { sortId, page, category, size } = this.props;
        this.setState((curState) => {
            let newQuery = {...curState.query};

            newQuery.sort = sortId;
            newQuery.page = page;
            newQuery.category = category;
            newQuery.size = size;

            const searchString = qs.stringify(newQuery);
            this.props.history.push('?' + searchString);

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
                // filter: {
                //     ...this.state.filter,
                //     kindOfClothesId: koc.id
                // },
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
        this.setState(curState => {
            let newQuery = {...curState.query};

            newQuery.size = size;

            const searchString = qs.stringify(newQuery);
            this.props.history.push('?' + searchString);

            return {
                query: newQuery,
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

    toNextPage = (e) => {
        let newQuery = {...this.state.query};
        const max = e.target.id;

        if (newQuery.page < max) {
            newQuery.page += 1;
        }

        const searchString = qs.stringify(newQuery);
        this.props.history.push('?' + searchString);
        this.setState({query: newQuery});
    }

    customRound = (x) => {
        const q = parseInt(x / 20);
        
        return x > 20 * q ? q + 1 : q;
    }

    selectBrands = (id) => {
        let newQuery = {...this.state.query};

        if (!newQuery.brands.includes(id)) {
            newQuery.brands = [...newQuery.brands, id];
        } else {
            newQuery.brands = newQuery.brands.filter( brand => brand !== id );
        }

        const searchString = qs.stringify(newQuery);
        this.props.history.push('?' + searchString);

        this.setState(curState => {
            return {
                query: newQuery,
            }
        });
    }

    render() {
        const sort = {
            1: { value: 'Popularity'},
            2: { value: 'Name: A - Z' },
            3: { value: 'Price: lowest to heightest' },
            4: { value: 'Price: heightest to lowest' }
        };
        let selectSort = this.state.query.sort;
        
        const { size, brands } = this.state.query;

        const { products, productLength } = this.props;

        const maxPage = this.customRound(productLength);

        return (
            <div className="product-list">
                <label className="router">{this.customPathName()}</label>
                <div className="left-side">
                    <Category kindOfClothes={this.state.kindOfClothes} category={this.state.query.category} 
                        listCategories={this.props.categories} onClick={this.categoryClick} />

                    <Filter onSizeClick={this.chooseSize} size={size} selectBrands={this.selectBrands} brands={brands} />
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
                            <span>{ this.state.query.page + "/" + maxPage }</span>
                            <button className="btn-page">
                                <FontAwesomeIcon id={maxPage} icon={faChevronRight} onClick={this.toNextPage} />
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

findId = (search, name, init) => {
    const index = search.indexOf(name);

    let id = 0;
    if (index > -1) {
        let andPos = index;
        for (var i = index; i< search.length; i++) {
            if (search[i] == '&') {
                andPos = i;
                break;
            }
            if (i == search.length - 1 && search != '&') {
                andPos = i +1;
                break;
            }
        }
        let start = index + name.length + 1;
        id = search.substring(start, andPos);
    } else { 
        id = init;
    }

    return id;
}

export default withTracker((props) => {
    const kindOfClothes = props.kindOfClothes;

    const params = props.match.params;
    const subjectName = params.subjectName;
    const kindOfClothesName = params.kindOfClothesName;

    const koc = kindOfClothes.find(obj => {
        return obj.name.toLowerCase() === kindOfClothesName.toLowerCase();
    });

    const search = props.history.location.search;

    let categoryId = findId(search, 'category', 0);

    let sortId = parseInt(findId(search, 'sort', 1));
    
    let sort = sortId == 1 ? {} : (sortId == 2 ? { name: 1 } : (sortId == 3) ? { price: 1 } : { price: -1 });

    let page = parseInt(findId(search, 'page', 1));

    let size = findId(search, 'size', 0);

    let brandId = findId(search, 'brands', 0);

    const limit = 20;
    let skip = (page - 1) * limit;
    let color = '';

    let filter = {};
 
    let products = [];
    let productLength = 0;

    Meteor.subscribe('brands');

    if (koc) {
        Meteor.subscribe('categories', koc._id);
        Meteor.subscribe('productList');  

        // if (!categoryId) {
        //     if (!brandId) {
        //         filter = { kindOfClothesId: koc._id };
        //     } else {
        //         filter = { kindOfClothesId: koc._id, brandId: brandId };
        //     }
        // } else {
        //     if (!brandId) {
        //         filter = { categoryId: categoryId };
        //     } else {
        //         filter = { categoryId: categoryId, brandId: brandId }
        //     }
        // }

        // products = Products.find( filter, { sort: sort ,limit: limit, skip: skip }).fetch();
        // productLength = Products.find(filter).count();
        
        if (categoryId == 0) {
            products = Products.find({ kindOfClothesId: koc._id }, { sort: sort ,limit: limit, skip: skip }).fetch();
            productLength = Products.find({ kindOfClothesId: koc._id }).count();
        }
        else {
            products = Products.find({ categoryId: categoryId }, { sort: sort ,limit: limit, skip: skip }).fetch();
            productLength = Products.find({ categoryId: categoryId }).count();
        }
    }
  
    return {
        page: page,
        sortId: sortId,
        category: categoryId,
        categories: Categories.find({}).fetch(),
        products,
        subjectName,
        kindOfClothesName,
        productLength, size,
        brandList: Brands.find({}).fetch()
    };
  })(ProductList);

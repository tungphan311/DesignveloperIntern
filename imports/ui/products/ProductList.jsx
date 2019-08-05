import React from 'react';
import './Product.css';
import { withTracker } from 'meteor/react-meteor-data';
import { Categories } from '../../api/kind-of-clothes';

class ProductList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            kindOfClothes: {},
            listCategories: [],
            category: 0,
            listProducts: [],
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

    render() {
        return (
            <div className="product-list">
                <label className="router">{this.customPathName()}</label>
                <div className="left-side">
                    <label className="category-label">Category</label>
                    <div>
                        <button className="category-btn">All category</button>
                    </div>
                    {this.state.listCategories.map(cat => (
                        <div key={cat._id}>
                            <button className="category-btn">{cat.name}</button>
                        </div>
                    ))}
                </div>     
            </div>
        );
    }
}

export default withTracker(() => {
    Meteor.subscribe('categories');
  
    return {
      categories: Categories.find({}).fetch(),
    };
  })(ProductList);

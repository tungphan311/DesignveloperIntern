import React, { Component } from 'react';
import ImageUpload from './ImageUpload';
import './add-product.css';
import CategorySelect from './CategorySelect';
import BrandSelect from './BrandSelect';
import SizeSelect from './SizeSelect';
import ColorSelect from './ColorSelect';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Categories } from '../../../api/kind-of-clothes';

class AddProduct extends Component {
    state = { 
        images: [],
        name: '',
        categories: '',
        brand: '',
        price: '',
        sizes: [],
        colors: [],
        quantity: 0,
        description: '',
    }

    componentDidMount = () => {
        this.props.changeMenu(2);
    }

    addPhoto = (image) => {
        this.setState(curState => {
            let newImages = [...curState.images, image];

            return {
                images: newImages,
            }
        });
    }

    textChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        })
    }

    addCategory = (ids) => {
        this.setState({
            categories: ids[0],
        });
    }

    addBrand = (ids) => {
        this.setState({
            brand: ids[0],
        })
    }

    addSize = (ids) => {
        this.setState({
            sizes: ids,
        })
    }

    addColors = (ids) => {
        this.setState({
            colors: ids,
        })
    }

    findKindOfClothesId = (categoryId) => {
        const { categoryList } = this.props;

        const category = categoryList.find(cat => cat._id === categoryId);

        return category.kindOfClothesId;
    }

    addProduct = () => {
        const { images, name, categories, brand, price, sizes, colors, quantity, description } = this.state;
        const { currentUser } = this.props;

        const kindOfClothesId = this.findKindOfClothesId(categories);

        let product = { 
            name, price: parseFloat(price), 
            images, brandId: brand, categoryId: categories, kindOfClothesId: kindOfClothesId,
            quantity: parseInt(quantity), 
            description, createAt: new Date() 
        };

        Meteor.call('products.insert', currentUser, product, (error, response) => {
            if (error) {
                if (error.error === 400) {
                    window.alert('errorMessage', 'Please give right info!!');
                } else if (error.error === 'account-error') {
                    window.alert(error.reason);
                } else if (error.error === 'add-error') {
                    window.alert(error.reason);
                }         
            } else {
                const productId = response;    
            }
        });
    }

    render() { 
        console.log(this.state);
        return ( 
            <div id="add-product-page">
                <div className="add-product-page-label" id="photo-label">PHOTOS</div>
                <div id="product-upload-image">
                    <ImageUpload add={this.addPhoto} />
                    <ImageUpload add={this.addPhoto} />
                    <ImageUpload add={this.addPhoto} />
                    <ImageUpload add={this.addPhoto} />
                    <ImageUpload add={this.addPhoto} />
                </div>
                <p id="upload-image-info">You can add up to 5 photos. The 1st photo will be set as cover (main photo).</p>

                <div className="add-product-page-label" id="name-label">NAME</div>
                <input type="text" id="product-name-input" placeholder="Enter product's name" onChange={this.textChange}
                    name="name" className="product-input-text" />

                <div className="add-product-page-label" id="category-label">CATEGORIES</div>
                <CategorySelect addCategory={this.addCategory} />

                <div className="add-product-page-label" id="category-label">BRAND</div>
                <BrandSelect addBrand={this.addBrand} />

                <div className="add-product-page-label" id="price-label">PRICE($)</div>
                <input type="text" id="product-price-input" placeholder="Enter product's price" onChange={this.textChange}
                    name="price" className="product-input-text" />

                <div className="add-product-page-label" id="category-label">SIZE</div>
                <SizeSelect addSize={this.addSize} />

                <div className="add-product-page-label" id="category-label">COLORS</div>
                <ColorSelect addColors={this.addColors} />

                <div className="add-product-page-label" id="quantity-label">QUANTITY</div>
                <input type="number" id="product-quantity-input" placeholder="Enter product's quantity" onChange={this.textChange}
                    name="quantity" className="product-input-text" />

                <div className="add-product-page-label" id="description-label">DESCRIPTION</div>
                <textarea type="text" id="product-description-input" placeholder="Enter product's description" onChange={this.textChange}
                    name="description" rows={4} className="product-textarea" />

                <div id="product-button-wrapper">
                    <button id="add-product-cancel-btn">Cancel</button>
                    <button id="add-product-complete-btn" onClick={this.addProduct}>Complete</button>
                </div>
            </div>
        );
    }
}
 
export default withTracker(() => {
    Meteor.subscribe('categories');

    return {
        categoryList: Categories.find({}).fetch(),
    }
})(AddProduct);
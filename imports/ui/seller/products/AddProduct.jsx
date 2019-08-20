import React, { Component } from 'react';
import ImageUpload from './ImageUpload';
import './add-product.css';
import CategorySelect from './CategorySelect';
import BrandSelect from './BrandSelect';
import SizeSelect from './SizeSelect';
import ColorSelect from './ColorSelect';

class AddProduct extends Component {
    state = { 
        images: [],
        name: '',
        categories: [],
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

    render() { 
        // console.log(this.state);
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
                <p id="upload-image-info">You can add up to 8 photos. The 1st photo will be set as cover (main photo).</p>

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
                    <button id="add-product-complete-btn">Complete</button>
                </div>
            </div>
        );
    }
}
 
export default AddProduct;
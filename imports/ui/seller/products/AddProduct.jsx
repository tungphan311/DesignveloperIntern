import React, { Component } from 'react';
import ImageUpload from './ImageUpload';

class AddProduct extends Component {
    state = {  }

    componentDidMount = () => {
        this.props.changeMenu(2);
    }
    render() { 
        return ( 
            <div>
                <ImageUpload />
            </div>
        );
    }
}
 
export default AddProduct;
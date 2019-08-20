import React, { Component } from 'react';
import Select from './Select';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Brands } from '../../../api/brands';

class BrandSelect extends Component {
    addProperty = (ids) => {
        this.props.addBrand(ids);
    }

    render() { 
        const options = this.props.brands.map(brand =>  {
            return { _id: brand._id, name: brand.name };
        });

        return ( 
            <Select 
                placeholder="Select brand"
                options={options}
                addProperty={this.addProperty}
            />
        );
    }
}
 
export default withTracker(() => {
    Meteor.subscribe('brands');

    return {
        brands: Brands.find({}).fetch(),
    }
})(BrandSelect);
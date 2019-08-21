import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Categories } from '../../../api/kind-of-clothes';
import Select from './Select';

class CategorySelect extends Component {
    addProperty = (ids) => {
        this.props.addCategory(ids);
    }

    render() { 
        const options = this.props.categories.map(category =>  {
            return { _id: category._id, name: category.name };
        });

        if (!options) return null;

        // console.log(this.props.categories);
        return ( 
            <Select 
                placeholder="Select categories"
                options={options}
                addProperty={this.addProperty}
            />
        );
    }
}
 
export default withTracker(() => {
    Meteor.subscribe('categories');

    return {
        categories: Categories.find({}).fetch(),
    }
})(CategorySelect);
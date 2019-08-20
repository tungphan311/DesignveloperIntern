import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Select from './Select';
import { Colors } from '../../../api/colors';

class ColorSelect extends Component {
    addProperty = (ids) => {
        this.props.addColors(ids);
    }

    render() { 
        const options = this.props.colors.map(color =>  {
            return { _id: color._id, name: color.name };
        });

        if (!options) return null;
        return ( 
            <Select 
                placeholder="Select colors"
                options={options}
                addProperty={this.addProperty}
                multiple
            />
        );
    }
}
 
export default withTracker(() => {
    Meteor.subscribe('colors');

    return {
        colors: Colors.find({}).fetch(),
    }
})(ColorSelect);
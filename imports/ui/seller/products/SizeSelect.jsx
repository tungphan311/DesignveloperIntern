import React, { Component } from 'react';
import Select from './Select';

class SizeSelect extends Component {
    addProperty = (ids) => {
        // this.props.addSize(ids);
    }

    render() { 
        return ( 
            <Select 
                placeholder="Select sizes"
                options={[
                    {_id: 'S', name: 'S'},
                    {_id: 'M', name: 'M'},
                    {_id: 'L', name: 'L'},
                ]}
                addProperty={this.addProperty}
                multiple
            />
        );
    }
}
 
export default SizeSelect;
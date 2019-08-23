import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Brands } from '../../api/brands';
import './brand.css';

class BrandList extends Component {
    onClick = () => {
        this.props.show();
    }

    addBrand = (e) => {
        this.props.addBrand(e.target.id);
    }

    renderBrands = (styles) => {
        const { brands, brandSelected } = this.props;

        // console.log(brandSelected)
        return brands.map(brand => (
            <div key={brand._id} className="brand-row" 
                style={ brandSelected.includes(brand._id) ? styles.selectBtn : styles.unselecBtn }>
                { brand.name }
                <input id={brand._id} type="checkbox" className="brand-checkbox" onChange={this.addBrand} />
            </div>
        ));
    }

    render() { 
        const iconTransform = {
            transform: "rotate(180deg)",
        }

        const styles = {
            unselecBtn: {
                fontWeight: "normal",
                color: "#4d4d4d"
            },
    
            selectBtn: {
                fontWeigh: "600",
                color: "#ffa15f"
            }
        };

        const { selectBrand, click } = this.props;
        let iconStyle = click ? iconTransform : '';
        return (  
            <div>
                <button className="filter-btn" onClick={this.onClick}>
                    Brand
                    <FontAwesomeIcon icon={faChevronDown} style={iconStyle} className="right-icon-btn" />
                </button>

                { click && 
                    <div>
                        <hr className="filter-btn-line" />

                        <div style={{padding: "calc(130vw/144) 0px"}}>
                            { this.renderBrands(styles) }
                        </div>
                    </div>
                }

                <hr className="filter-line" />
            </div>
        );
    }
}
 
export default withTracker(() => {
    Meteor.subscribe('brands');

    return {
        brands: Brands.find({}).fetch(),
    }
})(BrandList);
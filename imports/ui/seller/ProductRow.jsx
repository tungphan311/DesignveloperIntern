import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';


class ProductRow extends Component {
    state = {  }
    render() { 
        const {product} = this.props
        return ( 
            <div className="adminpage-table-row">
                <div className="adminpage-table-body-cell">
                    <span className="adminpage-table-body-cell-leftside">
                        <img src={product.images[0]} alt="" className="adminpage-table-product-image" />
                    </span>

                    <div style={{marginLeft: "calc(700vw/144)"}}>
                        <div className="product-row-name">{product.name}</div>
                        <div className="product-row-detail">{product.categoryId} </div>
                    </div>
                </div>
                <div className="adminpage-table-body-cell">

                </div>
                <div className="adminpage-table-body-cell">

                </div>
                <div className="adminpage-table-body-cell">

                </div>
                <div className="adminpage-table-body-cell" style={{textAlign: "right"}}> 
                    <button className="product-row-button">
                        Action
                        <FontAwesomeIcon icon={faSortDown} className="product-row-button-icon" />
                    </button>
                </div>
            </div>
        );
    }
}
 
export default ProductRow;
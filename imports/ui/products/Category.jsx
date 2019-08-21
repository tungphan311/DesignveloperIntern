import React, { Fragment } from 'react';

export default class Category extends React.Component {
    categoryClick = (id) => {
        this.props.onClick(id);
    }

    render() {
        const styles = {
            choosedBtn: {
                fontWeight: 500,
                color: "#ff6900",
                lineHeight: 1.57,
                letterSpacing: "normal",
                display: "block",
            },
            normalBtn: {
                fontWeight: "normal",
                color: "#4d4d4d",
                lineHeight: 1.57,
                letterSpacing: "-0.1px",
                display: "block",
            }
        };

        return (
            <div>
                <label className="category-label">Category</label>
                <div>
                    { this.props.kindOfClothes && 
                        <button className="category-btn" onClick={() => this.categoryClick(0)}
                            style={this.props.category == 0 ? styles.choosedBtn : styles.normalBtn}>
                            {"All " + this.props.kindOfClothes.name}
                        </button>
                    }
                    <hr className="category-line" />
                </div>
                {this.props.listCategories.map(cat => (
                    <Fragment key={cat._id}>
                        <button className="category-btn" onClick={() => this.categoryClick(cat._id)}
                            style={this.props.category == cat._id ? styles.choosedBtn : styles.normalBtn}>
                            {cat.name}
                        </button>
                    </Fragment>
                ))}

                <hr className="split-line" />
            </div>
        );
    }
}
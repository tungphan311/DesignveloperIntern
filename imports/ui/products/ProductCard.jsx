import React from 'react';

export default class ProductCard extends React.Component {
    render() {
        const styles = {
            avatar: {
                background: `url(${this.props.avatar})`,
                backgroundSize: "cover",
            }
        }
        return (
            <div className="product-card">
                <div className="avatar" style={styles.avatar} />
                <div className="product-name">Collete Stretch Linen Minidress</div>
                <div className="product-price">$69.00</div>
            </div>
        );
    }
}
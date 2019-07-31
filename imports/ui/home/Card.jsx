import React, { Component } from 'react';
import './Home.css';

class Card extends Component {
    render() {
        const styles = {
            background: {
                backgroundImage: `url(${this.props.type.img})`,
            }
        }
        return (
            <div className="card" style={styles.background}>
                <button className="card-btn">Show me</button>
            </div>
        );
    }
}

export default Card;
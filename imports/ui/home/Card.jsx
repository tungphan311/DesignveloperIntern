import React, { Component } from 'react';
import './Home.css';

class Card extends Component {
    cardChoosen = (event) => {
        // event.preventDefault();

        this.props.history.push(this.props.type.route);
    }
    render() {
        const styles = {
            background: {
                // backgroundImage: `url(${"./" + this.props.type.name.toLowerCase() + ".png"})`,
                backgroundImage: `url(${this.props.type.img})`
            }
        }
        return (
            <div className="card" style={styles.background}>
                <label className="card-title">{this.props.type.name}</label>
                <hr className="card-line" />
                <button className="card-btn" onClick={this.cardChoosen}>Show me</button>
            </div>
        );
    }
}

export default Card;
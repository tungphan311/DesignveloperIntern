import React, { Component } from 'react';
import './Home.css';
import Card from './Card';

class Home extends Component {
    getTypes = () => {
        return [
            {
                name: 'Men',
                img: './men.png',
            }, 
            {
                name: 'Ladies',
                img: './ladies.png',
            },
            {
                name: 'Boys',
                img: './boy.png',
            },
            {
                name: 'Girls',
                img: './girls.png',
            }
        ];
    }

    renderCard = () => {
        return this.getTypes().map((type) => (
            <Card key={type.name} type={type} background={type.img} />
        ));
    }

    render() {
        return (
            <div className="home-page">
                <div className="outfit">
                    <div className="outfit-label">
                        <label>OUTFIT OF THE WEEK</label>
                    </div>
                    <div className="outfit-btn-div">
                        <button className="outfit-btn">Shop now</button>
                    </div>
                </div>
                <div className="product-type">
                    { this.renderCard() }
                </div>
            </div>
        );
    }
}

export default Home;
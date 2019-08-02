import React, { Component } from 'react';
import './Home.css';
import Card from './Card';

class Home extends Component {
    constructor(props) {
        super(props);

        console.log(props);
    }

    renderCard = () => {
        return this.props.menus.map((type) => (
            <Card key={type._id} type={type} history={this.props.history} />
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
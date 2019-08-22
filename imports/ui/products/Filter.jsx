import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBold } from '@fortawesome/free-solid-svg-icons';

export default class Filter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sizeClick: false,
            size: '',
            colorClick: false,
            color: '',
        }
    }

    componentWillReceiveProps = () => {
        const { size } = this.props;

        if (size) {
            this.setState({ size: size });
        }
    }

    btnSizeClick = (event) => {
        this.setState({sizeClick: !this.state.sizeClick});
    }

    btnColorClick = (event) => {
        this.setState({colorClick: !this.state.colorClick});
    }

    chooseSize = (event) => {
        let select = event.target.id;

        const { size } = this.state;

        if (select === size) {
            select = '';
        }

        this.props.onSizeClick(select);
        this.setState({size: select});
    }

    render() {
        const styles = {
            selectBtn: {
                fontWeight: "bold",
                color: "white",
                backgroundColor: "#ffa15f",
                border: "none"
            }, 
            unselectBtn: {
                fontWeight: "normal",
                color: "#202124",
                backgroundColor: "white",
                border: "solid 1px #808080",
            },
            iconTransform: {
                transform: "rotate(180deg)",
            }
        };

        const { sizeClick, size, colorClick, color } = this.state;
        let iconStyle = sizeClick ? styles.iconTransform : '';

        return (
            <div>
                <label className="filter-label">Filter</label>

                <div>
                    <button className="filter-btn" onClick={this.btnSizeClick}>
                        Size
                        <FontAwesomeIcon icon={faChevronDown} style={iconStyle} className="right-icon-btn" />
                    </button>

                    { this.state.sizeClick && 
                        <div className="size-group">
                            <hr className="filter-btn-line" />
                            <button id="S" onClick={this.chooseSize} className="size-btn"
                                style={ size === "S" ? styles.selectBtn : styles.unselectBtn }>S</button>
                            <button id="M" onClick={this.chooseSize} className="size-btn"
                                style={ size === "M" ? styles.selectBtn : styles.unselectBtn }>M</button>
                            <button id="L" onClick={this.chooseSize} className="size-btn"
                                style={ size === "L" ? styles.selectBtn : styles.unselectBtn }>L</button>
                        </div>
                    }

                    <hr className="filter-line" />
                </div>

                <div>
                    <button className="filter-btn" onClick={this.btnColorClick}>
                        Color
                        <FontAwesomeIcon icon={faChevronDown} className="right-icon-btn" />
                    </button>

                    <hr className="filter-line" />
                </div>
            </div>
        );
    }
}
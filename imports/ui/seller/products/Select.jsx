import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

class Select extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isOpen: false,
            values: [],
            focusedValue: -1,
            isFocused: false,
        }
    }

    componentDidUpdate = () => {
        const { values } = this.state;

        // const ids = values.map(value => {
        //     return this.findId(value);
        // });

        // this.props.addProperty(ids);
    }

    renderValues = () => {
        const { placeholder, multiple } = this.props;
        const { values } = this.state;

        if (values.length === 0) {
            return (
                <div className="placeholder">
                    { placeholder }
                </div>
            );
        }

        if (multiple) {
            return values.map(value => {
                return (
                    <span key={value} onClick={this.stopPropagation} className="multiple value">
                        { value }
                        <span data-value={value} onClick={this.removeOption} className="delete">
                            <img src="/close-2@3x.png" alt="close icon" style={{width: "calc(160vw/144)"}} />
                        </span>
                    </span>
                );
            });
        }
        
        return (
            <div className="value">
                { values[0] }
            </div>
        );
    }

    stopPropagation = (e) => {
        e.stopPropagation();
    }

    removeOption = (e) => {
        const { value } =  e.currentTarget.dataset;

        this.setState(curState => {
            let [...values] = curState.values;

            const index = values.indexOf(value);

            values.splice(index, 1);

            return {
                values: values,
            }
        });
    }

    renderOptions = () => { 
        const { options } = this.props;
        const { isOpen } = this.state;

        if (!isOpen) {
            return null;
        }

        return (
            <div className="multiselect-options">
                {options.map(this.renderOption)}
            </div>
        );
    }   

    renderOption = (option, index) => {
        const { values, focusedValue } = this.state;
        const { _id, name } = option;

        const selected = values.includes(name);

        let className = "multiselect-option";

        if (selected) {
            className += " selected";
        }

        if (index === focusedValue) {
            className += " focused";
        }

        return (
            <div key={_id} data-value={name} className={className} onMouseOver={this.onHoverOption} onClick={this.onClickOption}>
                { name }
            </div>
        );
    }

    onHoverOption = (e) => {
        const { options } = this.props;
        const { value } = e.currentTarget.dataset;
        
        const index = options.findIndex(opt => opt.name == value);
        
        this.setState({
            focusedValue: index,
        });
    }

    findId = (name) => {
        const value = this.props.options.find(opt => opt.name === name);

        return value._id;
    }

    onClickOption = (e) => {
        const { value } = e.currentTarget.dataset;
        const { multiple } = this.props;

        this.setState(curState => {
            if (!multiple) {
                const id = this.findId(value);
                const ids = [id];
                this.props.addProperty(ids);
                return {
                    values: [value],
                    isOpen: false,
                }
            }

            let [...values] = curState.values;
            const index = values.indexOf(value);

            if (index === -1) {
                values = [...values, value];
            } else {
                values.splice(index, 1);
            }

            const ids = values.map(value => {
                return this.findId(value);
            });
    
            this.props.addProperty(ids);

            return {
                values: values,
            }
        });
    }

    onClick = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        })
    }

    onFocus = () => {
        this.setState({
            isFocused: true
        });
    }

    onBlur = () => {
        const { options, multiple } = this.props;
        this.setState(curState => {
            const { values } = curState;

            if (multiple) {
                return {
                    focusedValue: -1,
                    isFocused: false,
                    isOpen: false,
                }
            } else {
                const value = values[0];

                let focusedValue = -1;

                if (value) {
                    focusedValue = options.findIndex(opt => opt.value === value);
                }

                return {
                    focusedValue,
                    isFocused: false,
                    isOpen: false,
                }
            }
        });
    }

    render() { 
        // console.log(this.state.values);
        const { isOpen } = this.state;
        return ( 
            <div className="custom-multi-select" tabIndex="0" onFocus={ this.onFocus } onBlur={ this.onBlur }>
                <div className="custom-multi-select-selection" onClick={ this.onClick }>
                    { this.renderValues() }
                    <span className="arrow">
                        { isOpen ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} /> }
                    </span>
                </div>
                { this.renderOptions() }
            </div>
        );
    }
}
 
export default Select;

const X = () => (
    <svg viewBox="0 0 16 16">
      <path d="M2 .594l-1.406 1.406.688.719 5.281 5.281-5.281 5.281-.688.719 1.406 1.406.719-.688 5.281-5.281 5.281 5.281.719.688 1.406-1.406-.688-.719-5.281-5.281 5.281-5.281.688-.719-1.406-1.406-.719.688-5.281 5.281-5.281-5.281-.719-.688z" />
    </svg>
  )
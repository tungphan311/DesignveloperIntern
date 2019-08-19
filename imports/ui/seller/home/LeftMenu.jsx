import React, { Component, Fragment } from 'react';

class LeftMenu extends Component {
    changeMenu = (event) => {
        const id = event.target.id;
        if (id < 1 || id > 2) {
            return;
        }
        this.props.changeMenu(id);
    }
    
    renderButton = () => {
        const { menus, selected } = this.props;
        const styles = {
            selected: {
                borderLeft: "solid calc(60vw/144) #ffa15f",
                color: "#ffa15f",
                lineHeight: "1.71",
                textIndent: "calc(600vw/144)"
            },
            unselected: {
                borderLeft: "none",
                color: "#3d3d3f",
                lineHeight: "1.43",
                textIndent: "calc(40vw/9)"
            }
        }

        return menus.map(menu => (
            <button key={menu.name} id={menus.indexOf(menu)} className="leftmenu-button" onClick={this.changeMenu}
                style={ selected == menus.indexOf(menu) ? styles.selected : styles.unselected }>
                { selected == menus.indexOf(menu) ? 
                    <img src={menu.selected_image} alt="menu logo" className="leftmenu-button-icon-selected"/> :
                    <img src={menu.unselected_image} alt="menu logo" className="leftmenu-button-icon-unselected"/>
                }
                
                {menu.name}
            </button>
        ));
    }
    render() { 
        return ( 
            <div>
                { this.renderButton() }
            </div>
        );
    }
}
 
export default LeftMenu;
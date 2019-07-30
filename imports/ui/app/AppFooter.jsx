import React, { Component } from 'react';

class AppFooter extends Component {
    render() {
        return (
            <div className="footer">
                <ul className="text-center list-inline">
                    <li className="list-inline-item">
                        <a className="big-footer-text" href="#">Home</a>
                    </li>
                    <li className="list-inline-item margin-left-40">
                        <a className="big-footer-text" href="#">Products</a>
                    </li>
                    <li className="list-inline-item margin-left-40">
                        <a className="big-footer-text" href="#">Services</a>
                    </li>
                    <li className="list-inline-item margin-left-40">
                        <a className="big-footer-text" href="#">About us</a>
                    </li>
                    <li className="list-inline-item margin-left-40">
                        <a className="big-footer-text" href="#">Help</a>
                    </li>
                    <li className="list-inline-item margin-left-40">
                        <a className="big-footer-text" href="#">Contacts</a>
                    </li>
                </ul>
                <hr className="line" /> 
                <ul className="list-inline">
                    <li className="list-inline-item">
                        <a className="small-footer-text" href="#">Home</a>
                    </li>
                    <li className="list-inline-item margin-left-20">
                        <a className="small-footer-text" href="#">Products</a>
                    </li>
                    <li className="list-inline-item margin-left-20">
                        <a className="small-footer-text" href="#">Services</a>
                    </li>
                    <li className="list-inline-item margin-left-20">
                        <a className="small-footer-text" href="#">About us</a>
                    </li>
                    <li className="list-inline-item margin-left-20">
                        <a className="small-footer-text" href="#">Help</a>
                    </li>
                    <li className="list-inline-item margin-left-20">
                        <a className="small-footer-text" href="#">Contacts</a>
                    </li>
                    <li className="list-inline-item right-text">
                        <a className="small-footer-text" href="#">Terms & Conditions</a>
                    </li>
                    <li className="list-inline-item right-text margin-right-20">
                        <a className="small-footer-text" href="#">Privacy Policy</a>
                    </li>
                </ul>
            </div>
        );
    }
}

export default AppFooter;
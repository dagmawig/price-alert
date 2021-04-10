import React from 'react';
import './Header.css';
import icon from '../images/amazon_icon.png';

function Header() {
    return (
        <div className="header container">
            <div className="header_row row bg-warning">
                <img className="header_img col-2" alt="icon" src={icon}></img>
                <div className="header_title  col-8">
                    <h3 className="header_text">AMAZON PRICE ALERT</h3>
                </div>
                <div className="header_logout col-2">
                    <button className="header_button btn btn-outline-danger" type="button">
                        <i className="fa fa-sign-out fa-2x" ></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;

import React from 'react';
import './Header.css';
import icon from '../images/amazon_icon.png';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { reset } from './priceSlice';

function Header() {
    const dispatch = useDispatch();

    function logout() {
        localStorage.setItem("userID", "");

        dispatch(reset());

        window.location.reload();
    }

    return (
        <div className="header container">
            <div className="header_row row bg-warning">
                <img className="header_img col-2" alt="icon" src={icon}></img>
                <div className="header_title  col-8">
                    <h3 className="header_text">AMAZON PRICE ALERT</h3>
                </div>
                <div className="header_logout col-2">
                    <button className="header_button btn btn-outline-danger" type="button" onClick={logout}>
                        <Link to="/">
                            <i className="fa fa-sign-out fa-2x text-danger" ></i>
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;

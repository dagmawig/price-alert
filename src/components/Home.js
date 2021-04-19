import React, { useState } from 'react';
import './Home.css';
import { useSelector, useDispatch } from 'react-redux';
import { addUrl } from './priceSlice';


function Home() {
    const urlSelector = useSelector((state) => state.price.itemUrl);
    const dispatch = useDispatch();

    const [url, getUrl] = useState('');

    function openAddItem() {
        window.$('#openAddItem').modal('show');
    }
    function openList() {
        window.$('#openAddToList').modal('show');
    }
    /// test function to be deleted
    function addIt(e) {
        e.preventDefault();
        console.log(url);
        dispatch(addUrl(url));
        
    }
    /// test function to be deleted
    let total = Array.from(Array(10).keys());
    console.log(total)
    const item = total.map((val, i) => {
        return (
            <div className="accordion-item" key={i}>
                <h2 className="accordion-header" id={`heading${val}`}>
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${val}`} aria-expanded="false" aria-controls={`collapse${val}`}>
                        <div className="item_header row">
                            <div className="item_name col-4">
                                Item Name
                            </div>
                            <div className="price_section col-8">
                                <div className="price row">
                                    <div className="original_price_title col-6">
                                        Original Price:
                                        </div>
                                    <div className="original_price_number col-6">
                                        $450.00
                                        </div>
                                    <div className="target_price_title col-6">
                                        Target Price:
                                        </div>
                                    <div className="target_price_number col-6">
                                        $400.00
                                        </div>
                                    <div className="current_price_title col-6">
                                        Current Price:
                                        </div>
                                    <div className="current_price_number col-6">
                                        $415.00
                                        </div>
                                </div>
                            </div>
                        </div>
                    </button>
                </h2>
                <div id={`collapse${val}`} className="accordion-collapse collapse" aria-aria-labelledby={`heading${val}`} data-bs-parent="#accordion-parent">
                    <div className="accordion-body">
                        <div className="item_detail row">
                            <div className="date_section col-3">
                                <div className="date_added row">
                                    <div className="date_added_title text-info col-12">
                                        Date Added
                                    </div>
                                    <div className="date_added_date text-info col-12">
                                        Wed Mar 24 2021
                                    </div>
                                </div>
                            </div>
                            <button className="visit_item_button btn btn-outline-success col-4" type="button">
                                Visit Item &nbsp;&nbsp;&nbsp;&nbsp;  <i className="fa fa-arrow-circle-right fa" ></  i>
                            </button>
                            <button className="remove_item_button btn btn-outline-danger col-2" type="button">
                                Delete <i className="fa fa-trash-o fa" ></  i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    });
    return (
        <div className="home container">
            <div className="home_profile row">
                <div className="home_card card col-12">
                    <img className="home_pic" alt="profile picture" src="https://images.dog.ceo/breeds/terrier-tibetan/n02097474_6607.jpg"></img>
                    <div className="home_name card-body">
                        <h4 className="card-text">DAG</h4>
                    </div>
                </div>
            </div>
            <div className="home_add_item row">
                <button className="add_item_button btn btn-outline-success col-6" type="button" onClick={openAddItem}>
                    ADD ITEM
                </button>
                <button className="col-4" onClick={openList}>
                    {urlSelector[1]}
                </button>
            </div>
            <div className="home_item row">
                <div className="accordion col-12" id="accordion-parent">
                    {item}
                </div>
            </div>
            <nav className="home_footer navbar fixed-bottom bg-warning">
                gdfgsdfgsdf
            </nav>

            <div className="modal" id="openAddItem" tabindex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-warning">
                            <h5 className="modal-title fw-bold">CONFIRM ITEM URL</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body add_item_modal_body row">
                            <div className="modal_url_title col-4">
                                URL:
                            </div>
                            <div className="modal_url_box col-8">
                                <input className="modal_url_input" type="text" placeholder="add amazon item url" onChange={(e)=> getUrl(e.target.value)}></input>
                            </div>
                            <div className="modal_current_price_title col-4">
                                Current Price:
                            </div>
                            <div className="moda_current_price_box col-3">
                                <input className="modal_current_price_input" type="number" placeholder="$"></input>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-warning" onClick={addIt}>Confirm Price</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal" id="openAddToList" tabindex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-warning">
                            <h5 className="modal-title fw-bold" style={{"fontSize": "12pt"}}>ENTER TARGET PRICE <span style={{"fontSize": "18pt"}}>OR</span> % DISCOUNT</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body add_item_modal_body row">
                            <div className="modal_confirmed_price_title col-12">
                                CURRENT PRICE
                            </div>
                            <div className="modal_confirmed_price col-12">
                                Confrmed Price
                            </div>
                            <div className="modal_target_price_title col-6">
                                Target Price:
                            </div>
                            <div className="modal_target_price_box col-6">
                                <input className="modal_target_price_input" type="number" placeholder="$"></input>
                            </div>
                            <div className="or col-12">
                                OR
                            </div>
                            <div className="modal_percent_discount_title col-6">
                               % Discount:
                            </div>
                            <div className="modal_percent_discount_box col-6">
                                <input className="modal_percent_discount_input" type="number" placeholder="%"></input>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-warning">Add Item</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;

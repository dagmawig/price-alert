import React, { useEffect, useState } from 'react';
import './Home.css';
import { useSelector, useDispatch } from 'react-redux';
import { addUrl, addPendingUrl } from './priceSlice';
import axios from 'axios';


function Home() {
    const stateSelector = useSelector((state) => state.price);
    const dispatch = useDispatch();

    const [url, getUrl] = useState('');
    const [currentPrice, getCurrentPrice] = useState('');
    const [confirmedPrice, setConfirmedPrice] = useState('');
    const [targetP, getTargetP] = useState(['', '']);
    const [itemName, getItemName] = useState('');

    function openAddItem() {
        window.$('#openAddItem').modal('show');
    }
    function openList() {
        window.$('#openAddToList').modal('show');
    }
    function confirmPrice(e) {
        e.preventDefault();
        if (!url.split(' ').join('') || url.split(' ').join('').substring(0, 5).toLowerCase() !== 'https') alert("Enter a valid url including 'https'.");
        else if (!currentPrice.split(' ').join('') || currentPrice <= 0) alert("Current price of item should be more than 0");
        else {
            //dispatch(addPendingUrl(url));

            async function confirmUrl() {
                let res = await axios.post('http://localhost:3001/confirmUrl', { url: url, price: currentPrice });

                return res;
            }

            confirmUrl()
                .then(res => {
                    let data = res.data;
                    console.log(data);
                    if (data.success) {
                        setConfirmedPrice(data.data)
                        window.$('#openAddItem').modal('hide');
                        window.$('#openAddToList').modal('show');
                    }
                    else {
                        alert(`${data.err} \n make sure the url is correct and contains 'https'.`);
                    }
                });
        }

    }

    function addToList(e) {
        e.preventDefault();


        async function addUrl() {
            let res = await axios.post('http://localhost:3001/addUrl', { userID: "dag001", url: url, itemName: itemName, originalP: parseFloat(currentPrice).toFixed(2), targetP: parseFloat(targetP[0]).toFixed(2) });

            return res;
        };

        addUrl()
            .then(res => {
                let data = res.data;
                console.log(data);
            })
    }

    useEffect(() => {
        async function loadUserData() {
            let res = await axios.post('http://localhost:3001/loadData', { userID: "dag001" });

            return res;
        }

        loadUserData()
            .then(res => {
               let data = res.data.data; 
               console.log(data);
            })
    }, []);

    let total = Array.from(Array(10).keys());

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
                    {stateSelector.itemUrl[1]}
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

            <div className="modal" id="openAddItem" tabIndex="-1">
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
                                <input className="modal_url_input" type="text" placeholder="add amazon item url" onChange={(e) => getUrl(e.target.value)}></input>
                            </div>
                            <div className="modal_current_price_title col-4">
                                Current Price:
                            </div>
                            <div className="moda_current_price_box col-3">
                                <input className="modal_current_price_input" type="number" placeholder="$" onChange={(e) => getCurrentPrice(e.target.value)}></input>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-warning" onClick={confirmPrice}>Confirm Price</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal" id="openAddToList" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-warning">
                            <h5 className="modal-title fw-bold" style={{ "fontSize": "12pt" }}>ENTER TARGET PRICE <span style={{ "fontSize": "18pt" }}>OR</span> % DISCOUNT</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body add_item_modal_body row">
                            <div className="modal_confirmed_price_title col-12">
                                CURRENT PRICE
                            </div>
                            <div className="modal_confirmed_price col-12">
                                {confirmedPrice}
                            </div>
                            <div className="modal_item_name_title col-6">
                                Item Name:
                            </div>
                            <div className="modal_item_name_box col-6">
                                <input className="modal_item_name_input" type="text" placeholder="unique item name" onChange={(e) => getItemName(e.target.value)}></input>
                            </div>
                            <div className="modal_target_price_title col-6">
                                Target Price:
                            </div>
                            <div className="modal_target_price_box col-6">
                                <input className="modal_target_price_input" type="number" placeholder="$" value={targetP[0]} onChange={(e) => getTargetP([e.target.value, (currentPrice - e.target.value) * 100 / currentPrice])}></input>
                            </div>
                            <div className="or col-12">
                                OR
                            </div>
                            <div className="modal_percent_discount_title col-6">
                                % Discount:
                            </div>
                            <div className="modal_percent_discount_box col-6">
                                <input className="modal_percent_discount_input" type="number" placeholder="%" value={(!targetP[1]) ? "" : Math.round(targetP[1])} onChange={(e) => getTargetP([((100 - e.target.value) * currentPrice / 100).toFixed(2), e.target.value])}></input>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-warning" onClick={addToList}>Add Item</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;

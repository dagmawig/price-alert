import React, { useEffect, useState } from 'react';
import './Home.css';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserData, setLoading } from './priceSlice';
import axios from 'axios';
import profile from '../images/profile-picture.png';


function Home() {



    const stateSelector = useSelector((state) => state.price);
    const dispatch = useDispatch();
    let loading = stateSelector.loading;

    const [url, getUrl] = useState('');
    const [currentPrice, getCurrentPrice] = useState('');
    const [confirmedPrice, setConfirmedPrice] = useState('');
    const [targetP, getTargetP] = useState(['', '']);
    const [itemName, getItemName] = useState('');
    const [pendingDeleteItem, setDeleteItem] = useState(['', '']);
    const [name, getName] = useState('');
    const [pImg, setImg] = useState('');

    function openAddItem() {
        document.getElementById('url').value = '';
        document.getElementById('currentP').value = '';
        getUrl('');
        getCurrentPrice('');
        window.$('#openAddItem').modal('show');
    }
    function openProfile() {
        dispatch(setLoading(true));
        axios.get("https://dog.ceo/api/breeds/image/random")
            .then(resp => {
                setImg(resp.data.message);
            }).then(() => {
                window.$('#openProfile').modal('show');
                dispatch(setLoading(false));
            }).catch(err => console.log(err))

    }
    function setProfile() {
        if (!name.split(' ').join('')) alert('enter your name');
        else {
            async function setProfile() {
                let res = await axios.post("https://price-drop-alert.glitch.me/setProfile", { userID: localStorage.getItem("userID"), name: name, pImg: pImg })
                    .catch(err => console.log(err));

                return res;
            }

            dispatch(setLoading(true));
            setProfile()
                .then(res => {
                    let data = res.data;
                    if (data.success) {
                        dispatch(updateUserData(data.data));
                        window.$('#openProfile').modal('hide');
                        dispatch(setLoading(false));

                    }
                    else {
                        dispatch(setLoading(false));
                        alert(`${data.err}`);
                    }
                });
        }
    }

    function confirmPrice(e) {

        e.preventDefault();
        if (!url.split(' ').join('') || url.split(' ').join('').substring(0, 5).toLowerCase() !== 'https') alert("Enter a valid url including 'https'.");
        else if (!currentPrice.split(' ').join('') || currentPrice <= 0) alert("Current price of item should be more than 0");
        else {
            //dispatch(addPendingUrl(url));

            async function confirmUrl() {
                let res = await axios.post('https://price-drop-alert.glitch.me/confirmUrl', { url: url, price: currentPrice })
                    .catch(err => console.log(err));

                return res;
            }

            dispatch(setLoading(true));
            confirmUrl()
                .then(res => {
                    let data = res.data;
                    console.log(data);
                    if (data.success) {
                        setConfirmedPrice(data.data)
                        window.$('#openAddItem').modal('hide');
                        getTargetP(['', '']);
                        getItemName('');
                        window.$('#openAddToList').modal('show');
                        dispatch(setLoading(false));
                    }
                    else {
                        dispatch(setLoading(false));
                        alert(`${data.err} \n make sure the url is correct and contains 'https'.`);
                    }
                });
        }

    }

    function addToList(e) {
        e.preventDefault();

        let itemNameArr = stateSelector.userData.itemNameArr;

        if (itemNameArr.indexOf(itemName) !== -1) alert(`Entered item name already exists. Use a different item name.`);
        else if (!targetP[0].split(' ').join('') || targetP[0] == 0) alert('enter target price more than zero.')
        else if (parseFloat(parseFloat(targetP[0]).toFixed(2)) > parseFloat(parseFloat(currentPrice).toFixed(2))) alert('please enter target price that is less than current price')
        else {
            async function addUrl() {
                let res = await axios.post('https://price-drop-alert.glitch.me/addUrl', { userID: localStorage.getItem("userID"), url: url, itemName: itemName, originalP: parseFloat(currentPrice).toFixed(2), targetP: parseFloat(targetP[0]).toFixed(2) })
                    .catch(err => console.log(err));

                return res;
            };

            dispatch(setLoading(true));
            addUrl()
                .then(res => {
                    let data = res.data;
                    console.log(data);
                    if (data.success) {
                        dispatch(updateUserData(data.data));
                        window.$('#openAddToList').modal('hide');
                        alert(`Item added! \nYou will get email alert when price of \n${itemName} reaches $${parseFloat(targetP[0]).toFixed(2)}.`);
                        dispatch(setLoading(false));
                    }
                    else {
                        dispatch(setLoading(false));
                        alert(`${data.err}`);
                    }
                })
        }
    }

    function openDeleteModal(e) {
        e.preventDefault();

        let itemNameArr = stateSelector.userData.itemNameArr;
        let itemIndex = parseInt(e.target.id);
        setDeleteItem([itemIndex, itemNameArr[itemIndex]]);

        window.$('#openDeleteModal').modal('show');
    }

    function handleDelete(e) {
        e.preventDefault();

        async function deleteItem() {
            let res = await axios.post('https://price-drop-alert.glitch.me/deleteItem', { userID: localStorage.getItem("userID"), itemIndex: pendingDeleteItem[0] })
                .catch(err => console.log(err));

            return res;
        }

        dispatch(setLoading(true));
        deleteItem()
            .then(res => {
                let data = res.data;
                if (data.success) {
                    dispatch(updateUserData(data.data));
                    window.$('#openDeleteModal').modal('hide');
                    alert(`${pendingDeleteItem[1]} successfully deleted from price alert list.`);
                    dispatch(setLoading(false));
                }
                else {
                    dispatch(setLoading(false));
                    alert(`${data.err}`);
                }
            })
    }

    function handleAddItem(e) {
        if (e.key === 'Enter') {
            confirmPrice(e);
        }
    }

    function handleAddToList(e) {
        if (e.key === 'Enter') {
            addToList(e);
        }
    }

    function handleProfile(e) {
        if (e.key === 'Enter') {
            setProfile(e);
        }
    }

    useEffect(() => {

        async function loadUserData() {
            let res = await axios.post('https://price-drop-alert.glitch.me/loadData/', { userID: localStorage.getItem("userID"), email: localStorage.getItem("email") });

            return res;
        }

        dispatch(setLoading(true));

        loadUserData()
            .then(res => {
                let data = res.data.data;
                console.log(data);
                dispatch(updateUserData(data));
                dispatch(setLoading(false));
            })

    }, []);

    let userData = stateSelector.userData;

    const randomImg = () => {
        axios.get("https://dog.ceo/api/breeds/image/random")
            .then(resp => {
                setImg(resp.data.message);
            }).catch(err => alert(`${err}`));
    }
    const itemU = userData.itemNameArr.map((itemName, i) => {

        let date = new Date(userData.timeStampArr[i]);

        // changing UTC timezone to western hemsphere
        date = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toDateString();

        return (
            <div className="accordion-item" key={i}>
                <h2 className="accordion-header" id={`header${i}`}>
                    <button className="accordion-button collapsed bg-warning" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${i}`} aria-expanded="false" aria-controls={`collapse${i}`}>
                        <div className="item_header row">
                            <div className="item_name col-4">
                                {itemName}
                            </div>
                            <div className="price_section col-8">
                                <div className="price row">
                                    <div className="original_price_title col-6">
                                        Original Price:
                                    </div>
                                    <div className="original_price_number col-6">
                                        ${userData.originalPArr[i]}
                                    </div>
                                    <div className="target_price_title col-6">
                                        Target Price:
                                    </div>
                                    <div className="target_price_number col-6">
                                        ${userData.targetPArr[i]}
                                    </div>
                                    <div className="current_price_title col-6">
                                        Current Price:
                                    </div>
                                    <div className="current_price_number col-6">
                                        ${userData.currentPArr[i]}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </button>
                </h2>
                <div id={`collapse${i}`} className="accordion-collapse collapse" aria-aria-labelledby={`heading${i}`} data-bs-parent="#accordion-parent-real">
                    <div className="accordion-body">
                        <div className="item_detail row">
                            <div className="date_section col-4">
                                <div className="date_added row">
                                    <div className="date_added_title text-info col-12">
                                        Date Added
                                </div>
                                    <div className="date_added_date text-info col-12">
                                        {date}
                                    </div>
                                </div>
                            </div>
                            <button className="visit_item_button btn btn-success col-4" type="button">
                                <a href={userData.urlArr[i]} target="_blank" >Visit Item &nbsp;&nbsp;&nbsp;&nbsp;  <i className="fa fa-arrow-circle-right" ></  i></a>
                            </button>
                            <button className="remove_item_button btn btn-outline-danger col-2" type="button" id={`${i}delete`} onClick={openDeleteModal}>
                                Delete <i className="fa fa-trash-o text-danger" ></  i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    })
    
    return (
        <div className="home container">
            <div className="home_profile row" id="profile">
                <div className="home_card card col-12">
                    {
                        (!loading && !stateSelector.userData.pic) ?
                            (<>
                                <img className="home_pic" alt="profile picture" src={profile}></img>
                                <div className="home_name card-body">
                                    <button className="set_profile_button btn btn-outline-info" onClick={openProfile}>

                                        <h6 className="card-text">SET PROFILE</h6>
                                    </button>
                                </div>
                            </>
                            ) : ((!loading && stateSelector.userData.pic) ?
                                (
                                    <>
                                        <img className="home_pic" alt="profile picture" src={stateSelector.userData.pic}></img>
                                        <div className="home_name card-body">
                                            <h4 className="card-text user_name">{stateSelector.userData.name.toUpperCase()}</h4>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <img className="home_pic" alt="profile picture" src={profile}></img>
                                        <div className="home_name card-body">
                                            <h6 className="card-text">Loading...</h6>
                                        </div>
                                    </>
                                )
                            )
                    }
                </div>
            </div>
            <div className="home_item row">
                <div className="accordion col-12" id="accordion-parent-real">
                    {itemU}
                </div>
            </div>
            <nav className="home_footer navbar fixed-bottom bg-warning">
                <button className="add_item_button col-6 btn btn-outline" type="button" onClick={openAddItem}>
                    <b>ADD ITEM</b>
                </button>
            </nav>

            <div className="modal fade" id="openAddItem" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content border-warning">
                        <div className="modal-header border-bottom border-warning bg-warning">
                            <h5 className="modal-title fw-bold">CONFIRM ITEM URL</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body add_item_modal_body row">
                            <form>
                                <div className="form-group">
                                    <label for="url"><b>URL</b></label>
                                    <input type="text" className="form-control" id="url" placeholder="add amazon item url" onChange={(e) => getUrl(e.target.value)} onKeyPress={handleAddItem}></input>
                                    <small className="form-text text -muted">use format https://www.amazon.com/...</small>
                                </div>
                                <br />
                                <div className="form-group">
                                    <label for="currentPrice"><b>Current Price</b></label>
                                    <input type="number" className="form-control " id="currentP" placeholder="$" onChange={(e) => getCurrentPrice(e.target.value)} onKeyPress={handleAddItem}></input>
                                    <small className="form-text text -muted">enter the price you see on amazon item page</small>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-outline-warning" onClick={confirmPrice}>Confirm Price</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="openAddToList" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content border-warning">
                        <div className="modal-header border-bottom border-warning bg-warning">
                            <h5 className="modal-title fw-bold" style={{ "fontSize": "12pt" }}>ENTER TARGET PRICE <span style={{ "fontSize": "18pt" }}>OR</span> % DISCOUNT</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body add_item_modal_body row">
                            <div className="modal_confirmed_price_title col-12">
                                <b>CURRENT PRICE</b>
                            </div>
                            <div className="modal_confirmed_price col-12">
                                <b>{confirmedPrice}</b>
                            </div>
                            <form>
                                <div className="form-group">
                                    <label for="itemName"><b>Item Name</b></label>
                                    <input type="text" className="form-control" id="itemName" placeholder="unique item name" value={itemName} onChange={(e) => getItemName(e.target.value)} onKeyPress={handleAddToList}></input>
                                    <small className="form-text text -muted">give the item a name you can remember</small>
                                </div>
                                <br /><br />
                                <div className="form-group">
                                    <label for="targetPrice"><b>Target Price</b></label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1">$</span>
                                        </div>
                                        <input type="number" className="form-control" id="targetPrice" value={targetP[0]} placeholder="XXXX.XX" onChange={(e) => getTargetP([e.target.value, (currentPrice - e.target.value) * 100 / currentPrice])} onKeyPress={handleAddToList}></input>
                                    </div>

                                    <small className="form-text text -muted">enter a target price point you want to get email alert for</small>
                                </div>
                                <div className="or col-12">
                                    <b>OR</b>
                                </div>
                                <div className="form-group">
                                    <label for="percentDiscount"><b>% Discount</b></label>
                                    <div className="input-group">
                                        <input type="number" className="form-control" id="targetPercent" placeholder="%" value={(!targetP[1]) ? "" : Math.round(targetP[1])} onChange={(e) => getTargetP([((100 - e.target.value) * currentPrice / 100).toFixed(2), e.target.value])} onKeyPress={handleAddToList}></input>
                                        <div className="input-group-append">
                                            <span className="input-group-text" id="basic-addon2">.00 %</span>
                                        </div>
                                    </div>

                                    <small className="form-text text -muted">enter target discount percentage</small>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-outline-warning" onClick={addToList}>Add Item</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="openDeleteModal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content border-danger">
                        <div className="modal-header border-bottom border-danger bg-danger">
                            <h5 className="modal-title fw-bold">DELETE {pendingDeleteItem[1]}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body row">
                            <div className="modal_delete_body col-12">
                                Are you sure you want to delete <span style={{ fontWeight: 'bold' }}>{pendingDeleteItem[1]}</span>?
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-outline-danger" onClick={handleDelete}>Delete Item</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="openProfile" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content border-info">
                        <div className="modal-header border-bottom border-info bg-info">
                            <h5 className="modal-title fw-bold">SET PROFILE</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body modal_profile_body row">
                            <form>
                                <div className="form-group">
                                    <label for="name"><b>Name</b></label>
                                    <input type="text" className="form-control" placeholder="enter your name" onChange={(e) => getName(e.target.value)} onKeyPress={handleProfile}></input>
                                </div>
                                <br />
                                <div className="form-group">
                                    <label for="profilePic" className="pic_label"><b>We picked a profile pic for you...</b></label>
                                    <div className="modal_profile_pic col-12">
                                        <img className="pending_pic" alt="pending pic" src={pImg}></img>
                                    </div>
                                    <div className="modal_diff_pic col-12">
                                        <button className="diff_pic_button btn btn-outline-info" type="button" onClick={randomImg}>Pick a different Picture</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-outline-info" onClick={setProfile}>Set Profile</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;

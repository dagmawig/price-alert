import React from 'react';
import './Home.css';


function Home() {
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
            <div className="home_list list-group">
                <button type="button" className="list-group-item">Item 1</button>
                <button type="button" className="list-group-item">Item 1</button>
                <button type="button" className="list-group-item">Item 1</button>
                <button type="button" className="list-group-item">Item 1</button>
                <button type="button" className="list-group-item">Item 1</button>
                <button type="button" className="list-group-item">Item 1</button>
                <button type="button" className="list-group-item">Item 1</button>
                <button type="button" className="list-group-item">Item 1</button>
                <button type="button" className="list-group-item">Item 9</button>
                <button type="button" className="list-group-item">Item 1</button>
                <button type="button" className="list-group-item">Item 1</button>
                <button type="button" className="list-group-item">Item 1</button>
            </div>
            <nav className="home_footer navbar fixed-bottom bg-warning">
                gdfgsdfgsdf
            </nav>
        </div>
    );
}

export default Home;

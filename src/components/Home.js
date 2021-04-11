import React from 'react';
import './Home.css';


function Home() {
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
                                    <div className="original_price_title col-7">
                                        Original Price:
                                        </div>
                                    <div className="original_price_number col-5">
                                        $450.00
                                        </div>
                                    <div className="target_price_title col-7">
                                        Target Price:
                                        </div>
                                    <div className="target_price_number col-5">
                                        $400.00
                                        </div>
                                    <div className="current_price_title col-7">
                                        Current Price:
                                        </div>
                                        <div className="current_price_number col-5">
                                        $415.00
                                        </div>
                                </div>
                            </div>
                        </div>
                    </button>
                </h2>
                <div id={`collapse${val}`} className="accordion-collapse collapse" aria-aria-labelledby={`heading${val}`} data-bs-parent="#accordion-parent">
                    <div className="accordion-body">
                        detail
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
            <div className="home_item row">
                {/* <div className="home_item_heading col-12">
                    <div className="item_heading_row row">
                        <div className="item_name col-3">
                            Item Name
                        </div>
                        <div className="current_price col-3">
                            Current Price
                        </div>
                        <div className="target_price col-3">
                            Target Price
                        </div>
                    </div>
                </div> */}
                <div className="accordion col-12" id="accordion-parent">
                    {item}
                </div>
            </div>
            <nav className="home_footer navbar fixed-bottom bg-warning">
                gdfgsdfgsdf
            </nav>
        </div>
    );
}

export default Home;

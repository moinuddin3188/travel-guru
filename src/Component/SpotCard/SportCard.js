import React from 'react';
import './SpotCart.css';
import { Link } from 'react-router-dom';

const SpotCard = (props) => {

    const { title, img } = props.spot;

    return (
        <div className="col-md-4">
            <Link to={`/spot/${title}`}>
                <div className="card" style={{ width: "13rem", border: "none", borderRadius: "22px", textAlign: "center" }}>
                    <img src={img} className="card-img-top" alt="..." />
                    <h3 className="title">{title.toUpperCase()}</h3>
                </div>
            </Link>
        </div>
    );
};

export default SpotCard;
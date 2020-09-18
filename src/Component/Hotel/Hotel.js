import React from 'react';
import './Hotel.css';

const Hotel = (props) => {

    const {title, guest, bedroom, bed, bath, img, price} = props.hotel;

    return (
        <div className="single-hotel">
            <img src={img} alt=""/>
            <div className="description">
                <h5>{title}</h5>
                <p>{guest}Guests {bedroom}Bedroom {bed}Bed {bath}Bath</p>
                <p>Wif Air Condition Kitchen</p>
                <p>Cancelation flexibility available</p>
                <p className="price">${price}</p>
            </div>
        </div>
    );
};

export default Hotel;
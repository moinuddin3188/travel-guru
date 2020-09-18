import React from 'react';
import NavbarWhite from '../Navbar/Navbar';
import { hotels, travelSpot } from '../../Fakedata/FakeData';
import Hotel from '../Hotel/Hotel';
import './AfterBooking.css';
import { useParams } from 'react-router-dom';



const AfterBooking = () => {

    const {spotId} = useParams();
    const {title, map} = travelSpot.find(spot => spot.id === parseInt(spotId));

    return (
        <div>
            <NavbarWhite/>
            <div className="container after-booking">
                <p style={{ lineHeight: "10px", fontSize: "15px" }}>252 days sept 16</p>
                <h3 style={{ lineHeight: "10px" }}>Stay in {title}</h3>
                <div className="row">
                    <div className="col-md-7">
                        {
                            hotels.map(hotel => <Hotel key={hotel.id} hotel={hotel} />)
                        }
                    </div>
                    <div className="col-md-5">
                        <iframe
                            src={map}
                            width="370"
                            height="530"
                            frameBorder="0"
                            style={{borderRadius: "10px"}}
                            allowFullScreen=""
                            aria-hidden="false"
                            tabIndex="0">
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AfterBooking;
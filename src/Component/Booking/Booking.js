import React, { useState, useContext } from 'react';
import NavbarWhite from '../Navbar/Navbar';
import { useParams, Link } from 'react-router-dom';
import { travelSpot } from '../../Fakedata/FakeData';
import './Booking.css';
import { UserContext } from '../../App';


const Booking = () => {

    const [user, setUser] = useContext(UserContext);

    const {spotName} = useParams();

    const { title, description, id } = travelSpot.find(spot => spot.title === spotName);
    
    const [origin, setOrigin] = useState(false);
    const handleChange = e => {
        e.target.value.length > 0 ? setOrigin(true) : setOrigin(false);
    }

    return (
        <div className="bg">
            <NavbarWhite/>
            <div className="container booking">
                <div className="row">
                    <div className="col-md-6 booking-heading">
                        <h1>{title.toUpperCase()}</h1>
                        <p>{description}</p>
                    </div>
                    <div className="col-md-6">
                        <div className="booking-form">
                            <form>
                                <p>Origin</p>
                                <input onChange={handleChange} type="text" name="origin" required/>
                                <br />
                                <p>Destination</p>
                                <input type="text" name="destination" defaultValue={title} required/>
                                <br />
                                <div className="d-flex justify-content-between">
                                    <div>
                                    <p>From</p>
                                    <input type="date" name="date" id="" defaultValue="2020-09-16" required />
                                    </div>
                                    <div>
                                    <p>To</p>
                                    <input type="date" name="date" id="" defaultValue="2020-09-17" required/>
                                    </div>
                                </div>
                                <br />
                                <Link to={`/booking/${id}`}>
                                    {origin ? <button onClick={() => setUser({...user, navbarWhite: false})} className="start-booking-btn">Start booking</button> :
                                            <button style={{backgroundColor: "lightgray"}} className="start-booking-btn" disabled>Start booking</button>}
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Booking;
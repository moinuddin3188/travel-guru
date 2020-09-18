import React from 'react';
import './Home.css';
import NavbarWhite from '../Navbar/Navbar';
import { travelSpot } from '../../Fakedata/FakeData';
import SpotCard from '../SpotCard/SportCard';


const Home = () => {

    const spots = travelSpot;

    return (
        <div className="bg">
            <NavbarWhite/>
            <div className="container home">
                <div className="row">
                    <div className="col-md-5 heading">
                        <h1>COX'S BAZAR</h1>
                        <p className="text-light">Cox's bazar is a City, Fishing spot, Tourism spot and District headquater southermpton in Bangladesh. It is famous mostly for it's long natural bitch. Lorem ipsum dolor sit amet.</p>
                        <button className="booking-btn">Booking ⟶</button>
                    </div>
                    <div className="col-md-7">
                        <div className="row">
                            {
                                spots.map(spot => <SpotCard key={spot.id} spot={spot} />)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
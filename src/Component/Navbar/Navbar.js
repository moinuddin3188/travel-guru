import React, { useContext } from 'react';
import './Navbar.css';
import logoW from '../../Fakedata/Images/LogoW.png';
import logoB from '../../Fakedata/Images/Logo.png';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

//start changing.

const NavbarWhite = () => {

    const [user, setUser] = useContext(UserContext);
    const signOut = () => {
        const userInfo = {
            firstName: "",
            lastName: "",
            userName: "",
            email: "",
            password: "",
            error: "",
            success: false,
            navbarWhite: true
        }
        setUser(userInfo);
    }

    const navStyle = {paddingLeft: "0", marginLeft: "-69px"};

    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light">
                {user.navbarWhite ?
                    <a className="navbar-brand" href="#">
                        <img style={{width: "80px"}} src={logoW} alt=""/>
                    </a> :
                    <Link className="navbar-brand" to="/">
                        <img onClick={() => setUser({...user, navbarWhite: true})} style={{ width: "80px",marginRight: "283px" }} src={logoB} alt=""/>
                    </Link>
                }
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        {user.navbarWhite && <form className="form-inline">
                            <input style={{height: "30px", width: "250px", fontSize: "13px"}} className="form-control mr-sm-2" type="search" placeholder="Search your destination...." aria-label="Search"/>
                        </form>}
                        <a className={user.navbarWhite ? "nav-link text-white" : "nav-link"} href="#">News <span className="sr-only">(current)</span></a>
                        <a className={user.navbarWhite ? "nav-link text-white" : "nav-link"} href="#">Destination</a>
                        <a className={user.navbarWhite ? "nav-link text-white" : "nav-link"} href="#">Blog</a>
                        <a className={user.navbarWhite ? "nav-link text-white" : "nav-link"} href="#">Contact</a>
                        {user.userName && <a onClick={signOut} className={user.navbarWhite ? "nav-link text-white" : "nav-link"} href="#">Logout</a>}
                        {
                            user.userName  ? <a className="nav-link user-name" href="#">{user.userName}</a> : 
                            <Link to="/login">
                                <button onClick={() => setUser({...user, navbarWhite: false})} className="btn login-btn">Login</button>
                            </Link>
                        }
                    </div>
                    </div>
            </nav>
        </div>
    );
};

export default NavbarWhite;
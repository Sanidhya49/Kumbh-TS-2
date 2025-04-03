import React, { useState } from 'react';
import kumbh from '../assets/kumbh.jpeg'
import kedarnath from '../assets/kedarnath.jpeg'
import tirupati from '../assets/tirupati.jpeg'
import mahakal from '../assets/mahakal.jpeg'
import logo from '../assets/umbh-ts.png'
import { IoMdMoon } from "react-icons/io";
import { IoSunny } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Home = () => {

     const [theme, setTheme] = useState('day'); // 'day' or 'night')
        
    const toggleTheme = () => {
        setTheme(theme === 'day' ? 'night' : 'day');
    };

    return (
        <>
        <div className={`${theme === "day" ? "bg-day" : "bg-night"} home container-fluid w-100 p-0`}>
            <nav className="navbar navbar-expand-lg navbar-light w-100 p-0 m-0">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><img src={logo} width="150" alt="Logo" /></Link>
                    
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav  ms-auto mb-2 mb-lg-0">
                            <li className="nav-item"><Link className="nav-link" to="/signup">Sign Up</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/login">Log In</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/journey">Plan Journey</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/profile">Edit Profile</Link></li>
                        </ul>
                    </div>
                    <button className="btn btn-svg" onClick={toggleTheme}>
                        {theme === 'day' ? <IoMdMoon /> : <IoSunny/>} 
                    </button>
                </div>
            </nav>

        
            <div className="row align-items-center w-100">
                <div className="sidecol col-md-8">
                    <div className="mainheading"><h1>KUMBH-TS</h1></div>
                    <h1>K-Means Updated Method For Bharat Highway - Traffic System</h1>
                    <div className="subheading">
                        <h1>Register Your Vehicle For Hassle Free Journey</h1>
                    </div>
                    <p>
                    An innovative vehicle registration and traffic management platform <br/> designed to streamline highway travel across India.
                    </p>
                </div>
                <div className="col-md-4 text-end d-flex flex-column align-items-end">
                    <div className="d-flex flex-column mt-4 side align-items-end">
                        <img className="mb-3" width="300px" height="160px" src={kumbh} alt="kumbh" />
                        <img className="mb-3" width="300px" height="160px" src={kedarnath} alt="kedarnath" />
                        <img className="mb-3" width="300px" height="160px" src={tirupati} alt="tirupati" />
                        <img className="mb-3" width="300px" height="160px" src={mahakal} alt="mahakal" />
                    </div>
                </div>
            </div>
        </div>
            </>
    );
};

export default Home;
import React, { useEffect, useState } from 'react';
import kumbh from '../assets/kumbh.jpeg';
import kedarnath from '../assets/kedarnath.jpeg';
import tirupati from '../assets/tirupati.jpeg';
import mahakal from '../assets/mahakal.jpeg';
import logo from '../assets/umbh-ts.png';
import { IoMdMoon } from "react-icons/io";
import { IoSunny } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Home = () => {
    const [theme, setTheme] = useState('day'); // 'day' or 'night'
    const [scrolled, setScrolled] = useState(false);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'day' ? 'night' : 'day'));
    };

    useEffect(() => {
        document.body.classList.remove('bg-day', 'bg-night');
        document.body.classList.add(`bg-${theme}`);
      }, [theme]);
      

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };


        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        
        <div className={`${theme === "day" ? "bg-day" : "bg-night"} home container-fluid w-100 p-0`}>
            {/* Navbar */}
            <nav className={`navbar ${scrolled ? "scrolled" : "transparent"}`}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} width="150" alt="Logo" />
                    </Link>

                    <ul className="navbar-nav ms-auto mb-2 mb-lg-2 d-flex flex-row align-items-center">
                        <li><Link className="nav-link" to="/signup">Sign Up</Link></li>
                        <li><Link className="nav-link" to="/login">Log In</Link></li>
                        {/* <li className="nav-item mx-2"><Link className="nav-link" to="/journey">Plan Journey</Link></li>
                        <li className="nav-item mx-2"><Link className="nav-link" to="/profile">Edit Profile</Link></li> */}
                        <li>
                            <button className="btn btn-svg" onClick={toggleTheme}>
                                {theme === 'day' ? <IoMdMoon /> : <IoSunny />}
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className="row align-items-center w-100 pt-5">
                <div className="sidecol col-md-8 px-5">
                    <div className="mainheading">
                        <h1>KUMBH-TS</h1>
                    </div>
                    <h1>K-Means Updated Method For Bharat Highway - Traffic System</h1>
                    <div className="subheading">
                        <h2>Register Your Vehicle For Hassle Free Journey</h2>
                    </div>
                    <p>
                        An innovative vehicle registration and traffic management platform<br />
                        designed to streamline highway travel across India.
                    </p>
                </div>

                <div className="image-cluster col-md-4">
                    <div className="image-tile"><img src={kumbh} alt="Kumbh" /></div>
                    <div className="image-tile"><img src={kedarnath} alt="Kedarnath" /></div>
                    <div className="image-tile"><img src={tirupati} alt="Tirupati" /></div>
                    <div className="image-tile"><img src={mahakal} alt="Mahakal" /></div>
                </div>
            </div>
        </div>
    );
};

export default Home;

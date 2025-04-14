import React from 'react';
import kumbh from '../assets/kumbh.jpeg';
import kedarnath from '../assets/kedarnath.jpeg';
import tirupati from '../assets/tirupati.jpeg';
import mahakal from '../assets/mahakal.jpeg';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
    const { theme } = useTheme();

    return (
        <div className={`home container-fluid w-100 p-0`}>
            <div className="row align-items-center w-100">
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
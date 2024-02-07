import React from 'react';
import '../styles/NavBar.css';
import HomeIcon from '../images/Home.png';
import RulesIcon from '../images/Rules.png';
import AboutIcon from '../images/About.png';
import RestartIcon from '../images/Restart.png';

const Navbar = ({ onHomeClick, onRulesClick, onRestartClick, onAboutClick, playTapSound }) => {
    return (
        <div className="navbar">
            <button className="nav-item" onClick={() => { onHomeClick(); playTapSound(); }}>
                <img src={HomeIcon} alt="Home" className="nav-icon"/>
                Home
            </button>
            <button className="nav-item" onClick={() => { onRulesClick(); playTapSound(); }}>
                <img src={RulesIcon} alt="Rules" className="nav-icon"/>
                Rules
            </button>
            <button className="nav-item" onClick={() => { onAboutClick(); playTapSound(); }}>
                <img src={AboutIcon} alt="About" className="nav-icon"/>
                About
            </button>
            <button className="nav-item" onClick={() => { onRestartClick(); playTapSound(); }}>
                <img src={RestartIcon} alt="Restart" className="nav-icon"/>
                Restart
            </button>
        </div>
    );
};

export default Navbar;

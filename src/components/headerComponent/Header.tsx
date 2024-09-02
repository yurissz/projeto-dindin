import React from "react";
import './header.css'
import logo from '../../assets/didinLogo.svg';
import userIcon from '../../assets/icon/iconUser.svg'
import logout from '../../assets/icon/iconLogout.svg'
import { useNavigate } from "react-router-dom";

interface HeaderProps {
    children: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ children }) => {

    const navigate = useNavigate();

    const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    }

    const userData = localStorage?.getItem('user');
    const user = JSON.parse(userData);
    const name = user?.nome

    const formatName = (name:string) => {
        const firstName = name?.split(' ')[0]
        firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
        return firstName
    }

    return (
        <div className="customHeader">
            <div className="customConteiner">
                <img src={logo} alt="dindinLogo" className="dindinLogo" />
                <div className="alingNavBar">
                    <div className="alingUserName">
                        <img src={userIcon} alt="userImg" className="userImg" />
                        <p className="customName">{userData ? formatName(name) : 'Usuario sem nome'}</p>
                    </div>
                    <img src={logout} alt="logoutImg" className="logoutImg" onClick={handleLogout} />
                </div>
            </div>
            {children}
        </div>
    )
}

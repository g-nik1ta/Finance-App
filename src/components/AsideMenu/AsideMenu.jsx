import React from 'react';
import './AsideMenu.scss';
import { Link, useLocation } from 'react-router-dom';
import Dashbord from 'svg/Dashbord';
import Profile from 'svg/Profile';
import Settings from 'svg/Settings';
import { getRoute } from 'utils/routes';

const AsideMenu = () => {
    const location = useLocation()
    console.log();

    return (
        <aside className='aside_menu'>
            <a href="" className="logo_wrapper">
                <img src={require("assets/logo.png")} alt="Logo" className='logo' />
                <div className='flex column'>
                    <h2 className="app_title">Finance App</h2>
                    <span className="developed">Developed by Nikita</span>
                </div>
            </a>
            <nav className='nav_list'>
                <Link to={getRoute('profile')} className={'nav_item' + (getRoute('profile') === location.pathname ? ' active' : "")}>
                    <Profile />
                    <span>Profile</span>
                </Link>
                <Link to={getRoute('dashbord')} className={'nav_item' + (getRoute('dashbord') === location.pathname ? ' active' : "")}>
                    <Dashbord />
                    <span>Dashbord</span>
                </Link>
                <Link to={getRoute('settings')} className={'nav_item' + (getRoute('settings') === location.pathname ? ' active' : "")}>
                    <Settings />
                    <span>Settings</span>
                </Link>
            </nav>

        </aside>
    )
}

export default AsideMenu;
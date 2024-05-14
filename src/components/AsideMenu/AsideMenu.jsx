import React, { useEffect, useRef, useState } from 'react';
import './AsideMenu.scss';
import { Link, useLocation } from 'react-router-dom';
import Dashboard from 'svg/Dashboard';
import Profile from 'svg/Profile';
import Settings from 'svg/Settings';
import { getRoute } from 'utils/routes';
import ArrowDown from 'svg/ArrowDown';
import SelectProfile from 'svg/SelectProfile';

const AsideMenu = () => {
    const location = useLocation();
    const [openSelect, setOpenSelect] = useState(false);
    const ref = useRef();
    const clickFuncRef = useRef();

    const openSelectHandler = (e) => {
        const bool = !openSelect;
        setOpenSelect(bool);

        if (bool) {
            document.addEventListener('mousedown', clickFuncRef.current);
        } else {
            document.removeEventListener('mousedown', clickFuncRef.current);
        }
    }

    useEffect(() => {
        clickFuncRef.current = (e) => {
            if (e.target.closest('.select_box') !== ref.current) {
                setOpenSelect(false);
                document.removeEventListener('mousedown', clickFuncRef.current);
            }
        };
    }, []);

    // const breadcrumb = useSelector(state => state.PageReducer.breadcrumb);
    useEffect(() => {
        return () => {
            setOpenSelect(false);
            document.removeEventListener('mousedown', clickFuncRef.current);
        }
    }, [])

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
                <Link to={getRoute('dashboard')} className={'nav_item' + (getRoute('dashboard') === location.pathname ? ' active' : "")}>
                    <Dashboard />
                    <span>Dashboard</span>
                </Link>
                <Link to={getRoute('settings')} className={'nav_item' + (getRoute('settings') === location.pathname ? ' active' : "")}>
                    <Settings />
                    <span>Settings</span>
                </Link>
            </nav>
            <div ref={ref} className="select_box">
                <div className={"current_value" + (openSelect ? " open" : "")} onClick={openSelectHandler}>
                    <svg className='avatar' width="512" height="512" x="0" y="0" viewBox="0 0 45.532 45.532" ><g><path d="M22.766.001C10.194.001 0 10.193 0 22.766s10.193 22.765 22.766 22.765c12.574 0 22.766-10.192 22.766-22.765S35.34.001 22.766.001zm0 6.807a7.53 7.53 0 1 1 .001 15.06 7.53 7.53 0 0 1-.001-15.06zm-.005 32.771a16.708 16.708 0 0 1-10.88-4.012 3.209 3.209 0 0 1-1.126-2.439c0-4.217 3.413-7.592 7.631-7.592h8.762c4.219 0 7.619 3.375 7.619 7.592a3.2 3.2 0 0 1-1.125 2.438 16.702 16.702 0 0 1-10.881 4.013z" fill="#ffffff"></path></g></svg>
                    <span className="name">Lisard Bob</span>
                    <ArrowDown className="arrow_down" />
                </div>
                <div className={"options" + (openSelect ? " open" : "")} style={{maxHeight: openSelect ? 50 * 2 + 'px' : 25 * 2 + 'px'}}>
                    <div className="option active">
                        <svg className='avatar' width="512" height="512" x="0" y="0" viewBox="0 0 45.532 45.532" ><g><path d="M22.766.001C10.194.001 0 10.193 0 22.766s10.193 22.765 22.766 22.765c12.574 0 22.766-10.192 22.766-22.765S35.34.001 22.766.001zm0 6.807a7.53 7.53 0 1 1 .001 15.06 7.53 7.53 0 0 1-.001-15.06zm-.005 32.771a16.708 16.708 0 0 1-10.88-4.012 3.209 3.209 0 0 1-1.126-2.439c0-4.217 3.413-7.592 7.631-7.592h8.762c4.219 0 7.619 3.375 7.619 7.592a3.2 3.2 0 0 1-1.125 2.438 16.702 16.702 0 0 1-10.881 4.013z" fill="#ffffff"></path></g></svg>
                        <span className="name">Lisard Bob</span>
                        <SelectProfile className="select_profile" />
                    </div>
                    <div className="option">
                        <svg className='avatar' width="512" height="512" x="0" y="0" viewBox="0 0 45.532 45.532" ><g><path d="M22.766.001C10.194.001 0 10.193 0 22.766s10.193 22.765 22.766 22.765c12.574 0 22.766-10.192 22.766-22.765S35.34.001 22.766.001zm0 6.807a7.53 7.53 0 1 1 .001 15.06 7.53 7.53 0 0 1-.001-15.06zm-.005 32.771a16.708 16.708 0 0 1-10.88-4.012 3.209 3.209 0 0 1-1.126-2.439c0-4.217 3.413-7.592 7.631-7.592h8.762c4.219 0 7.619 3.375 7.619 7.592a3.2 3.2 0 0 1-1.125 2.438 16.702 16.702 0 0 1-10.881 4.013z" fill="#ffffff"></path></g></svg>
                        <span className="name">Nikita</span>
                        <SelectProfile className="select_profile" />
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default AsideMenu;
import React, { useEffect, useRef, useState } from 'react';
import './AsideMenu.scss';
import { Link, useLocation } from 'react-router-dom';
import Dashboard from 'svg/Dashboard';
import Profile from 'svg/Profile';
import Settings from 'svg/Settings';
import { getRoute } from 'utils/routes';
import ArrowDown from 'svg/ArrowDown';
import SelectProfile from 'svg/SelectProfile';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, signOut } from 'firebase/auth';
import { app } from 'firebase.js';
import { setUserAction } from 'store/ProfileReducer';

const AsideMenu = () => {
    const dispatch = useDispatch()
    const location = useLocation();
    const [openSelect, setOpenSelect] = useState(false);
    const ref = useRef();
    const clickFuncRef = useRef();

    const user = useSelector(state => state.ProfileReducer.user);
    const auth = getAuth(app);

    const openSelectHandler = (e) => {
        const bool = !openSelect;
        setOpenSelect(bool);

        if (bool) {
            document.addEventListener('mousedown', clickFuncRef.current);
        } else {
            document.removeEventListener('mousedown', clickFuncRef.current);
        }
    }

    const exitHandler = () => {
        signOut(auth).then(() => {
            console.log('Sign out is success');
            localStorage.removeItem('financeAppRefreshToken');
			dispatch(setUserAction(null)) 
        }).catch((error) => {
            console.error('Ошибка при попытке выйти из аккаунта:', error);;
        });
    }

    useEffect(() => {
        clickFuncRef.current = (e) => {
            if (e.target.closest('.select_box') !== ref.current) {
                setOpenSelect(false);
                document.removeEventListener('mousedown', clickFuncRef.current);
            }
        };
    }, []);

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
                    <span>Settings & Support</span>
                </Link>
            </nav>
            <div ref={ref} className="select_box">
                <div className={"current_value" + (openSelect ? " open" : "")} onClick={openSelectHandler}>
                    <svg className='avatar' width="512" height="512" x="0" y="0" viewBox="0 0 45.532 45.532" ><g><path d="M22.766.001C10.194.001 0 10.193 0 22.766s10.193 22.765 22.766 22.765c12.574 0 22.766-10.192 22.766-22.765S35.34.001 22.766.001zm0 6.807a7.53 7.53 0 1 1 .001 15.06 7.53 7.53 0 0 1-.001-15.06zm-.005 32.771a16.708 16.708 0 0 1-10.88-4.012 3.209 3.209 0 0 1-1.126-2.439c0-4.217 3.413-7.592 7.631-7.592h8.762c4.219 0 7.619 3.375 7.619 7.592a3.2 3.2 0 0 1-1.125 2.438 16.702 16.702 0 0 1-10.881 4.013z" fill="#ffffff"></path></g></svg>
                    <span className="name">{user.name}</span>
                    <ArrowDown className="arrow_down" />
                </div>
                <div className={"options" + (openSelect ? " open" : "")} style={{ maxHeight: openSelect ? 50 * 2 + 'px' : 25 * 2 + 'px' }}>
                    <div className="option active">
                        <svg className='avatar' width="512" height="512" x="0" y="0" viewBox="0 0 45.532 45.532" ><g><path d="M22.766.001C10.194.001 0 10.193 0 22.766s10.193 22.765 22.766 22.765c12.574 0 22.766-10.192 22.766-22.765S35.34.001 22.766.001zm0 6.807a7.53 7.53 0 1 1 .001 15.06 7.53 7.53 0 0 1-.001-15.06zm-.005 32.771a16.708 16.708 0 0 1-10.88-4.012 3.209 3.209 0 0 1-1.126-2.439c0-4.217 3.413-7.592 7.631-7.592h8.762c4.219 0 7.619 3.375 7.619 7.592a3.2 3.2 0 0 1-1.125 2.438 16.702 16.702 0 0 1-10.881 4.013z" fill="#ffffff"></path></g></svg>
                        <span className="name">{user.name}</span>
                        <SelectProfile className="select_profile" />
                    </div>
                    <div className="option" onClick={exitHandler}>
                        <svg className='exit' width="512" height="512" x="0" y="0" viewBox="0 0 512.016 512"><g><path d="M496 240.008H293.332c-8.832 0-16-7.168-16-16s7.168-16 16-16H496c8.832 0 16 7.168 16 16s-7.168 16-16 16zm0 0" fill="#ffffff"></path><path d="M416 320.008a15.89 15.89 0 0 1-11.309-4.692c-6.25-6.253-6.25-16.386 0-22.636l68.696-68.692-68.696-68.695c-6.25-6.25-6.25-16.383 0-22.633 6.254-6.254 16.387-6.254 22.637 0l80 80c6.25 6.25 6.25 16.383 0 22.633l-80 80A15.896 15.896 0 0 1 416 320.008zM170.668 512.008c-4.566 0-8.898-.64-13.227-1.985L29.055 467.25C11.585 461.148 0 444.871 0 426.676v-384C0 19.145 19.137.008 42.668.008c4.562 0 8.895.64 13.227 1.984l128.382 42.774c17.473 6.101 29.055 22.379 29.055 40.574v384c0 23.531-19.133 42.668-42.664 42.668zm-128-480c-5.867 0-10.668 4.8-10.668 10.668v384c0 4.543 3.05 8.765 7.402 10.281l127.785 42.582c.918.297 2.114.469 3.481.469 5.867 0 10.664-4.801 10.664-10.668v-384c0-4.543-3.05-8.766-7.402-10.281L46.145 32.477c-.918-.297-2.114-.47-3.477-.47zm0 0" fill="#ffffff"></path><path d="M325.332 170.676c-8.832 0-16-7.168-16-16v-96c0-14.7-11.965-26.668-26.664-26.668h-240c-8.832 0-16-7.168-16-16s7.168-16 16-16h240c32.363 0 58.664 26.305 58.664 58.668v96c0 8.832-7.168 16-16 16zM282.668 448.008h-85.336c-8.832 0-16-7.168-16-16s7.168-16 16-16h85.336c14.7 0 26.664-11.969 26.664-26.668v-96c0-8.832 7.168-16 16-16s16 7.168 16 16v96c0 32.363-26.3 58.668-58.664 58.668zm0 0" fill="#ffffff"></path></g></svg>
                        <span className="name">Exit</span>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default AsideMenu;
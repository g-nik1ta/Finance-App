import React, { useEffect } from 'react';
import './Settings.scss';
import { usePageProps } from 'hooks/useReducer';
import Telegram from 'svg/Telegram';

const Settings = () => {
    const pageProps = usePageProps();
    useEffect(() => {
        pageProps({
            breadcrumb: [
                { id: 1, title: 'Settings & Support', page: 'settings' },
            ]
        });
    }, [])

    return (
        <section className='settings_page'>
            <h1 className="title">
                Support:
            </h1>

            <div className='flex align_center'>
                <span className="item_title">My Telegram:</span>
                <a href='https://t.me/nekit_tt' target='_blank' className="item">
                    <Telegram />
                </a>
            </div>
        </section>
    )
}

export default Settings;
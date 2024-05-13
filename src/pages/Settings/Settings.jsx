import React, { useEffect } from 'react';
import './Settings.scss';
import { usePageProps } from 'hooks/useReducer';

const Settings = () => {
    const pageProps = usePageProps();
    useEffect(() => {
        pageProps({breadcrumb: [
            {id: 1, title: 'Settings', page: 'settings'},
            // {id: 2, title: 'History', page: 'history', param: {film_name: '123'}},
        ]});
    }, [])

    return (
        <div>
            Settings
        </div>
    )
}

export default Settings;
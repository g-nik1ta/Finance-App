import React, { useEffect } from 'react';
import './Dashbord.scss';
import { usePageProps } from 'hooks/useReducer';

const Dashbord = () => {
    const pageProps = usePageProps();
    useEffect(() => {
        pageProps({breadcrumb: [
            {id: 1, title: 'Dashboard', page: 'dashboard'},
            // {id: 2, title: 'History', page: 'history', param: {film_name: '123'}},
        ]});
    }, [])

    return (
        <div>
            Dashbord
        </div>
    )
}

export default Dashbord;
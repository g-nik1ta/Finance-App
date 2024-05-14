import React, { useEffect } from 'react';
import './DashboardCategories.scss';
import { usePageProps } from 'hooks/useReducer';

const DashboardCategories = () => {
    const pageProps = usePageProps();
    useEffect(() => {
        pageProps({
            breadcrumb: [
                { id: 1, title: 'Dashboard', page: 'dashboard' },
                // {id: 2, title: 'History', page: 'history', param: {film_name: '123'}},
            ]
        });
    }, [])

    return (
        <section className='dashboard-categories'>
            DashboardCategories
        </section>
    )
}

export default DashboardCategories;
import React, { useEffect, useState } from 'react';
import './Dashboard.scss';
import { usePageProps } from 'hooks/useReducer';
import CategoriesList from 'components/PageDashboard/CategoriesList/CategoriesList';
import CashCards from 'components/PageDashboard/CashCards/CashCards';
import History from 'components/PageDashboard/History/History';

const Dashboard = () => {
    const pageProps = usePageProps();
    useEffect(() => {
        pageProps({
            breadcrumb: [
                { id: 1, title: 'Dashboard', page: 'dashboard' },
            ]
        });
    }, []);

    const [sortCategory, setSortCategory] = useState(-1);

    return (
        <section className='dashboard'>
            <CategoriesList sortCategory={sortCategory} setSortCategory={setSortCategory} />
            <CashCards />
            <History sortCategory={sortCategory} setSortCategory={setSortCategory} />
        </section>
    )
}

export default Dashboard;
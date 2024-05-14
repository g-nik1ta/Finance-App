import React, { useEffect } from 'react';
import './Dashboard.scss';
import { usePageProps } from 'hooks/useReducer';
import HistoryExpenses from 'svg/HistoryExpenses';

const Dashboard = () => {
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
        <section className='dashboard'>
            <div className="categories">
                <span className="item current">All</span>
                <span className="item">Food</span>
                <span className="item">Transportaion</span>
                <span className="item">Helth</span>
                <span className="item">Housing</span>
            </div>
            <div className="cash_cards">
                <div className="card">
                    <span className="title">Current balance</span>
                    <span className="value">$4,012.40</span>
                </div>
                <div className="card">
                    <span className="title">General expenses</span>
                    <span className="value">$586.80</span>
                </div>
                <div className="card">
                    <span className="title">Total income</span>
                    <span className="value">$1,034.05</span>
                </div>
                <div className="card">
                    <span className="title">Profit / Loss</span>
                    <span className="value">$447.25</span>
                </div>
            </div>
            <div className="history">
                <div className="head">
                    <div className="title">
                        <HistoryExpenses />
                        <span>History</span>
                    </div>
                    <span className="total">$1620.85</span>
                </div>
                <div className="table">
                    <div className="table_head">
                        <span className="item title">Title</span>
                        <span className="item category">Category</span>
                        <span className="item date">Date</span>
                        <span className="item price">Price</span>
                        <span className="item wallet_value">Wallet value</span>
                    </div>
                    <div className="table_body">
                        <div className="row">
                            <span className="item title">Product</span>
                            <span className="item category">Food</span>
                            <span className="item date">15.05.2024</span>
                            <span className="item price">$1.44</span>
                            <span className="item wallet_value">$4,012.40</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Dashboard;
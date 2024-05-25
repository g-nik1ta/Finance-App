import React, { useEffect, useState } from 'react';
import './History.scss';
import HistoryExpenses from 'svg/HistoryExpenses';
import { useSelector } from 'react-redux';
import AddExpenses from './AddExpenses/AddExpenses';

const History = ({ sortCategory }) => {
    const { history } = useSelector(state => state.ProfileReducer.user);
    const { categories } = useSelector(state => state.ProfileReducer.user);

    const [sortHistory, setSortHistory] = useState(history || []);
    useEffect(() => {
        if (sortCategory === -1) {
            setSortHistory(history)
            return
        }
        setSortHistory(history.filter(item => item.category === sortCategory))
    }, [sortCategory])

    return (
        <div className="history">
            <AddExpenses />
            <div className="head">
                <div className="title">
                    <HistoryExpenses />
                    <span>History</span>
                </div>
                {
                    !!sortHistory.length &&
                    <span className="total">$1620.85</span>
                }
            </div>
            {
                !!sortHistory.length
                    ?
                    <div className="table">
                        <div className="table_head">
                            <span className="item title">Title</span>
                            <span className="item category">Category</span>
                            <span className="item date">Date</span>
                            <span className="item price">Price</span>
                            <span className="item wallet_value">Wallet value</span>
                        </div>
                        <div className="table_body">
                            {
                                sortHistory.map(item =>
                                    <div className="row" key={item.id}>
                                        <span className="item title">{item.title}</span>
                                        <span className="item category">
                                            {
                                                item.category
                                                    ?
                                                    categories.find(category => category.id === item.category)?.name
                                                    :
                                                    '-'
                                            }
                                        </span>
                                        <span className="item date">{(item.date).split('-').reverse().join('.')}</span>
                                        <span className="item price">{item.price}</span>
                                        <span className="item wallet_value">$4,012.40</span>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    :
                    <p className="history_empty">History is empty</p>
            }
        </div>
    )
}

export default History;
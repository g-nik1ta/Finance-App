import React, { useEffect, useState } from 'react';
import './History.scss';
import HistoryExpenses from 'svg/HistoryExpenses';
import { useSelector } from 'react-redux';
import AddExpenses from './AddExpenses/AddExpenses';
import AddIncoming from './AddIncoming/AddIncoming';

const History = ({ sortCategory }) => {
    const { history } = useSelector(state => state.ProfileReducer.user);
    const { categories } = useSelector(state => state.ProfileReducer.user);

    const [sortHistory, setSortHistory] = useState(history.reverse() || []);
    useEffect(() => {
        if (sortCategory === -1) {
            setSortHistory(history.reverse())
            return
        }
        setSortHistory(history.reverse().filter(item => item.category === sortCategory))
    }, [sortCategory, history])

    return (
        <div className="history">
            <div className='add_wrapper'>
                <AddExpenses />
                <AddIncoming />
            </div>
            <div className="head">
                <div className="title">
                    <HistoryExpenses />
                    <span>History</span>
                </div>
                {
                    !!sortHistory.length &&
                    (sortCategory === -1
                    ?
                    <span className="total">General expenses in all categories: ₴{
                        (sortHistory.filter(item => item.type === 'expenses').map(item => Number(item.price))).reduce((acc, cur) => acc + cur, 0)
                    }</span>
                    :
                    <span className="total">General expenses in "{categories?.find(category => category.id === sortCategory)?.name}": ₴{
                        (sortHistory.filter(item => item.type === 'expenses').map(item => Number(item.price))).reduce((acc, cur) => acc + cur, 0)
                    }</span>)
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
                                                    categories.find(category => category.id === item.category)?.name || '-'
                                                    :
                                                    item.type === 'incoming'
                                                        ?
                                                        'Incoming'
                                                        :
                                                        '-'
                                            }
                                        </span>
                                        <span className="item date">{(item.date).split('-').reverse().join('.')}</span>
                                        <span className="item price">₴{item.price}</span>
                                        <span className="item wallet_value">₴{item.current_balance}</span>
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
import React from 'react';
import './CashCards.scss';

const CashCards = () => {
    return (
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
    )
}

export default CashCards;
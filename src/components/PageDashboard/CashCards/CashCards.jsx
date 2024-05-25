import React, { useEffect, useState } from 'react';
import './CashCards.scss';
import { useDispatch, useSelector } from 'react-redux';
import CheckMark from 'svg/CheckMark';
import Loader from 'components/UI/Loader/Loader';
import Errors from 'components/UI/Form/Errors/Errors';
import PostService from 'API/PostService';
import { fetchErrorCode } from 'utils/authFormValidate';
import { useFetching } from 'hooks/useFetching';
import { setUserAction } from 'store/ProfileReducer';

const CashCards = () => {
    const dispatch = useDispatch();
    const { current_balance, id, history } = useSelector(state => state.ProfileReducer.user);
    const [currentBalance, setCurrentBalance] = useState(false);
    const [value, setValue] = useState(current_balance || 0);
    useEffect(() => {
        setValue(current_balance)
    }, [current_balance])

    const [errors, setErrors] = useState([]);
    const [fetchBalance, isBalanceLoading, balanceError] = useFetching(async (values) => {
        const { status, data } = await PostService.updateCurrentBalance({ id, balance: values });

        if (status === 'error') {
            setErrors([fetchErrorCode(data)]);
            return
        }
        dispatch(setUserAction(data))

        setCurrentBalance(false);
        setValue(data?.current_balance || 0)
    });

    useEffect(() => {
        if (!balanceError) return
        setErrors([fetchErrorCode(null)]);
    }, [balanceError])
    
    return (
        <div className="cash_cards">
            <div className="card" onClick={() => setCurrentBalance(true)}>
                <span className="title">Current balance</span>
                {
                    isBalanceLoading
                    ?
                    <div>
                        <Loader />
                    </div>
                    :
                    currentBalance
                        ?
                        <div className='card-input_wrapper'>
                            <input
                                type="number"
                                className="value"
                                value={value ? value : ''}
                                placeholder='Set balance'
                                onChange={e => setValue(e.target.value.trim())}
                            />
                            <CheckMark onClick={() => fetchBalance(value)} />
                        </div>
                        :
                        <span className="value">₴{value}</span>
                }
                <Errors errors={errors} />
            </div>
            <div className="card">
                <span className="title">General expenses</span>
                <span className="value">₴{
                    (history.filter(item => item.type === 'expenses').map(item => Number(item.price))).reduce((acc, cur) => acc + cur, 0)
                }</span>
            </div>
            <div className="card">
                <span className="title">Total income</span>
                <span className="value">₴{
                    (history.filter(item => item.type === 'incoming').map(item => Number(item.price))).reduce((acc, cur) => acc + cur, 0)
                }</span>
            </div>
            <div className="card">
                <span className="title">Profit / Loss</span>
                <span className="value">₴{
                    (history.filter(item => item.type === 'incoming').map(item => Number(item.price))).reduce((acc, cur) => acc + cur, 0)
                    -
                    (history.filter(item => item.type === 'expenses').map(item => Number(item.price))).reduce((acc, cur) => acc + cur, 0)
                }</span>
            </div>
        </div>
    )
}

export default CashCards;
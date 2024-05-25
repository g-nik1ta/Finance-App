import React, { useEffect, useState } from 'react';
import './AddIncoming.scss';
import Plus from 'svg/Plus';
import Input from 'components/UI/Form/Input/Input';
import Errors from 'components/UI/Form/Errors/Errors';
import MyButton from 'components/UI/MyButton/MyButton';
import { changeValue } from 'utils/form';
import Loader from 'components/UI/Loader/Loader';
import PostService from 'API/PostService';
import { useFetching } from 'hooks/useFetching';
import { useDispatch, useSelector } from 'react-redux';
import { fetchErrorCode } from 'utils/authFormValidate';
import { setUserAction } from 'store/ProfileReducer';

const AddIncoming = () => {
    const [openForm, setOpenForm] = useState(false);
    const dispatch = useDispatch();

    const user = useSelector(state => state.ProfileReducer.user);
    const [errors, setErrors] = useState([]);
    const getCurrentDate = () => {
        let today = new Date();

        let day = today.getDate();
        let month = today.getMonth() + 1;
        let year = today.getFullYear();

        if (day < 10) {
            day = '0' + day;
        }
        if (month < 10) {
            month = '0' + month;
        }

        let formattedDate = year + '-' + month + '-' + day;
        return formattedDate
    }
    const inputs = [
        {
            id: 1,
            name: 'title',
            type: "text",
            placeholder: 'Salary',
            required: true,
            label: 'Incoming title',
        },
        {
            id: 3,
            name: 'date',
            type: "date",
            placeholder: getCurrentDate(),
            required: true,
            label: 'Date',
        },
        {
            id: 4,
            name: 'price',
            type: "number",
            placeholder: '25000',
            required: true,
            label: 'Incoming amount',
        },
    ]

    const [fetchExpenses, isExpensesLoading, expensesError] = useFetching(async (values) => {
        const id = user.id;
        const current_balance = user.current_balance;
        const { status, data } = await PostService.addNewExpenses({ id, ...values, category: '', current_balance, type: 'incoming' });

        if (status === 'error') {
            setErrors([fetchErrorCode(data)]);
            return
        }
        dispatch(setUserAction(data))

        setOpenForm(false);
        setValues({
            title: '',
            price: '',
            date: getCurrentDate(),
        })
    });

    useEffect(() => {
        if (!expensesError) return
        setErrors([fetchErrorCode(null)]);
    }, [expensesError])



    const [values, setValues] = useState({
        title: '',
        price: '',
        date: getCurrentDate(),
    });

    const submitHandler = (e) => {
        e.preventDefault();

        fetchExpenses(values);
    }

    return (
        <div className='form_wrapper'>
            <div className={"add_incoming" + (openForm ? " open" : "")} onClick={() => setOpenForm(!openForm)}>
                <div className="svg_wrapper">
                    <Plus />
                </div>
                <span>Add incoming</span>
            </div>

            {
                isExpensesLoading
                    ?
                    <div className='full_width full_heigth flex align_center justify_center'>
                        <Loader />
                    </div>
                    :
                    <form onSubmit={submitHandler} className={openForm ? "open" : ""}>
                        {
                            inputs.map(item =>
                                <Input
                                    key={item.id}
                                    item={item}
                                    value={values[item.name]}
                                    onChange={(e) => changeValue(e, setValues)}
                                />
                            )
                        }
                        <Errors errors={errors} />
                        <MyButton>Add new incoming</MyButton>
                    </form>
            }
        </div>
    )
}

export default AddIncoming;
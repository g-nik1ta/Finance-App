import React, { useEffect, useState } from 'react';
import './AddExpenses.scss';
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
import Select from 'components/UI/Form/Select/Select';

const AddExpenses = () => {
    const [openForm, setOpenForm] = useState(false);
    const dispatch = useDispatch();

    const user = useSelector(state => state.ProfileReducer.user);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        if (!user?.categories?.length && user?.categories?.length !== 0) return

        if (user.categories.length <= 0) {
            setCategories([]);
            return
        }
        setCategories(user.categories.sort((a, b) => Number(a.order) - Number(b.order)));
    }, [user, user?.categories]);


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
            placeholder: 'Oranges',
            required: true,
            label: 'Expenses title',
        },
        {
            id: 2,
            name: 'category',
            type: "select",
            placeholder: 'Food',
            required: false,
            label: 'Category of expenses',
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
            placeholder: '1.78',
            required: true,
            label: 'Expenses price',
        },
    ]

    const [fetchExpenses, isExpensesLoading, expensesError] = useFetching(async (values) => {
        const id = user.id;
        const { status, data } = await PostService.addNewExpenses({ id, ...values });

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
            category: '',
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
        category: '',
    });

    const selectUpdate = (id) => {
        setValues(prevState => {
            return {
                ...prevState,
                category: id
            }
        });
    }

    const submitHandler = (e) => {
        e.preventDefault();

        fetchExpenses(values);
    }

    return (
        <div className='form_wrapper'>
            <div className={"add_expenses" + (openForm ? " open" : "")} onClick={() => setOpenForm(!openForm)}>
                <div className="svg_wrapper">
                    <Plus />
                </div>
                <span>Add expenses</span>
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
                                item.type === 'select'
                                    ?
                                    <Select
                                        key={item.id}
                                        label={item.label}
                                        title={
                                            categories.find(category => category.id === values[item.name])?.name ||
                                            item.placeholder
                                        }
                                        value={values[item.name]}
                                        options={categories.map(item => { return { id: item.id, title: item.name } })}
                                        optionHandler={selectUpdate}
                                    />
                                    :
                                    <Input
                                        key={item.id}
                                        item={item}
                                        value={values[item.name]}
                                        onChange={(e) => changeValue(e, setValues)}
                                    />
                            )
                        }
                        <Errors errors={errors} />
                        <MyButton>Add new expenses</MyButton>
                    </form>
            }
        </div>
    )
}

export default AddExpenses;
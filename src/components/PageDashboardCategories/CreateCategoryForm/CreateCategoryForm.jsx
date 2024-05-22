import PostService from 'API/PostService';
import Errors from 'components/UI/Form/Errors/Errors';
import Input from 'components/UI/Form/Input/Input';
import Loader from 'components/UI/Loader/Loader';
import MyButton from 'components/UI/MyButton/MyButton';
import { useFetching } from 'hooks/useFetching';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserAction } from 'store/ProfileReducer';
import { fetchErrorCode } from 'utils/authFormValidate';
import { changeValue } from 'utils/form';

const CreateCategoryForm = ({ openForm }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.ProfileReducer.user);
    const [errors, setErrors] = useState([]);
    const inputs = [
        {
            id: 1,
            name: 'category_name',
            type: "text",
            placeholder: 'Food',
            required: true,
            label: 'Category name',
        },
    ]

    const [fetchCategory, isCategoryLoading, categoryError] = useFetching(async (values) => {
        const id = user.id;
        const { status, data } = await PostService.addNewCategory({ id, ...values });

        if (status === 'error') {
            setErrors([fetchErrorCode(data)]);
            return
        }
        dispatch(setUserAction(data))

        setValues({
            category_name: '',
        })
    });

    useEffect(() => {
        if (!categoryError) return
        setErrors([fetchErrorCode(null)]);
    }, [categoryError])



    const [values, setValues] = useState({
        category_name: '',
    })

    const submitHandler = (e) => {
        e.preventDefault();

        fetchCategory(values);
    }

    if (isCategoryLoading) {
        return (
            <div className='full_width full_heigth flex align_center justify_center'>
                <Loader />
            </div>
        )
    }

    return (
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
            <MyButton>Create category</MyButton>
        </form>
    )
}

export default CreateCategoryForm;
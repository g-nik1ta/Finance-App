import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFetching } from 'hooks/useFetching';
import { fetchErrorCode } from 'utils/authFormValidate';
import Input from 'components/UI/Form/Input/Input';
import Errors from 'components/UI/Form/Errors/Errors';
import { changeValue } from 'utils/form';
import PostService from 'API/PostService';
import { setUserCategoriesAction } from 'store/ProfileReducer';
import Loader from 'components/UI/Loader/Loader';
import MyButton from 'components/UI/MyButton/MyButton';
import FormCircle from './FormCircle/FormCircle';

const EditCategoryForm = ({
    removeState, setRemoveState, categories, openCategory, setOpenCategory
}) => {
    const user = useSelector(state => state.ProfileReducer.user);
    const dispatch = useDispatch();
    const inputsCategory = [
        {
            id: 1,
            name: 'category_name_edit',
            type: "text",
            placeholder: 'Food',
            required: true,
            label: 'Category name',
        },
        {
            id: 2,
            name: 'category_order_edit',
            type: "number",
            placeholder: 'Position',
            required: true,
            label: 'Category position',
        },
    ]

    const [errorsEdit, setErrorsEdit] = useState([]);
    const [fetchCategoryEdit, isCategoryLoadingEdit, categoryErrorEdit] = useFetching(async (values) => {
        const uid = user.id;
        const { id } = categories.find(item => item.id === openCategory);
        const { status, data } = await PostService.editCategory({ uid, id, ...values });

        if (status === 'error') {
            setErrorsEdit([fetchErrorCode(data)]);
            return
        }
        dispatch(setUserCategoriesAction(data))

        setOpenCategory(null)
    });

    useEffect(() => {
        if (!categoryErrorEdit) return
        setErrorsEdit([fetchErrorCode(null)]);
    }, [categoryErrorEdit])

    const [valuesEdit, setValuesEdit] = useState({
        category_name_edit: '',
        category_order_edit: ''
    })

    const submitEditHandler = (e) => {
        e.preventDefault();

        fetchCategoryEdit(valuesEdit);
    }
    useEffect(() => {
        if (!openCategory) return;
        const { order, name } = categories.find(item => item.id === openCategory);
        setValuesEdit({
            category_name_edit: name,
            category_order_edit: order
        })
    }, [openCategory])


    const [removeCategoryLoading, setRemoveCategoryLoading] = useState(false);
    if (isCategoryLoadingEdit || removeCategoryLoading) {
        return (
            <div className='full_width full_heigth flex align_center justify_center'>
                <Loader />
            </div>
        )
    }

    return (
        <form onSubmit={submitEditHandler} className={'openCategory' + (!!openCategory ? " open" : "")}>
            <FormCircle
                removeState={removeState}
                setOpenCategory={setOpenCategory}
                setRemoveState={setRemoveState}
                setValuesEdit={setValuesEdit}
                categories={categories}
                openCategory={openCategory}
                setErrorsEdit={setErrorsEdit}
                setRemoveCategoryLoading={setRemoveCategoryLoading}
            />
            {
                inputsCategory.map(item =>
                    <Input
                        key={item.id}
                        item={item}
                        value={valuesEdit[item.name]}
                        onChange={(e) => changeValue(e, setValuesEdit)}
                    />
                )
            }
            <Errors errors={errorsEdit} /> 
            <MyButton>Update category</MyButton>
        </form>
    )
}

export default EditCategoryForm;
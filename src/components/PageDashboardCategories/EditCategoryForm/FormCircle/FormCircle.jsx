import React, { useEffect } from 'react';
import './FormCircle.scss';
import Remove from 'svg/Remove';
import Close from 'svg/Close';
import CheckMark from 'svg/CheckMark';
import ArrowDown from 'svg/ArrowDown';
import { setUserCategoriesAction } from 'store/ProfileReducer';
import { useDispatch, useSelector } from 'react-redux';
import PostService from 'API/PostService';
import { useFetching } from 'hooks/useFetching';
import { fetchErrorCode } from 'utils/authFormValidate';

const FormCircle = ({
    removeState,
    setOpenCategory,
    setRemoveState,
    setValuesEdit,
    categories,
    openCategory,
    setErrorsEdit,
    setRemoveCategoryLoading
}) => {
    const user = useSelector(state => state.ProfileReducer.user);
    const dispatch = useDispatch();

    const [fetchRemoveCategory, removeCategoryLoading, removeCategoryError] = useFetching(async () => {
        const uid = user.id;
        const { id } = categories.find(item => item.id === openCategory);

        const { status, data } = await PostService.removeCategory({ uid, id });

        if (status === 'error') {
            setErrorsEdit([fetchErrorCode(data)]);
            return
        }

        dispatch(setUserCategoriesAction(data));
        if (!data.length) {
            setValuesEdit({
                category_name_edit: '',
                category_order_edit: ''
            })
        }

        setOpenCategory(null);
        setRemoveState(false)
        setRemoveCategoryLoading(false)
    });

    useEffect(() => {
        setRemoveCategoryLoading(removeCategoryLoading)
    }, [removeCategoryLoading])

    useEffect(() => {
        if (!removeCategoryError) return
        console.log(removeCategoryError);
        setErrorsEdit([fetchErrorCode(null)]);
    }, [removeCategoryError])

    return (
        <div className='flex'>
            <div className="close_form_wrapper form_circle" onClick={() => setOpenCategory(null)}>
                <ArrowDown />
            </div>
            <div
                className={"remove_form_wrapepr form_circle" + (removeState ? " active" : "")}
                onClick={() => setRemoveState(!removeState)}
            >
                {
                    removeState
                        ?
                        <Close />
                        :
                        <Remove />
                }
            </div>
            <div
                className={"check_mark_form_wrapepr form_circle" + (removeState ? " active" : "")}
                onClick={fetchRemoveCategory}
            >
                <CheckMark />
            </div>
        </div>
    )
}

export default FormCircle;
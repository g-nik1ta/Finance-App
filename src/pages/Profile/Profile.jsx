import React, { useEffect, useState } from 'react';
import './Profile.scss';
import { usePageProps } from 'hooks/useReducer';
import { useDispatch, useSelector } from 'react-redux';
import Errors from 'components/UI/Form/Errors/Errors';
import Input from 'components/UI/Form/Input/Input';
import { useFetching } from 'hooks/useFetching';
import { fetchErrorCode } from 'utils/authFormValidate';
import Loader from 'components/UI/Loader/Loader';
import { changeValue } from 'utils/form';
import AccountService from 'API/AccountService';
import { setUserAction } from 'store/ProfileReducer';
import MyButton from 'components/UI/MyButton/MyButton';

const Profile = () => {
    const pageProps = usePageProps();
    useEffect(() => {
        pageProps({
            breadcrumb: [
                { id: 1, title: 'Profile', page: 'profile' },
            ]
        });
    }, [])

    const user = useSelector(state => state.ProfileReducer.user);
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const inputs = [
        {
            id: 1,
            name: 'name',
            type: "text",
            placeholder: 'Name',
            required: true,
            label: 'Name',
        },
    ]

    const [fetchProfile, isProfileLoading, profileError] = useFetching(async (values) => {
        const id = user.id;
        const { status, data } = await AccountService.updateUser({ ...values, id });

        if (status === 'error') {
            setErrors([fetchErrorCode(data)]);
            return
        }
        dispatch(setUserAction(data))

        setValues({
            name: data?.name || '',
        })
    });

    useEffect(() => {
        if (!profileError) return
        setErrors([fetchErrorCode(null)]);
    }, [profileError])



    const [values, setValues] = useState({
        name: user?.name || '',
    })

    const submitHandler = (e) => {
        e.preventDefault();

        fetchProfile(values);
    }

    if (isProfileLoading) {
        return (
            <div className='full_width full_heigth flex align_center justify_center'>
                <Loader />
            </div>
        )
    }

    return (
        <section className='profile_page'>
            <h1 className='title'>Hello, <b>{user.name}</b></h1>
            <h2 className="subtitle">Profile settigs</h2>
            <form onSubmit={submitHandler}>
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
                <MyButton>Change data</MyButton>
            </form>
        </section>
    )
}

export default Profile;
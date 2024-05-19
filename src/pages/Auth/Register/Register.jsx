import React, { useEffect, useState } from 'react';
import "pages/Auth/Auth.scss";
import { useDispatch } from 'react-redux';
import { setUserAction } from 'store/ProfileReducer';
import { fetchErrorCode } from 'utils/authFormValidate';
import PostService from 'API/PostService';
import { useFetching } from 'hooks/useFetching';
import { Link } from 'react-router-dom';
import { getRoute } from 'utils/routes';
import Loader from 'components/UI/Loader/Loader';
import Input from 'components/UI/Form/Input/Input';
import Remember from 'components/UI/Form/Remember/Remember';
import Errors from 'components/UI/Form/Errors/Errors';
import AuthSocials from 'components/AuthSocials/AuthSocials'; 
import { changeValue } from 'utils/form';

const Register = () => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const inputs = [
        {
            id: 1,
            name: 'name',
            type: "text",
            placeholder: 'Bill',
            required: true,
            label: 'Name',
        },
        {
            id: 2,
            name: 'email',
            type: "text",
            placeholder: 'email2000@gmail.com',
            required: true,
            label: 'E-mail',
        },
        {
            id: 3,
            name: 'password',
            type: "password",
            placeholder: '6+ character',
            required: true,
            label: 'Password',
        },
        {
            id: 4,
            name: 'password_confirmation',
            type: "password",
            placeholder: '6+ character',
            required: true,
            label: 'Repeat password',
        },
    ]


    const [fetchAuth, isAuthLoading, authError] = useFetching(async (values) => {
        const { status, data } = await PostService.registerUser(values);

        if (status === 'error') {
            setErrors([fetchErrorCode(data)]);
            return
        }
        dispatch(setUserAction(data))

        setValues({
            email: '',
            password: '',
            password_confirmation: '',
            remember: false,
        })
    });

    useEffect(() => {
        if (!authError) return
        setErrors([fetchErrorCode(null)]);
    }, [authError])


    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        remember: false,
    })

    const submitHandler = (e) => {
        e.preventDefault();
        const arr = [];
        if (values.password.length < 6) {
            arr.push('Password must contain at least 6 characters')
        }
        if (values.password !== values.password_confirmation) {
            arr.push('Password confirmation does not match')
        }
        setErrors(arr);
        if (arr.length) return

        fetchAuth(values);
    }


    if (isAuthLoading) {
        return (
            <div className='full_width full_heigth flex align_center justify_center'>
                <Loader />
            </div>
        )
    }

    return (
        <main className="auth_page">
            <div className="auth_wrapper">
                <h1 className="title">
                    Welcome to Finance App
                </h1>
                <p className="subtitle">Create your account</p>
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
                    <div className='remember-forgot'>
                        <Remember
                            value={values.remember}
                            changeValues={(e) => changeValue(e, setValues)}
                        />
                    </div>
                    {
                        !!errors.length &&
                        <Errors errors={errors} />
                    }
                    <button type='submit' className='submit_form'>
                        Create an account
                    </button>
                </form>
                <AuthSocials setErrors={setErrors} />
                <span className='register'> Already have an account? <Link to={getRoute('login')} className='sign-up'>Login</Link> </span>
            </div>
        </main>
    )
}

export default Register;
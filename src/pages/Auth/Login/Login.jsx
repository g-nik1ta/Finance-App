import React, { useEffect, useState } from 'react';
import "pages/Auth/Auth.scss";
import { setUserAction } from 'store/ProfileReducer';
import { useDispatch } from 'react-redux';
import { fetchErrorCode } from 'utils/authFormValidate';
import { useFetching } from 'hooks/useFetching';
import { getRoute } from 'utils/routes';
import { Link } from 'react-router-dom';
import Loader from 'components/UI/Loader/Loader';
import AccountService from 'API/AccountService';
import Input from 'components/UI/Form/Input/Input';
import Remember from 'components/UI/Form/Remember/Remember';
import Errors from 'components/UI/Form/Errors/Errors';
import AuthSocials from 'components/AuthSocials/AuthSocials';
import { changeValue } from 'utils/form';
import MyButton from 'components/UI/MyButton/MyButton';

const Login = () => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const inputs = [
        {
            id: 1,
            name: 'email',
            type: "text",
            placeholder: 'email2000@gmail.com',
            required: true,
            label: 'E-mail',
        },
        {
            id: 2,
            name: 'password',
            type: "password",
            placeholder: '6+ character',
            required: true,
            label: 'Password',
        },
    ]

    const [fetchLogin, isLoginLoading, loginError] = useFetching(async (values) => {
        const { status, data } = await AccountService.signIn(values);

        if (status === 'error') {
            setErrors([fetchErrorCode(data)]);
            return
        }
        dispatch(setUserAction(data))

        setValues({
            email: '',
            password: '',
            remember: false,
        })
    });

    useEffect(() => {
        if (!loginError) return
        setErrors([fetchErrorCode(null)]);
    }, [loginError])



    const [values, setValues] = useState({
        email: '',
        password: '',
        remember: false,
    })

    const submitHandler = (e) => {
        e.preventDefault();
        const arr = [];
        if (!values.password.length) {
            arr.push('Please enter your password')
        }
        setErrors(arr);
        if (arr.length) return

        fetchLogin(values);
    }

    if (isLoginLoading) {
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
                <p className="subtitle">Login to your account</p>
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
                        <span className='forgot'> Forgot password </span>
                    </div>
                    <Errors errors={errors} />
                    <MyButton>Login</MyButton>
                </form>
                <AuthSocials setErrors={setErrors} login={true} />
                <span className='register'> Don't have an account? <Link to={getRoute('register')} className="sign-up">Sign Up</Link> </span>
            </div>
        </main>
    )
}

export default Login;
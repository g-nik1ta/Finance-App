import React, { useState } from 'react';
import './Authorization.scss';
import ViewPasswordOff from 'svg/ViewPasswordOff';
import ViewPasswordOn from 'svg/ViewPasswordOn';
import Google from 'svg/Google';
import Facebook from 'svg/Facebook';

const Authorization = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        password_confirmation: '',
        remember: false,
    })
    const [viewPassword, setViewPassword] = useState({
        password: false,
        password_confirmation: false,
    })

    const changeValues = (e) => {
        let { id, type, value, checked } = e.target;

        if (type === 'checkbox') {
            value = checked;
        } else value = value.trim('')

        setValues(prevValues => {
            return {
                ...prevValues,
                [id]: value
            }
        })
    }

    const [errors, setErrors] = useState([]);

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
        console.log('values: ', values);
        setValues({
            email: '',
            password: '',
            password_confirmation: '',
            remember: false,
        })
        setViewPassword({
            password: false,
            password_confirmation: false,
        })
    }

    return (
        <main className="form_content">
            <div className="auth_wrapper">
                <h1 className="title">
                    Welcome to Finance App
                </h1>
                <p className="subtitle">Create your account</p>
                <form onSubmit={submitHandler}>
                    <div className="input_wrapper">
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            required
                            id="email"
                            placeholder='email2000@gmail.com'
                            value={values.email}
                            onChange={changeValues}
                        />
                    </div>
                    <div className="input_wrapper password">
                        <label htmlFor="password">Password</label>
                        <input
                            type={viewPassword.password ? 'text' : "password"}
                            required
                            id="password"
                            placeholder='6+ character'
                            value={values.password}
                            onChange={changeValues}
                        />
                        <div
                            className="view_password"
                            onClick={() => setViewPassword(prevState => {
                                return {
                                    ...prevState,
                                    password: !prevState.password
                                }
                            })}
                        >
                            {
                                viewPassword.password
                                    ?
                                    <ViewPasswordOn />
                                    :
                                    <ViewPasswordOff />
                            }
                        </div>
                    </div>
                    <div className="input_wrapper password">
                        <label htmlFor="password_confirmation">Repeat password</label>
                        <input
                            type={viewPassword.password_confirmation ? 'text' : "password"}
                            required
                            id="password_confirmation"
                            placeholder='6+ character'
                            value={values.password_confirmation}
                            onChange={changeValues}
                        />
                        <div
                            className="view_password"
                            onClick={() => setViewPassword(prevState => {
                                return {
                                    ...prevState,
                                    password_confirmation: !prevState.password_confirmation
                                }
                            })}
                        >
                            {
                                viewPassword.password_confirmation
                                    ?
                                    <ViewPasswordOn />
                                    :
                                    <ViewPasswordOff />
                            }
                        </div>
                    </div>
                    <div className='remember-forgot'>
                        <label className='flex align_center checkbox_wrapper' htmlFor='remember'>
                            <input
                                type="checkbox"
                                name='radio'
                                id='remember'
                                onChange={changeValues}
                                checked={values.remember}
                            />
                            <span className='input_title'>Remember for 30 days</span>
                        </label>
                        <span className='forgot'> Forgot password </span>
                    </div>
                    {
                        !!errors.length &&
                        <div className="error_wrapper">
                            <ul className='undecorated_ul'>
                                {errors.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    }
                    <button type='submit' className='submit_form'>
                        Create an account
                    </button>
                </form>
                <div className="socials_login">
                    <span>Sign Up with</span>
                    <div className="item">
                        <Google />
                    </div>
                    <div className="item">
                        <Facebook />
                    </div>
                </div>
                <span className='register'> Don't have an account? <span>Sign Up</span> </span>
            </div>
        </main>
    )
}

export default Authorization;
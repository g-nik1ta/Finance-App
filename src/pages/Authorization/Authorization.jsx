import React, { useState } from 'react';
import './Authorization.scss';
import ViewPasswordOff from 'svg/ViewPasswordOff';
import ViewPasswordOn from 'svg/ViewPasswordOn';
import Google from 'svg/Google';
import Facebook from 'svg/Facebook';
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { app } from 'firebase.js';
import { setUserAction } from 'store/ProfileReducer';
import { useDispatch } from 'react-redux';
import { fetchErrorCode } from 'utils/signInErrors';
import { useFetching } from 'hooks/useFetching';
import { Link } from 'react-router-dom';
import { getRoute } from 'utils/routes';
import PostService from 'API/PostService';
import Loader from 'components/UI/Loader/Loader';

const Authorization = () => {
    const dispatch = useDispatch();
    const auth = getAuth(app);
    const [errors, setErrors] = useState([]);

    const googleLoginUser = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const response = await signInWithPopup(auth, provider);
            const { uid, email, displayName: name } = response.user;
            await PostService.sendRegisterForm({
                uid, email, name
            });
            dispatch(setUserAction(response.user))
        } catch (error) {
            setErrors(['Something went wrong, try again later...'])
        }
    }
    const facebookLoginUser = async () => {
        const provider = new FacebookAuthProvider();
        try {
            const response = await signInWithPopup(auth, provider);
            const { uid, email, displayName: name } = response.user;
            await PostService.sendRegisterForm({
                uid, email, name
            });
            dispatch(setUserAction(response.user))
        } catch (error) {
            console.log(error);
            setErrors(['Something went wrong, try again later...'])
        }
    }

    const [fetchLogin, isLoginLoading, loginError] = useFetching(async (values) => {
        const { email, password, remember, name } = values;

        await createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                const { uid, email } = user;

                if (remember) {
                    const refreshToken = userCredential.user.uid;
                    const expiresAt = Date.now() + 30 * 24 * 60 * 60 * 1000;

                    localStorage.setItem('financeAppRefreshToken', JSON.stringify({
                        token: refreshToken,
                        expiresAt: expiresAt
                    }));
                }

                dispatch(setUserAction(user))
                await PostService.sendRegisterForm({
                    uid, email, remember, name
                });

                setValues({
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: '',
                    remember: false,
                })
                setViewPassword({
                    password: false,
                    password_confirmation: false,
                })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrors([fetchErrorCode(errorCode)]);
                // console.log(errorMessage);
            })
    });

    const [values, setValues] = useState({
        name: '',
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
        <main className="form_content">
            <div className="auth_wrapper">
                <h1 className="title">
                    Welcome to Finance App
                </h1>
                <p className="subtitle">Create your account</p>
                <form onSubmit={submitHandler}>
                    <div className="input_wrapper">
                        <label htmlFor="email">Name</label>
                        <input
                            type="text"
                            required
                            id="name"
                            placeholder='Bill'
                            value={values.name}
                            onChange={changeValues}
                        />
                    </div>
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
                            <span className='input_title'>Remember me</span>
                        </label>
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
                    <div className="item" onClick={googleLoginUser}>
                        <Google />
                    </div>
                    <div className="item" onClick={facebookLoginUser}>
                        <Facebook />
                    </div>
                </div>
                <span className='register'> Already have an account? <Link to={getRoute('login')} className='sign-up'>Login</Link> </span>
            </div>
        </main>
    )
}

export default Authorization;
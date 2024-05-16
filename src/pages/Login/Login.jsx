import React, { useState } from 'react';
import "pages/Authorization/Authorization.scss";
import ViewPasswordOff from 'svg/ViewPasswordOff';
import ViewPasswordOn from 'svg/ViewPasswordOn';
import Google from 'svg/Google';
import Facebook from 'svg/Facebook';
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { app } from 'firebase.js';
import { setUserAction } from 'store/ProfileReducer';
import { useDispatch } from 'react-redux';
import { fetchErrorCode } from 'utils/signInErrors';
import { useFetching } from 'hooks/useFetching';
import { getRoute } from 'utils/routes';
import { Link } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const auth = getAuth(app);
    const [errors, setErrors] = useState([]);

    const googleLoginUser = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const response = await signInWithPopup(auth, provider);
            dispatch(setUserAction(response.user))
        } catch (error) {
            setErrors(['Something went wrong, try again later...'])
        }
    }
    const facebookLoginUser = async () => {
        const provider = new FacebookAuthProvider();
        try {
            const response = await signInWithPopup(auth, provider);
            console.log(response);
            dispatch(setUserAction(response.user))
        } catch (error) {
            console.log(error);
            setErrors(['Something went wrong, try again later...'])
        }
    }

    const [fetchLogin, isLoginLoading, loginError] = useFetching(async (values) => {
        const { email, password, remember } = values;
        await signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                const { uid, email } = user;
                if (remember) {
                    const idToken = await user.getIdToken();
                    localStorage.setItem('financeAppUserToken', idToken);
                }

                dispatch(setUserAction(user))

                console.log({
                    uid, email, remember
                });

                setValues({
                    email: '',
                    password: '',
                    remember: false,
                })
                setViewPassword({
                    password: false,
                })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrors([fetchErrorCode(errorCode)]);
                console.log(errorMessage);
            })
    });

    const [values, setValues] = useState({
        email: '',
        password: '',
        remember: false,
    })
    const [viewPassword, setViewPassword] = useState({
        password: false,
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
        if (!values.password.length) {
            arr.push('Please enter your password')
        }
        setErrors(arr);
        if (arr.length) return

        fetchLogin(values);
    }

    return (
        <main className="form_content">
            <div className="auth_wrapper">
                <h1 className="title">
                    Welcome to Finance App
                </h1>
                <p className="subtitle">Login to your account</p>
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
                            placeholder='Your password'
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
                        Login
                    </button>
                </form>
                <div className="socials_login">
                    <span>Sign In with</span>
                    <div className="item" onClick={googleLoginUser}>
                        <Google />
                    </div>
                    <div className="item" onClick={facebookLoginUser}>
                        <Facebook />
                    </div>
                </div>
                <span className='register'> Don't have an account? <Link to={getRoute('authorization')} className="sign-up">Sign Up</Link> </span>
            </div>
        </main>
    )
}

export default Login;
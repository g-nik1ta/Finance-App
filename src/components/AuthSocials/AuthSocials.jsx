import React from 'react';
import './AuthSocials.scss';
import Google from 'svg/Google';
import Facebook from 'svg/Facebook';
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from 'firebase.js';
import { useDispatch } from 'react-redux';
import { setUserAction } from 'store/ProfileReducer';
import { fetchErrorCode } from 'utils/authFormValidate';
import PostService from 'API/PostService';

const AuthSocials = ({ setErrors, login = false }) => {
    const dispatch = useDispatch();
    const auth = getAuth(app);

    const googleLoginUser = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const response = await signInWithPopup(auth, provider);
            if (!login) {
                const { uid, email, displayName: name } = response.user;
                await PostService.sendRegisterForm({
                    uid, email, name
                });
            }
            dispatch(setUserAction(response.user))
        } catch (error) {
            setErrors([fetchErrorCode(null)])
        }
    }
    const facebookLoginUser = async () => {
        const provider = new FacebookAuthProvider();
        try {
            const response = await signInWithPopup(auth, provider);
            if (!login) {
                const { uid, email, displayName: name } = response.user;
                await PostService.sendRegisterForm({
                    uid, email, name
                });
            }
            dispatch(setUserAction(response.user))
        } catch (error) {
            setErrors([fetchErrorCode(null)])
        }
    }

    return (
        <div className="socials_login">
            {
                login
                    ?
                    <span>Sign In with</span>
                    :
                    <span>Sign Up with</span>
            }
            <div className="item" onClick={googleLoginUser}>
                <Google />
            </div>
            <div className="item" onClick={facebookLoginUser}>
                <Facebook />
            </div>
        </div>
    )
}

export default AuthSocials;
import React from 'react';
import './AuthSocials.scss';
import Google from 'svg/Google';
import Facebook from 'svg/Facebook';
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from 'firebase.js';
import { useDispatch } from 'react-redux';
import { setUserAction } from 'store/ProfileReducer';
import { fetchErrorCode } from 'utils/authFormValidate';
import AccountService from 'API/AccountService';

const AuthSocials = ({ setErrors, login = false }) => {
    const dispatch = useDispatch();
    const auth = getAuth(app);

    const googleLoginUser = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const response = await signInWithPopup(auth, provider);
            const { data } = await AccountService.getUserDataFromEmail(response?.user?.email);
            
            AccountService.setUserRefreshToken(response.user.uid, 1)
            if (!login || !data) {
                const { uid, email, displayName: name } = response.user;
                await AccountService.updateUserTable({
                    uid, email, name, password: null
                });
                const { data } = await AccountService.getUserDataFromEmail(response?.user?.email);
                dispatch(setUserAction(data))
                return
            }
            dispatch(setUserAction(data));
        } catch (error) {
            setErrors([fetchErrorCode(null)])
        }
    }
    const facebookLoginUser = async () => {
        const provider = new FacebookAuthProvider();
        try {
            const response = await signInWithPopup(auth, provider);
            const { data } = await AccountService.getUserDataFromEmail(response?.user?.email);

            AccountService.setUserRefreshToken(response.user.uid, 1)
            if (!login || !data) {
                const { uid, email, displayName: name } = response.user;
                await AccountService.updateUserTable({
                    uid, email, name, password: null
                });
                const { data } = await AccountService.getUserDataFromEmail(response?.user?.email);
                dispatch(setUserAction(data))
                return
            }
            dispatch(setUserAction(data))
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
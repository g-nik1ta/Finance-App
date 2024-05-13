import React, { useEffect } from 'react';
import './Profile.scss';
import { usePageProps } from 'hooks/useReducer';

const Profile = () => {
    const pageProps = usePageProps();
    useEffect(() => {
        pageProps({breadcrumb: [
            {id: 1, title: 'Profile', page: 'profile'},
            // {id: 2, title: 'History', page: 'history', param: {film_name: '123'}},
        ]});
    }, [])

    return (
        <div>
            Profile
        </div>
    )
}

export default Profile;
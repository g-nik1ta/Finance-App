import React from "react";
import { Navigate } from "react-router-dom";
import Profile from "pages/Profile/Profile";
import Dashbord from "pages/Dashbord/Dashbord";
import Settings from "pages/Settings/Settings";

export const routes = [
    {path: '*', element: <Navigate to="/profile" />, exact: false, name: 'redirect'},
    {path: '/profile', element: <Profile/>, exact: false, name: 'profile'},
    {path: '/dashbord', element: <Dashbord/>, exact: false, name: 'dashbord'},
    {path: '/settings', element: <Settings/>, exact: false, name: 'settings'},
]
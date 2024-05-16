import React from "react";
import { Navigate } from "react-router-dom";
import Profile from "pages/Profile/Profile";
import Dashboard from "pages/Dashboard/Dashboard";
import Settings from "pages/Settings/Settings";
import DashboardCategories from "pages/DashboardCategories/DashboardCategories";
import Authorization from "pages/Authorization/Authorization";
import Login from "pages/Login/Login";

export const routes = [
    { path: '*', element: <Navigate to="/profile" />, exact: false, name: 'redirect' },
    { path: '/profile', element: <Profile />, exact: false, name: 'profile' },
    { path: '/dashboard', element: <Dashboard />, exact: true, name: 'dashboard' },
    { path: '/dashboard/categories', element: <DashboardCategories />, exact: true, name: 'dashboard-categories' },
    { path: '/settings', element: <Settings />, exact: false, name: 'settings' },
]

export const publicRoutes = [
    { path: '*', element: <Navigate to="/authorization" />, exact: false, name: 'redirect' },
    { path: '/authorization', element: <Authorization />, exact: false, name: 'authorization' },
    { path: '/login', element: <Login />, exact: false, name: 'login' },
]
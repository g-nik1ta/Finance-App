import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { publicRoutes, routes } from 'route';

const AppRouter = ({ auth = false }) => {
    const location = useLocation();
    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [location])


    return (
        <Routes>
            {
                auth
                    ?
                    publicRoutes.map(route =>
                        <Route
                            exact={route.exact}
                            path={route.path}
                            element={route.element}
                            key={route.path}
                        />
                    )
                    :
                    routes.map(route =>
                        <Route
                            exact={route.exact}
                            path={route.path}
                            element={route.element}
                            key={route.path}
                        />
                    )
            }
        </Routes>
    )
}

export default AppRouter;
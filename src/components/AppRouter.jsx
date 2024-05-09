import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { routes } from 'route';

const AppRouter = () => {
    const location = useLocation();
    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [location])

    return (
        <Routes>
            {routes.map(route =>
                <Route
                    exact={route.exact}
                    path={route.path}
                    element={route.element}
                    key={route.path}
                />
            )}
        </Routes>
    )
}

export default AppRouter;
import React from 'react';
import './Header.scss';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { getRoute } from 'utils/routes';

const Header = () => {
    const breadcrumb = useSelector(state => state.PageReducer.breadcrumb);
    const location = useLocation();

    return (
        <header>
            <div className="breadcrumb">
                {
                    breadcrumb.map((item, index) =>
                        index === breadcrumb.length - 1
                            ?
                            <span key={item.id} className="title current">{item.title}</span>
                            :
                            item.page &&
                            <Link
                                to={
                                    item.param
                                        ?
                                        getRoute(item.page, item.param)
                                        :
                                        getRoute(item.page)
                                }
                                key={item.id}
                                className="title"
                            >
                                {item.title} /&nbsp;
                            </Link>
                    )
                }
            </div>
            {
                getRoute('dashboard') === '/' + location.pathname.split('/')[1] &&
                <div className="dashboard_tab">
                    <Link to={getRoute('dashboard')} className={"item" + (getRoute('dashboard') === location.pathname ? ' active' : "")}>
                        History
                    </Link>
                    <Link to={getRoute('dashboard-categories')} className={"item" + (getRoute('dashboard-categories') === location.pathname ? ' active' : "")}>
                        Categories
                    </Link>
                </div>
            }
        </header>
    )
}

export default Header;
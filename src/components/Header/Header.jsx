import React from 'react';
import './Header.scss';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRoute } from 'utils/routes';

const Header = () => {
    const breadcrumb = useSelector(state => state.PageReducer.breadcrumb);

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
                {/* <span className='current'>Dashboard</span> */}
            </div>
        </header>
    )
}

export default Header;
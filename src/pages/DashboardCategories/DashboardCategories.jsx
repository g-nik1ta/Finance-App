import React, { useEffect, useState } from 'react';
import './DashboardCategories.scss';
import { usePageProps } from 'hooks/useReducer';
import ArrowDown from 'svg/ArrowDown';
import CreateCategoryForm from 'components/PageDashboardCategories/CreateCategoryForm/CreateCategoryForm';
import Categories from 'components/PageDashboardCategories/Categories/Categories';
import EditCategoryForm from 'components/PageDashboardCategories/EditCategoryForm/EditCategoryForm';
import { useSelector } from 'react-redux';

const DashboardCategories = () => {
    const pageProps = usePageProps();
    useEffect(() => {
        pageProps({
            breadcrumb: [
                { id: 1, title: 'Dashboard', page: 'dashboard' },
            ]
        });
    }, [])


    const user = useSelector(state => state.ProfileReducer.user);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (!user?.categories?.length && user?.categories?.length !== 0) return

        if (user.categories.length <= 0) {
            setCategories([]);
            return
        }
        setCategories(user.categories.sort((a, b) => Number(a.order) - Number(b.order)));
    }, [user, user?.categories])

    const [openForm, setOpenForm] = useState(false);
    const [openCategory, setOpenCategory] = useState(null);
    const [removeState, setRemoveState] = useState(false);

    return (
        <section className='dashboard_categories_page'>
            <h1 className="title">
                Create new category
                <div className={"open-form" + (openForm ? " open" : "")} onClick={() => setOpenForm(!openForm)}>
                    <ArrowDown />
                </div>
            </h1>
            <CreateCategoryForm openForm={openForm} />

            <h1 className="title">
                Categories list
            </h1>
            <Categories
                categories={categories}
                setRemoveState={setRemoveState}
                setOpenCategory={setOpenCategory}
                openCategory={openCategory}
            />

            <EditCategoryForm
                removeState={removeState}
                setRemoveState={setRemoveState}
                categories={categories}
                openCategory={openCategory}
                setOpenCategory={setOpenCategory}
            />
        </section>
    )
}

export default DashboardCategories;
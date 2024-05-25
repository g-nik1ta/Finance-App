import React, { useEffect, useState } from 'react';
import './CategoriesList.scss';
import { useSelector } from 'react-redux';

const CategoriesList = ({ sortCategory, setSortCategory }) => {
    const user = useSelector(state => state.ProfileReducer.user);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (!user?.categories?.length && user?.categories?.length !== 0) return

        if (user.categories.length <= 0) {
            setCategories([]);
            return
        }
        setCategories(user.categories.sort((a, b) => Number(a.order) - Number(b.order)));
    }, [user, user?.categories]);

    if (!categories.length) return;

    return (
        <div className="dashboard-categories">
            <span
                className={"item" + (sortCategory === -1 ? ' active' : "")}
                onClick={() => setSortCategory(-1)}
            >
                All
            </span>
            {
                categories.map(category =>
                    <span
                        key={category.id}
                        onClick={() => setSortCategory(category.id)}
                        className={"item" + (sortCategory === category.id ? ' active' : "")}
                    >
                        {category.name}
                    </span>
                )
            }
        </div>
    )
}

export default CategoriesList;
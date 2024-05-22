import React from 'react';
import './Categories.scss';
import Edit from 'svg/Edit';

const Categories = ({ categories, setRemoveState, setOpenCategory, openCategory }) => {
    return (
        <>
            {
                !!categories.length
                    ?
                    <ul className='undecorated_ul categories'>
                        {
                            categories.map(item =>
                                <li
                                    onClick={() => {
                                        setRemoveState(false)
                                        setOpenCategory(openCategory === item.id ? null : item.id)
                                    }}
                                    className={"item" + (openCategory === item.id ? ' active' : "")}
                                    key={item.id}
                                >
                                    <span>{item.name}</span>
                                    <Edit />
                                </li>
                            )
                        }
                    </ul>
                    :
                    <p className="subtitle">Category list is empty</p>
            }
        </>
    )
}

export default Categories;
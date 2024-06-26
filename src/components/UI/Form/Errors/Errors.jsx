import React from 'react';
import './Errors.scss';

const Errors = ({ errors }) => {
    if (!errors.length) return

    return (
        <div className="error_wrapper">
            <ul className='undecorated_ul'>
                {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                ))}
            </ul>
        </div>
    )
}

export default Errors;
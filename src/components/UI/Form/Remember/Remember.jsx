import React from 'react';
import './Remember.scss';

const Remember = ({value, changeValues}) => {
    return (
        <label className='flex align_center checkbox_wrapper' htmlFor='remember'>
            <input
                type="checkbox"
                name='radio'
                id='remember'
                onChange={changeValues}
                checked={value}
            />
            <span className='input_title'>Remember me</span>
        </label>
    )
}

export default Remember;
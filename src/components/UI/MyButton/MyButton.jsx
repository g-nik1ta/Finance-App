import React from 'react';
import './MyButton.scss';

const MyButton = ({ children, ...props }) => {
    return (
        <button type='submit' className='my_button' {...props}>
            {children}
        </button>
    )
}

export default MyButton;
import React, { useState } from 'react';
import './Input.scss';
import ViewPasswordOn from 'svg/ViewPasswordOn';
import ViewPasswordOff from 'svg/ViewPasswordOff';

const Input = ({ item, value, onChange }) => {
    const { type, required, name, placeholder, label } = item;

    const [viewPassword, setViewPassword] = useState(false)

    return (
        <div className={"input_wrapper" + (type === 'password' ? ' password' : "")}>
            <label htmlFor={name}>{label}</label>
            <input
                type={
                    type === 'password'
                        ?
                        viewPassword ? 'text' : "password"
                        :
                        'text'
                }
                required={required}
                id={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            {
                type === 'password' &&
                <div
                    className="view_password"
                    onClick={() => setViewPassword(!viewPassword)}
                >
                    {
                        viewPassword
                            ?
                            <ViewPasswordOn />
                            :
                            <ViewPasswordOff />
                    }
                </div>
            }
        </div>
    )
}

export default Input;
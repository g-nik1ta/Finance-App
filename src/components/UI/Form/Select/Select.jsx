import React, { useEffect, useRef, useState } from 'react';
import './Select.scss';
import ArrowDown from 'svg/ArrowDown';

const Select = ({ label, title, options, optionHandler, ...props }) => {
    const ref = useRef();
    const clickFuncRef = useRef();
    const [mySelectWindow, setMySelectWindow] = useState(false);

    const windowHandler = () => {
        const bool = !mySelectWindow;
        setMySelectWindow(bool);

        if (bool) {
            document.addEventListener('mousedown', clickFuncRef.current);
        } else {
            document.removeEventListener('mousedown', clickFuncRef.current);
        }
    }

    const changeOption = (e, option) => {
        Array.from(e.currentTarget.parentElement.children).forEach(item => {
            item.classList.remove('active');
        })
        e.currentTarget.classList.add('active');
        optionHandler(option.id);
        windowHandler()
    }

    useEffect(() => {
        clickFuncRef.current = (e) => {
            if (e.target.closest('.select_block') !== ref.current) {
                setMySelectWindow(false);
                document.removeEventListener('mousedown', clickFuncRef.current);
            }
        };
    }, []);

    return (
        <div ref={ref} className={'select_block' + (mySelectWindow ? " open" : '')}>
            <span className="label">{label}</span>
            <div
                className='current_option'
                onClick={windowHandler}
            >
                <span className={'title' + (!props.value ? " placeholder" : "")}>{title}</span>
                <ArrowDown className="arrow_down_svg" />
            </div>
            <div className="option_window" style={{maxHeight: mySelectWindow ? (options.length * 40 + 'px') : '0px'}}>
                {
                    options.map(option =>
                        <div
                            key={option.id}
                            className='option_wrapper'
                            onClick={(e) => changeOption(e, option)}
                        >
                            <span className="option_title">{option.title}</span>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Select;
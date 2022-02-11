import classNames from "classnames";
import React from "react";
import './CustomInput.scss'

function CustomInput({error, id, name, onChange, value, placeholder, label, type}){
    return(
        <>
            <label className={classNames('input-label', error ? 'error' : '')} htmlFor={name}>{label}</label><br/>
            <input
                className={classNames('input-field', error ? 'error' : '')}
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
            />
        </>
    )
}

export default CustomInput
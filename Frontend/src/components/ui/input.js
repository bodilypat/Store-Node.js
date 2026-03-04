//src/components/ui/Input.js 
import React from 'react';
import Proptypes from 'prop-types';

/* 
* Input Component
* Props:
*  - Label: string, label above the input 
*  - name: string, input name 
*  - type: string, input type (text, number, email, etc.)
*  - placeholder: string 
*  - defaultValue: string / number
*  - required: boolean
*  -onChange: function, callback for input changes
 */

function input({
    label,
    name,
    type = 'text',
    plceholder = '',
    defaultValue = '',
    required = false,
    onChange,
}) {
    return (
        <div className="input-container">
            {label && <label htmlFor={name}>{label}</label>}
            <input
                id={name}
                name={name}
                type={type}
                placeholder={plceholder}
                defaultValue={defaultValue}
                required={required}
                onChange={onChange}
            />
        </div>
    );
}
Input.propTypes = {
    label: Proptypes.string,
    name: Proptypes.string.isRequired,
    type: Proptypes.string,
    plceholder: Proptypes.string,
    defaultValue: Proptypes.oneOfType([Proptypes.string, Proptypes.number]),
    required: Proptypes.bool,
    onChange: Proptypes.func,
};

export default Input;


import React from 'react';
import classes from './CustomInput.module.css';

const customInput = (props) => {

    let element = null;

    const inputClasses = [classes.Element];

    if (props.invalid && props.shouldValidate) {
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType) {
        case 'input':
            element = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />;
            break;
        case 'textarea':
            element = <teaxtarea className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />;
            break;
        case 'select':
            element = <select className={inputClasses.join(' ')} value={props.value} onChange={props.changed} >
                {props.elementConfig.options.map(option => <option key={option.value} value={option.value}>{option.displayValue}</option>)}
            </select>;
            break;
        default:
            element = null;
            break;

    }

    return (
        <div className={classes.CustomInput}>
            <label className={classes.Label}>
                {props.label}
            </label>
            {element}
        </div>
    );
}

export default customInput;
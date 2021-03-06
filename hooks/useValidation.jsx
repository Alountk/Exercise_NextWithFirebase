import React, { useState, useEffect } from 'react'

export const useValidation = (initialState, validate, genericFunction) => {
    const[value, setValue] = useState(initialState);
    const[error, setError] = useState({});
    const[submitForm, setSubmitForm] = useState(false);

    useEffect(() => {
        if (submitForm) {
            const noError = Object.keys(error).length ===0;
            if (noError) {
                genericFunction(); 
            }
            setSubmitForm(false);
        }
    }, [error]);

    const handleChange = e => {
        setValue({
            ...value,
            [e.target.name] : e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

        const errorValidation = validate(value);
        setError(errorValidation);
        setSubmitForm(true);
    }

    const handleBlur = () => {
        const  errorValidation = validate(value);
        setError(errorValidation);
    }


    return {
        value,
        error,
        handleSubmit,
        handleChange,
        handleBlur
    };
}

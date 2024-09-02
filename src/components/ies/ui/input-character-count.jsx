"use client"

import React from 'react';

const InputWithCharacterCount = ({ label, maxLength, inputValue, setInputValue }) => {
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <div className="input-block row mb-2">
            <label className="col-form-label col-md-4">{label}</label>
            <div className="col-md-8">
                <input
                    type="text"
                    className="form-control"
                    maxLength={maxLength}
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <div style={{ color: 'red', display: 'flex', justifyContent: 'flex-end', margin: '4px', marginBottom: '0' }}>{inputValue.length}/{maxLength}</div>
            </div>
        </div>
    );
};

export default InputWithCharacterCount;

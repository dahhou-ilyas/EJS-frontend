"use client"

import React, { useState } from 'react';

const TextAreaWithCharacterCount = ({ maxLength, setTextAreaValue, inputValue }) => {

    const handleTextAreaChange = (e) => {
        setTextAreaValue(e.target.value);
    };

    return (
        <div className="col-12 col-sm-12">
            <div className="input-block local-forms">
                <textarea
                    className="form-control"
                    rows="3"
                    cols="30"
                    maxLength={maxLength}
                    value={inputValue}
                    onChange={handleTextAreaChange}
                ></textarea>
            </div>
            <div style={{ color: 'red', display: 'flex', justifyContent: 'flex-end', margin: '4px' }}>{inputValue.length}/{maxLength}</div>
        </div>
    );
};

export default TextAreaWithCharacterCount;

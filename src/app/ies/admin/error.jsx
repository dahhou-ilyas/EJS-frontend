"use client"

import React from 'react';

const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh'
};

const errorStyles = {
    color: 'red',
    fontSize: '16px',
    marginTop: '10px',
    paddingInline: '20px'
};

const Error = ({ error }) => {
    return (
        <div style={containerStyles}>
            <div style={errorStyles}><strong>Error:</strong> {error.message}</div>
        </div>
    );
};

export default Error;

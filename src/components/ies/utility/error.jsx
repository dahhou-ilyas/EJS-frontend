import React from 'react';

const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: "calc(100vh - 290px)"
};

const errorStyles = {
    color: 'red',
    fontSize: '16px',
    marginTop: '10px'
};

const Error = ({ error }) => {
    return (
        <div style={containerStyles}>
            <div style={errorStyles}><strong>Error:</strong> {error.message}</div>
        </div>
    );
};

export default Error;

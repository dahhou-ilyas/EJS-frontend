import React from 'react';

// CSS for the spinner
const spinnerStyles = {
    display: 'inline-block',
    width: '50px',
    height: '50px',
    border: '5px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '50%',
    borderTopColor: '#3498db',
    animation: 'spin 1s linear infinite'
};

const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: "calc(100vh - 290px)"
};

const spinnerKeyframes = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
`;

const Loading = () => {
    return (
        <div style={containerStyles}>
            <style>{spinnerKeyframes}</style>
            <div style={spinnerStyles}></div>
        </div>
    );
};

export default Loading;

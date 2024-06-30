// Error404Page.jsx
import React, { useEffect } from 'react';
import './Error404Page.css'; // Ensure this CSS file is in the same directory

const Error404Page = () => {
    useEffect(() => {
        const timer = setTimeout(() => {
            window.location.href = './index.html';
        }, 5000);

        return () => clearTimeout(timer); // Cleanup the timeout on component unmount
    }, []);

    return (
        <div className="container">
            <div className="text1">Oops!</div>
            <div className="text2">404 - Page not Found</div>
            <div className="text3">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </div>
            <a href="./index.html">Go to HomePage</a>
        </div>
    );
};

export default Error404Page;

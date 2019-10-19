import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
    return (
        <div id="notfound">
            <p>404 | Request Not Found</p>
            <Link to="/">Go back</Link>
        </div>
    )
}
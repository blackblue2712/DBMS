import React from 'react';

const HighLight = (props) => {
    return (
        <span style={{color: "red"}}>{props.children}</span>
    )
}

export default HighLight;


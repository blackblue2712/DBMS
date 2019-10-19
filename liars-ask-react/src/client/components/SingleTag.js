import React from 'react';

const SingleTag = props => {
    return (
        <>
            <a href="#tag" className="post-tag">
                {props.tagName || 'javascript'}
            </a>
            <span className="item-multiplier"><span className="item-multiplier-x">×</span>&nbsp;<span className="item-multiplier-count">{props.tagCounter || 0}</span></span>
            <div className="excerpt">
                {props.tagDescription || ""}
            </div>
            <div className="grid jc-space-between">
                <div className="grid--cell stats-row">
                    <a href="#q" title="">778 asked today</a>,
                    <a href="#q" title="">4631 this week</a>
                </div>
            </div>
        </>
    )
}

export default SingleTag;
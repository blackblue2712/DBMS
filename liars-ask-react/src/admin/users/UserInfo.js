import React from 'react';


const UserInfo = props => {
    return (
        <div className="grid-layout--cell tags-cell">
            <div className="user-gavatar48">
                <a href="/users/123">
                    <img className="user-avatar" loading="lazy" src={props.userImage} alt="none"/>
                </a>
            </div>
            <div className="user-detail d-flex">
                <div>
                    <a href="/user/123">{props.username}</a>
                    <span className="user-location">{props.userLocation}</span>
                    <div className="-flair">
                        <span className="reputation-score" title="reputation this week: 1,110 total reputation: 413,462" dir="ltr">{props.userReputation}</span>
                    </div>
                </div>
            </div>
            <div className="user-tags clear-fix">
                <a href="#t">pandas</a>, <a href="#t">python</a>, <a href="#t">dataframe</a>
            </div>
        </div>
    )
}

export default UserInfo
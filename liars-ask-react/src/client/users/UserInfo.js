import React from 'react';
import { Link } from 'react-router-dom';
import Default from '../../images/default.png'

const UserInfo = props => {
    return (
        <div className="grid-layout--cell tags-cell">
            <div className="user-gavatar48">
                <Link to={`/users/${props.id}`}>
                    <img className="user-avatar" loading="lazy" src={props.userImage || Default} alt="none"/>
                </Link>
            </div>
            <div className="user-detail d-flex">
                <div>
                    <Link to={`/users/${props.id}`}>{props.username}</Link>
                    <span className="user-location">{props.userFullname}</span>
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
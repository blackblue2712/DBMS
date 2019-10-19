import React, { Component } from 'react';
import './UsersComponent.css';
import UserInfo from './UserInfo';
import { getUsers } from '../../controllers/userController';
import DefaultImage from '../../images/default.png';

class TagsComponent extends Component {

    constructor() {
        super();
        this.state = {
            users: []
        }
    }

    async componentDidMount() {
        const users = await getUsers();
        this.setState( {users} );
        
    }

    render() {
        const { users } = this.state;
        console.log(users);
        return (
            <div id="content">
                <div className="main-head">
                    <div className="grid d-flex align-items-centers mb16">
                        <h1 className="fs-headline1 mr-auto">Users</h1>
                    </div>
                    <p className="mb24 f13 fw350">Find users for ... :)</p>
                    <div className="grid-ai grid-tags mb16 d-flex align-items-center">
                        <div className="ps-relative mr-auto">
                            <input type="text" name="usersfilter" placeholder="Filter by user" maxLength="240" className="s-input s-input__search js-search-users" />
                            <svg aria-hidden="true" className="svg-icon s-input-icon s-input-icon__search iconSearch" width="18" height="18" viewBox="0 0 18 18"><path d="M18 16.5l-5.14-5.18h-.35a7 7 0 1 0-1.19 1.19v.35L16.5 18l1.5-1.5zM12 7A5 5 0 1 1 2 7a5 5 0 0 1 10 0z"></path></svg>
                        </div>
                        <div className="s-btn-group">
                            <a href="#popular" className="s-btn s-btn__outline s-btn__primary">Reputation</a>
                            <a href="#popular" className="s-btn s-btn__outline s-btn__primary">New users</a>
                            <a href="#popular" className="s-btn s-btn__outline s-btn__primary">Voters</a>
                            <a href="#popular" className="s-btn s-btn__outline s-btn__primary">Editors</a>
                            <a href="#popular" className="s-btn s-btn__outline s-btn__primary">Moderators</a>
                        </div>
                    </div>
                </div>

                <div id="tags-list">
                    <div id="tags-browser">
                        {
                            users.map ( (user, i) => {
                                return <UserInfo
                                    key={i}
                                    username={user.email}
                                    userLocation="Bratislava, Slovakia"
                                    userImage={user.photo || DefaultImage}
                                    userReputation="1,110"
                                    id={user._id}
                                />        
                            })
                        }
                    </div>
                </div>
                
            </div>
        )
    }
}

export default TagsComponent;
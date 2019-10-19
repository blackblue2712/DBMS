import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class LeftSidebar extends Component {

    constructor() {
        super();
        this.state = {

        }
    }

    componentDidMount () {
        let whereami = this.props.location.pathname.split("/")[2];
        if(whereami === undefined) whereami = "home";
        Array.from(document.querySelectorAll(".canactive")).map( el => el.classList.remove("youarehere"));
        if(document.getElementById(whereami)) {
            document.getElementById(whereami).classList.add("youarehere");
        }
    }
    componentDidUpdate () {
        let whereami = this.props.location.pathname.split("/")[2];
        if(whereami === undefined) whereami = "home";
        Array.from(document.querySelectorAll(".canactive")).map( el => el.classList.remove("youarehere"));
        if(document.getElementById(whereami)) {
            document.getElementById(whereami).classList.add("youarehere");
        }
    }

    render() {
        return (
            <div className="left-sidebar ps-fixed" id="left-sidebar">
                <div className="ps-sticky js-sticky-leftnav">
                    <nav role="navigation">
                        <ul className="nav-links">
                            <li>
                                <a className="nav-links--link -link__with-icon d-flex" href="#home">
                                    <svg aria-hidden="true" className="svg-icon iconGlobe" width="18" height="18" viewBox="0 0 18 18"><path d="M9 1a8 8 0 1 0 0 16A8 8 0 0 0 9 1zM8 15.32a6.4 6.4 0 0 1-5.23-7.75L7 11.68v.8c0 .88.12 1.32 1 1.32v1.52zm5.72-2c-.2-.66-1-1.32-1.72-1.32h-1v-2c0-.44-.56-1-1-1H6V7h1c.44 0 1-.56 1-1V5h2c.88 0 1.4-.72 1.4-1.6v-.33a6.4 6.4 0 0 1 2.32 10.24v.01z"></path></svg>
                                    <span className="-link--chanel-name">Liars ask</span>
                                </a>
                            </li>
                            <li id="home" className="youarehere canactive">
                                <Link className="nav-links--link" to="/admin">Home</Link>
                            </li>
                            <li className="">
                                <ul>
                                    <li id="tags" className="canactive">
                                        <Link className="nav-links--link" to="/admin/tags">Tags</Link>
                                    </li>
                                    <li id="users" className="canactive">
                                        <Link className="nav-links--link" to="/admin/users">Users</Link>
                                    </li>
                                    <li id="announcements" className="canactive">
                                        <Link className="nav-links--link" to="/admin/announcements">Announcements</Link>
                                    </li>
                                    <li>
                                        <ul>
                                            <li>
                                                <a href="#question" className="nav-links--link -link__with-icon -link__with-icon-custom">
                                                    <svg viewBox="0 0 10 18" className="svg-4 svg-icon iconGlobe" width="18" height="18"><path d="M2,5 C2,8 8,8 8,5" /></svg>
                                                    <span className="-link--chanel-name">TEAMS</span>
                                                </a>
                                            </li>
                                        </ul>
                                        
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }
}

export default withRouter(LeftSidebar);
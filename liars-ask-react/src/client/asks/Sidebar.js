import React from 'react';
import './Sidebar.css';
import SidebarWidget from './SidebarWidget';
import Tags from '../components/Tags';

const Sidebar = props => {
    return (
        <div id="sidebar">
            <div className="s-sidebarwidget mb16">
                <div className="s-sidebarwidget--header s-sidebarwidget--header__FAFAFB d-flex align-items-center">
                    <span className="s-sidebarwidget--title">How to ask a question</span>
                </div>
                <SidebarWidget />
            </div>
            <div className="s-sidebarwidget mb16">
                <div className="s-sidebarwidget--header d-flex align-items-center">
                    <span >
                        <svg aria-hidden="true" className="svg-icon iconEye" width="18" height="18" viewBox="0 0 18 18"><path d="M9.06 3C4 3 1 9 1 9s3 6 8.06 6C14 15 17 9 17 9s-3-6-7.94-6zM9 13a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 0 0 2-2 2 2 0 0 0-2-2 2 2 0 0 0-2 2 2 2 0 0 0 2 2z"></path></svg>
                    </span>
                    <span className="s-sidebarwidget--title">Watched</span>
                </div>
                <div className="s-sidebar-widget--content s-sidebar-widget--items">
                    <Tags name="python"/>
                    <Tags name="javascript"/>
                    <Tags name="reactjs"/>
                    <div className="clear-fix"></div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;
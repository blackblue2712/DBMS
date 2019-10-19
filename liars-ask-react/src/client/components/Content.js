import React from 'react';
import Mainbar from './Mainbar';
import Sidebar from './Sidebar';
import './Content.css';

const Content = (props) => {
    return (
        <div id="content">
            <Mainbar />
            <Sidebar />
            <div className="clear-fix"></div>
            <div className="nearfooter" style={{maxWidth: "calc(100% - 300px - 24px)", padding: "40px 0px"}}>
                <p>
                    Looking for more? Browse 
                    <a style={{ color: "#3af" }} href="#a"> the complete list of questions</a>
                    , or
                    <a style={{ color: "#3af" }} href="#a"> popular tags </a>
                    .Help us answer 
                    <a style={{ color: "#3af" }} href="#a"> unanswered questions</a>
                    .
                </p>
            </div>
        </div>
    )
}

export default Content;
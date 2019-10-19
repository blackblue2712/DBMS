import React from 'react';

const Content = (props) => {
    return (
        <>
            <div className="main-head">
                <div className="grid d-flex align-items-centers mb16">
                    <h1 className="fs-headline1 mr-auto">Admin control</h1>
                </div>
                <p className="mb24 f13 fw350">Admin page /@ liars aks react</p>
            </div>
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
        </>
    )
}

export default Content;
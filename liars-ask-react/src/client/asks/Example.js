import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Asks.css';
import "./Mainbar.css";
import Mde from '../editor/Mde';
import Sidebar from './Sidebar';
import Tags from '../components/Tags';

let value = `>Just like this
`;
value += '```';
value += `
@media screen and (max-width: 980px) {
    #mainbar {
        width: 100% !important;
    }
    #sidebar {
        margin-top: 24px;
        float: left !important;
        width: 90% !important;
    }
    .nearfooter {
        max-width: 100% !important; 
    }
  
    .js-search-tags {
        width: 100%;
    }
    .grid-tags {
        display: block !important;
    }
    .grid-tags .s-btn-group {
        margin-top: 24px;
        text-align: right;
    }
}
`
value += '```';

const Example = () => {
    useEffect( () => {
        let editor = document.querySelector("textarea.mde-text ");
        editor.setAttribute("id", "questionBody");
        editor.setAttribute("name", "questionBody");

        let tagsIncludedSize = document.querySelector(".tags-included").offsetWidth;
        document.querySelector("#tageditor-replacing-tagnames--input").style.paddingLeft = tagsIncludedSize + 10 + "px";
    })

    
    return (
        <div id="content">
            <div id="mainbar">
                <div className="main-head">
                    <div className="grid d-flex align-items-center mb16">
                        <h1 className="fs-headline1 mr-auto">Ask a public question</h1>
                        <Link className="s-btn s-btn__outline s-btn__primary s-btn__primary" to="/questions/ask">Ask question</Link>
                    </div>
                </div>
                <div id="question-form">
                    <div className="bg-white bar-sm bs-md p16">
                        <div className="post-title ps-relative mb16">
                            <label htmlFor="title" className="s-label mb4">
                                Question title
                                <p className="s-desscription mt4">Be specific and imagine you're asking a question to another developer</p>
                            </label>
                        </div>
                        <div className="ps-relative mb16">
                            <input
                                id="title" name="title" type="text" className="s-input w-100" placeholder="What's your programming question? Be specific"
                                value="How to reponsive web with @media css- ask for syntax"
                            />
                        </div>
                        
                        <div className="post-editor mb16">
                            <div className="ps-relative">
                                <label htmlFor="questionBody" className="s-label mb16 d-block">
                                    Question body
                                    <p className="s-desscription mt4">Include all the infomation someone would need to answer your question</p>
                                </label>
                                <Mde
                                    value={value}
                                />
                                {/* CAPTOPN */}
                                <div className="d-flex align-items-center pb12 fc-light fs-caption mt16 mb24">
                                    <div className="mr16">
                                        ``` <code className="ba bc-black-9 px4 py2 bar-sm bg-black-050 fc-black-800 ff-mono">code</code> ```
                                    </div>
                                    <div className="mr16 fw-bold">
                                        **bold**
                                    </div>
                                    <div className="mr16 fs-italic">
                                        *italic*
                                    </div>
                                    <div className="">
                                        &gt;quote
                                    </div>
                                </div>
                                {/* TAGS EDITOR */}
                                <div className="ps-relative pt24" id="tag-editor">
                                    <label htmlFor="tagnames" className="s-label mb16 d-block">
                                        Tags
                                        <p className="s-desscription mt4">Add upto 5 tags to describe what your question is about</p>
                                    </label>
                                    <div className="ps-relative mb16">
                                        <input 
                                            id="tagnames" name="tagnames" type="text" className="s-input w-100 d-none" placeholder="e.g. (javascript xml react)"
                                            value="css scss less"    
                                        />
                                        <div className="tags-editor ps-relative" >
                                            <span className="tags-included ps-absolute">
                                                <Tags name="css" close={true}/>
                                                <Tags name="scss" close={true}/>
                                                <Tags name="less" close={true}/>
                                            </span>
                                        <input
                                            type="text" className=" s-input w-100" placeholder="e.g. (javascript xml react)"
                                            id="tageditor-replacing-tagnames--input"
                                            readOnly
                                        />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>

            <Sidebar />
            <div className="clear-fix"></div>
            
        </div>
    )
}

export default Example;
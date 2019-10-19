import React, { useEffect } from 'react';
import Mde from '../editor/Mde';
// import { Link } from 'react-router-dom';


const EditTag = props => {

    useEffect( () => {
        let editor = document.querySelector("textarea.mde-text ");
        editor.setAttribute("id", "tag-description")
        editor.setAttribute("name", "tag-description")
    })

    return (
        <>
            <div className="main-head">
                <div className="grid d-flex align-items-centers mb16">
                    <h1 className="fs-headline1 mr-auto">Add a new tag</h1>
                    {/* <Link to="/admin/tags/new" className="s-btn s-btn__outline s-btn__primary">Add new tag</Link> */}
                </div>
                <p className="mb24 f13 fw350">A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.</p>
            </div>

            <div id="mainbar">
                <div id="tag-form">
                    <div className="bg-white bar-sm bs-md p16">
                        <div className="post-title ps-relative mb16">
                            <label htmlFor="tag-name" className="s-label mb4">
                                Tag name
                                <p className="s-desscription mt4">A programming language or whatever </p>
                            </label>
                        </div>
                        <div className="ps-relative mb16">
                            <input id="tag-name" name="tag-name" type="text" className="s-input w-100" placeholder="Specific brief - meaningful name"/>
                        </div>
                        
                        <div className="post-editor mb16">
                            <div className="ps-relative">
                                <label htmlFor="tag-description" className="s-label mb16 d-block">
                                    Tag description
                                    <p className="s-desscription mt4">Include all the infomation about the tag</p>
                                </label>
                                <Mde />
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
                            </div>
                        </div>
                        <button className="s-btn s-btn__outline s-btn__primary mt24">Save tag</button>
                    </div>
                </div>
            </div>
            <div className="clear-fix"></div>
        </>
    )
}

export default EditTag ;
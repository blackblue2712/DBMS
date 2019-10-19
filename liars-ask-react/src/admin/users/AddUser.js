import React, { useEffect } from 'react';
import Mde from '../editor/Mde';
// import { Link } from 'react-router-dom';


const AddUser = props => {

    useEffect( () => {
        let editor = document.querySelector("textarea.mde-text ");
        editor.setAttribute("id", "tag-description")
        editor.setAttribute("name", "tag-description")
    })

    let randomstring = Math.floor(Math.random() * 10 + 1)  + Math.random().toString(36).slice(-7);
    return (
        <>
            <div className="main-head">
                <div className="grid d-flex align-items-centers mb16">
                    <h1 className="fs-headline1 mr-auto">Add a new User</h1>
                    {/* <Link to="/admin/tags/new" className="s-btn s-btn__outline s-btn__primary">Add new tag</Link> */}
                </div>
                {/* <p className="mb24 f13 fw350">A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.</p> */}
            </div>

            <div id="mainbar">
                <div id="tag-form">
                    <div className="bg-white bar-sm bs-md p16">
                        <div className="post-title ps-relative mb16">
                            <label htmlFor="username" className="s-label mb4">
                                Username
                                <p className="s-desscription mt4">A programming language or whatever </p>
                            </label>
                        </div>
                        <div className="ps-relative mb16">
                            <input id="username" name="username" type="text" className="s-input w-100" placeholder="Enter username here"/>
                        </div>

                        <div className="post-title ps-relative mb16">
                            <label htmlFor="password" className="s-label mb4">
                                Password
                                <p className="s-desscription mt4">Password auto generate</p>
                            </label>
                        </div>
                        <div className="ps-relative mb16">
                            <input id="password" name="password" type="text" className="s-input w-100" value={randomstring} disabled/>
                        </div>
                        
                        <div className="post-editor mb16">
                            <div className="ps-relative">
                                <label htmlFor="tag-description" className="s-label mb16 d-block">
                                    User description
                                    <p className="s-desscription mt4">Describe some information about this user (why create, permission?)</p>
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
                        <button className="s-btn s-btn__outline s-btn__primary mt24">Save user</button>
                    </div>
                </div>
            </div>
            <div className="clear-fix"></div>
        </>
    )
}

export default AddUser;
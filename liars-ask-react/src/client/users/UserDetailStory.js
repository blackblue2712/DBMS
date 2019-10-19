import React, { useState, useEffect } from 'react';
import Mde from '../editor/Mde';
import { putUpdateStory } from '../../controllers/userController';
import ReactMarkdown from 'react-markdown';
import CodeBlock from '../editor/CodeBlock';
import Notify from '../components/Notify';

const UserDetailStory = (props) => {

    const { quotes, bio, id } = props.userPayload;
    
    const [fquotes, setQuotes] = useState(quotes);
    const [showNotify, setShowNotify] = useState("");

    const handleChangeStory = () => {
        let btnLoading = document.getElementById("wrap-btn-loading");
        let editor = document.querySelector("textarea.mde-text ");
        btnLoading.classList.add("btn-loading");
        try {
            if(!editor) {
                alert("Please out preview mode");
            } else {
                let bioUpdate = editor.value;
                putUpdateStory({bioUpdate, fquotes, _id: id})
                .then( res => {
                    setShowNotify(res.message);
                    btnLoading.classList.remove("btn-loading");
                })
                .catch(err => {
                    setShowNotify("Error occur in promise");
                    btnLoading.classList.remove("btn-loading");
                })
            }
        } catch (err) {
            console.log(err);
            setShowNotify("Error occur (console)");
            btnLoading.classList.remove("btn-loading");
        }
    }

    useEffect( () => {
        let editor = document.querySelector("textarea.mde-text");
        editor.setAttribute("id", "bio")
        editor.setAttribute("name", "bio");

        setQuotes(quotes);
    }, [props.userPayload.email])

    return (
        <div className="bio bs-md p20">
            {showNotify !== "" &&  <Notify class="on" text={showNotify} clearMess={setShowNotify} />}
            <div className="post-title ps-relative mb4">
                <label htmlFor="quotes" className="s-label mb4">
                    Your quotes
                </label>
            </div>
            <div className="ps-relative mb16">
                <input
                    id="quotes" name="quotes" type="text" className="s-input w-100"
                    value={fquotes}
                    onChange={ (e) => setQuotes(e.target.value) }
                />
            </div>
            <div className="post-title ps-relative mb4">
                <label htmlFor="bio" className="s-label mb4">
                    Bio
                </label>
            </div>
            <div className="post-title ps-relative mb4">
                <ReactMarkdown
                    source={bio}
                    renderers={{ code: CodeBlock }}
                />
            </div>
            <div className="ps-relative mb16">
                <Mde />
            </div>
            <div className="d-flex w-100">
                <div id="wrap-btn-loading2" className="ps-relative">
                    <button
                        type="button" className="s-btn btn-sm btn-outlined colorGreen"
                        onClick={handleChangeStory}
                    >Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UserDetailStory;
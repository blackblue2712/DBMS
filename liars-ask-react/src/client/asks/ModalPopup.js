import React, { useEffect } from 'react';
import './ModalPopup.css';
import ButtonGuild from './ButtonGuild';

const ModalPopup = props => {

    const closeDialog = () => {
        document.querySelector(".s-modal").style.display = "none";
    }

    const closeDialogForever = () => {
        document.querySelector(".s-modal").style.display = "none";
        // delete localStorage
    }

    const onDragExit = e => {
        let element = document.querySelector(".js-modal--dialog");
        let halfWidth = element.clientWidth/2;
        let halfHeight = element.clientHeight/2;

        element.style.top = e.clientY + halfHeight + "px";
        element.style.left = e.clientX  + halfWidth + "px";
    }

    const handleStartWriting = () => {
        document.querySelector(".s-modal").style.display = "none";
        document.querySelector("#title").focus();
    }

    useEffect( () => {
        // document.querySelector("#root").onclick = () => {
        //     document.querySelector(".s-modal").style.display = "none";
        // }
    })

    return (
        <div className="s-modal js-welcom-modal ps-fixed">
            <div
                className="s-modal--dialog js-modal--dialog wmx4 ps-relative"
                draggable={true}
                onDragEnd={onDragExit}
            >
                <h1 className="s-modal--header"
                    
                >
                    Asking a good question
                </h1>
                <div className="s-modal--body">
                    <p>You're ready to first programmign-related question and the community is here to help! To get you the best answer, we're provided some guidance:</p>
                    <p>Before you post , <b>search the site </b> to make sure your question hasn't been answered</p>
                    <ButtonGuild
                        index={3}
                        icon={[<img key={3} src="https://cdn.sstatic.net/Img/list-1.svg?v=e8dd475ba207" width="16" height="16" alt="1." />]}
                        title={'Summarize the problem'}
                        child={[<ul key={3} className="ml24 mb0"><li><p>Include details about your goal</p></li><li><p>Describe expected and actual results</p></li><li><p className="mb0">Include any error messages</p></li></ul>]}
                    />
                    <ButtonGuild
                        index={4}
                        icon={[<img key={4} src="https://cdn.sstatic.net/Img/list-2.svg?v=9382fc2c3631" width="16" height="16" alt="2."/>]}
                        title={'Describe what you\'re tried'}
                        child={[<p key={4}>Show what you’ve tried and tell us what you found (on this site or elsewhere) and why it didn’t meet your needs. You can get better answers when you provide research.</p>]}
                    />
                    <ButtonGuild
                        index={5} 
                        icon={[<img key={5} src="https://cdn.sstatic.net/Img/list-3.svg?v=323a95564232" width="16" height="16" alt="3."/>]}
                        title={'When appropriate, show some code'}
                        child={[
                            <p key={5}>When appropriate, share the minimum amount of code others need to reproduce your problem (also called a minimum, reproducible example)</p>
                        ]}
                        class="bdb-none"
                    />
                    <p>
                        <small>You'll find more tops in the sidebar</small>
                    </p>
                </div>
                <div className="s-modal--footer">
                    <button onClick={handleStartWriting} className="s-btn s-btn__outline s-btn__primary mt24 mr24">Start writing</button>
                    <button className="s-btn s-btn__outline s-btn__hovero mt24 bd-none" onClick={closeDialogForever}>Don't show me this again</button>
                </div>
                <img className="ps-absolute r12 b0" width="53" height="65" src="https://cdn.sstatic.net/Img/ask/robot-raising-hand.gif?v=369c8833cde4" alt="robo-raising" />
                <button className="s-modal--close s-btn js-modal-close ps-absolute" onClick={closeDialog}>
                    <svg aria-hidden="true" className="svg-icon iconClearSm" width="14" height="14" viewBox="0 0 14 14"><path d="M12 3.41L10.59 2 7 5.59 3.41 2 2 3.41 5.59 7 2 10.59 3.41 12 7 8.41 10.59 12 12 10.59 8.41 7 12 3.41z"></path></svg>
                </button>
            </div>
        </div>
    )
}

export default ModalPopup;
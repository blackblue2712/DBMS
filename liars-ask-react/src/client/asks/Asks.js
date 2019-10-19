import React from 'react';
import { Link } from 'react-router-dom';
import './Asks.css';
import "./Mainbar.css";
import Mde from '../editor/Mde';
import Sidebar from './Sidebar';
import ModalPopup from './ModalPopup';
import Tags from '../components/Tags';
import { isAuthenticated } from '../../controllers/userController';
import Notify from '../components/Notify';
import  { postAsk } from '../../controllers/askController';

class Asks extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "",
            body: "",
            tagDom: "",
            message: "",
        }
    }

    handleAsk = () => {
        let btnLoading = document.getElementById("wrap-btn-loading");
        try {
            btnLoading.classList.add("btn-loading");
            let token = isAuthenticated().token;
            let owner = isAuthenticated().user._id;
            let editor = document.querySelector("textarea.mde-text ");
            let body = "";
            
            if(editor) {
                body = editor.value;
                let title = document.getElementById("title").value;
                // tags
                let tagsname = document.getElementById("tagsname").value;
                let tagsnameArray = tagsname.split(" ")
                tagsnameArray = tagsnameArray.filter( t => t !== "");
    
                if(title) {
                    postAsk({title, body, tagsnameArray, owner}, token)
                    .then( res => {
                        this.setState( {message: res.message} );
                    })
                    .catch( err => {
                        this.setState( {message: "Error post"} );
                    })
                }
            } else {
                alert("Please turn to write mode");
            }
            btnLoading.classList.remove("btn-loading");
        } catch (err) {
            console.log(err);
            btnLoading.classList.remove("btn-loading");
            this.setState( {message: "Error occur (console)"} );
        }
        
    }

    closeTag = (text) => {
        let tagsname = document.getElementById("tagsname");
        let tagsnameArray = tagsname.value.split(" ").filter( t => t !== text);
        tagsname.value = tagsnameArray.join(" ");
        this.setState( {tagDom: tagsname.value} );
    }

    handleChangeTag = (e) => {
        if(e.keyCode === 32) {
            let tagsname = document.getElementById("tagsname");
            let tagreplace = document.getElementById("tageditor-replacing-tagnames--input")
            tagsname.value = tagsname.value + e.target.value;
            this.setState( {tagDom: tagsname.value} );
            tagreplace.value = "";
        }
    }

    clearMess = () => {
        this.setState( {message: ""} );
    }

    componentDidMount() {
        // 
        let editor = document.querySelector("textarea.mde-text ");
        editor.setAttribute("id", "questionBody")
        editor.setAttribute("name", "questionBody")

        document.querySelector("#tageditor-replacing-tagnames--input").addEventListener("keyup", this.handleChangeTag, false);
    }
    componentDidUpdate() {
        let tagsIncludedSize = document.querySelector(".tags-included").offsetWidth;
        document.querySelector("#tageditor-replacing-tagnames--input").style.paddingLeft = tagsIncludedSize + 10 + "px";
    }
    componentWillUnmount() {
        document.querySelector("#tageditor-replacing-tagnames--input").removeEventListener("keyup", this.handleChangeTag, false);
    }

    render() {
        const { tagDom, message } = this.state;
        return (
            <div id="content">
                <div id="mainbar">
                    <Notify />  
                    {message !== "" &&  <Notify class="on" text={message} clearMess={this.clearMess} />}
                    <div className="main-head">
                        <div className="grid d-flex align-items-center mb16">
                            <h1 className="fs-headline1 mr-auto">Ask a public question</h1>
                            <Link className="s-btn s-btn__outline s-btn__primary s-btn__primary" to="/questions/ask/example/howtowrite">See example</Link>
                        </div>
                    </div>
                    <div id="question-form">
                    <div className="bg-white bar-sm bs-md p16">
                        <div className="post-title ps-relative mb16">
                            <label htmlFor="title" className="s-label mb4">
                                Title
                                <p className="s-desscription mt4">A programming language or whatever </p>
                            </label>
                        </div>
                        <div className="ps-relative mb16">
                            <input id="title" name="title" type="text" className="s-input w-100" placeholder="Enter title here"/>
                        </div>
                        
                        <div className="post-editor mb16">
                            <div className="ps-relative">
                                <label htmlFor="questionBody" className="s-label mb16 d-block">
                                    Body
                                    <p className="s-desscription mt4">Announcement body (all of the information about the announcement)</p>
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
                                <div className="ps-relative pt24" id="tag-editor">
                                    <label htmlFor="tagsname" className="s-label mb16 d-block">
                                        Tags
                                        <p className="s-desscription mt4">Add tags to describe what your announcement is about</p>
                                    </label>
                                    <div className="ps-relative mb16">
                                        <input 
                                            id="tagsname" name="tagsname" type="text" className="s-input w-100 d-none" placeholder="e.g. (javascript xml react)"    
                                        />
                                        <div className="tags-editor ps-relative" >
                                            <span className="tags-included ps-absolute">
                                                
                                                {
                                                    tagDom.split(" ").map( (tag, index) => {
                                                        return tag !== "" && <Tags key={index} id={"data-" + tag} closeTag={() => this.closeTag(tag)} name={tag} close={true}/>
                                                    })
                                                }
                                            </span>
                                        <input
                                            type="text" className="s-input w-100" placeholder="e.g. (javascript xml react)"
                                            id="tageditor-replacing-tagnames--input"
                                            onChange={(e) => this.handleChangeTag(e.target.value, e.keyCode)}
                                        />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="wrap-btn-loading" className="ps-relative d-inline-block mt24">
                            <button
                                className="s-btn s-btn__outline s-btn__primary"
                                onClick={this.handleAsk}
                            >Post this</button>
                        </div>
                    </div>
                </div>
                    
            </div>
    
                <Sidebar />
                <div className="clear-fix"></div>
    
                <ModalPopup />
                
            </div>
        )
    }
}

export default Asks;
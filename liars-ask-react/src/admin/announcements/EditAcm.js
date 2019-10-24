import React from 'react';
import { getSingleAnnouncement, putEditAnnouncement } from '../../controllers/announcementController';
import Mde from '../editor/Mde';
import Tags from '../components/Tags';
import { isAuthenticated } from '../../controllers/userController';
import Notify from '../components/Notify';
// import ReactMarkdown from 'react-markdown';

class EditAcm extends React.Component {
    constructor() {
        super();
        this.state = {
            acm: {},
            title: "",
            body: "",
            id: "",
            isImportant: false,
            tagDom: "",
            message: "",
        }
    }

    handlePostAcm = () => {
        let id = this.state.id;
        let token = isAuthenticated().token;
        let editor = document.querySelector("textarea.mde-text ");
        let body = "";
        if(editor) {
            body = editor.value;
            let title = this.state.title;
            let isImportant = document.getElementById("is-important").checked;
            // tags
            let tagsname = document.getElementById("tagsname").value;
            let tagsnameArray = tagsname.split(" ")
            tagsnameArray = tagsnameArray.filter( t => t !== "");

            if(title) {
                if(body === "") {
                    body = undefined;
                }
                putEditAnnouncement({title, body, isImportant, tagsnameArray, id}, token)
                .then( res => {
                    console.log(res);
                    this.setState( {message: res.message} );
                })
            }
        } else {
            alert("Please turn to write mode")
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

    handleChangeValue = (text) => {
        this.setState( {title: text} );
    }

    clearMess = () => {
        this.setState( {message: ""} );
    }

    componentDidMount() {
        // fetching data
        getSingleAnnouncement(this.props.match.params.acmId)
        .then( res => {
            if(!res.message) {
                this.setState( {acm: res, title: res.title, body: res.body, id: res.id, isImportant: res.isImportant, tagDom: JSON.parse(res.anonymousTags).join(" ")} );
                document.getElementById("tagsname").value = this.state.tagDom;
                if(res.isImportant) {
                    document.getElementById("is-important").checked = true;
                }
            } else {
                this.props.history.push("/404");
            }
        })
        // 
        let editor = document.querySelector("textarea.mde-text ");
        editor.setAttribute("id", "announ-content")
        editor.setAttribute("name", "announ-content")

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
        const { tagDom, message, title, body } = this.state;
        console.log(tagDom)
        return (
            <>
                <div id="mainbar" style={{width: "100%"}}>
                    <Notify />  
                    {message !== "" &&  <Notify class="on" text={message} clearMess={this.clearMess} />}
                    <div id="announ-form">
                        <div className="bg-white bar-sm bs-md p16">
                            <div className="post-title ps-relative mb16">
                                <label htmlFor="title" className="s-label mb4">
                                    Title
                                    <p className="s-desscription mt4">A programming language or whatever </p>
                                </label>
                            </div>
                            <div className="ps-relative mb16">
                                <input id="title" name="title" type="text" className="s-input w-100"
                                    value={title}
                                    onChange={ (e) => this.handleChangeValue(e.target.value) }
                                />
                            </div>
                            
                            <div className="post-editor mb16">
                                <div className="ps-relative">
                                    <label htmlFor="announ-content" className="s-label mb16 d-block">
                                        Body
                                        <p className="s-desscription mt4">Announcement body (all of the information about the announcement)</p>
                                    </label>
                                    {/* <ReactMarkdown source={body}/> */}
                                    <pre>{body}</pre>
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
    
                            <div className="post-title ps-relative mb16">
                                <label htmlFor="is-important" className="s-label mb4">
                                    Is important
                                    <p className="s-desscription mt4">Is this announcement important? Check it</p>
                                </label>
                            </div>
                            <div className="ps-relative mb16">
                                <input id="is-important" name="is-important" type="checkbox" className="" />
                            </div>
    
                            <button
                                className="s-btn s-btn__outline s-btn__primary mt24"
                                onClick={this.handlePostAcm}
                            >Save this</button>
                        </div>
                    </div>
                </div>
                <div className="clear-fix"></div>
            </>
        )
    }
}

export default EditAcm;
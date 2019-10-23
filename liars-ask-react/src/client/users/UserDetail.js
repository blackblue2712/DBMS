import React from 'react';
import UserDetailBasic from './UserDetailBasic';
import UserDetailStory from './UserDetailStory';
import { getLoggedUser, isAuthenticated } from '../../controllers/userController';
import { getYourQuestions, deleteQuestion } from '../../controllers/askController';
import { getYourBlogs, deleteBlog } from '../../controllers/blogController';
import Notify from '../components/Notify';
import { Link } from 'react-router-dom';
import DeleteIcon from '../../images/delete.svg';
import Loading from '../../images/loading.gif';


class UserDetail extends React.Component {
    constructor() {
        super();
        this.state = {
            userPayload: {},
            questions: [],
            blogs: []
        }
    }

    async componentDidMount() {
        try {
            const token = this.props.userPayload.token;
            const _id = this.props.match.params.userId;
            let userId = isAuthenticated().user._id;
    
            // get info user logged
            let userInfo = await getLoggedUser(_id, token);
            if(Number(userInfo.message) === 404) {
                this.props.history.push("/404");
            }
            // get your questions
            let yourQuestions = await getYourQuestions(userId);
            // get your blogs
            let yourBlogs = await getYourBlogs(userId);

            this.setState( {userPayload: userInfo, questions: yourQuestions, blogs: yourBlogs} );
        } catch (err) {
            console.log(err);
        }
    }

    handleDeleteBlog = (id, title) => (event) => {
        let flag = window.confirm(`Are you sure to delete blog "${title}" ?`);
        if(flag) {
            document.querySelector(`#img-delete-${id}`).src = Loading;
            try {
                deleteBlog(id, isAuthenticated().token)
                .then( res => {
                    if(res && res.message === "Done") {
                        if(document.querySelector(`#onRemoveBlog-${id}`)) {
                            document.querySelector(`#onRemoveBlog-${id}`).remove();
                        }
                    }
                })
            } catch (err) {
                console.log(err)
            }
        }
    }

    handleDeleteYourQuestion = (id, title) => (event) => {
        let flag = window.confirm(`Are you sure to delete question "${title}" ?`);
        if(flag) {
            document.querySelector(`#img-delete-ques-${id}`).src = Loading;
            try {
                deleteQuestion(id, isAuthenticated().token)
                .then( res => {
                    console.log(res);
                    if(res && res.message === "Done") {
                        if(document.querySelector(`#onRemoveQuestion-${id}`)) {
                            document.querySelector(`#onRemoveQuestion-${id}`).remove();
                        }
                    }
                })
            } catch (err) {
                console.log(err)
            }
        }
    }

    render() {
        const userPayloadInfo = this.state.userPayload;
        const {questions, blogs} = this.state;
        return (
            <div id="content">
                <Notify />
                <div className="main-head">
    
                    <div className="subheader d-flex align-items-center w-100 mt24">
                        <div id="tabs" className="d-flex align-items-center w-100">
                            <a href="#u" >Activity</a>
                            <a href="#u" >Your questions</a>
                            <a href="#u" className="youarehere">Edit profile and setting</a>
                            <a href="#u" >Profile</a>
                        </div>
                        
                    </div>
    
                    <div id="mainbar" className="subtag mt36">
                        <div id="tag-profile">
                            <UserDetailBasic userPayload={userPayloadInfo}/>
                        </div>
    
                        <div id="two-auth" className="bs-md mt36 mb36 p20">
                            <h4>TWO-FACTOR AUTHENTICATION</h4>
                            <div className="d-flex">
                                <p className="text-description--small">You must verify your account before you can enable two-factor authentication</p>
                                <img style={{width: "50%"}} className="oc7" src="https://discordapp.com/assets/cdea41ede63f61153e4a3c0531fa3873.svg" alt="two-auth"/>
                            </div>
                        </div>
    
                        <UserDetailStory userPayload={userPayloadInfo}/>
    
                    </div>
                    <div id="sidebar">
                        <div className="profile-user--about mb16 mt36 bs-md p20">
                        <h3 className="mb24">ABOUT</h3>
                            <ul>
                                <li className="mb8">
                                    <div className="d-flex align-items-center">
                                        <div className="grid--cell fc-black-350"><svg aria-hidden="true" className="svg-icon iconLocation" width="18" height="18" viewBox="0 0 18 18"><path d="M2 6.38C2 9.91 8.1 17.7 8.1 17.7c.22.29.58.29.8 0 0 0 6.1-7.8 6.1-11.32A6.44 6.44 0 0 0 8.5 0 6.44 6.44 0 0 0 2 6.38zm9.25.12a2.75 2.75 0 1 1-5.5 0 2.75 2.75 0 0 1 5.5 0z"></path></svg></div>
                                        <div className="grid--cell fl1">&nbsp; Vietnam</div>
                                    </div>
                                </li>
                                <li className="mb8">
                                    <div className="d-flex align-items-center">
                                        <div className="grid--cell fc-black-350"><svg aria-hidden="true" className="svg-icon iconGitHub" width="18" height="18" viewBox="0 0 18 18"><path d="M9 1a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38l-.01-1.49c-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.42 7.42 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48l-.01 2.2c0 .21.15.46.55.38A8.01 8.01 0 0 0 9 1z"></path></svg></div>
                                        <div className="grid--cell fl1">&nbsp; Blackblue2712</div>
                                    </div>
                                </li>
                                <li className="mb8">
                                    <div className="d-flex align-items-center">
                                        <div className="grid--cell fc-black-350"><svg aria-hidden="true" className="svg-icon iconHistory" width="19" height="18" viewBox="0 0 19 18"><path d="M3 9a8 8 0 1 1 3.73 6.77L8.2 14.3A6 6 0 1 0 5 9l3.01-.01-4 4-4-4h3L3 9zm7-4h1.01L11 9.36l3.22 2.1-.6.93L10 10V5z"></path></svg></div>
                                        <div className="grid--cell fl1">&nbsp; Member for 5 months</div>
                                    </div>
                                </li>
                                <li className="mb8">
                                    <div className="d-flex align-items-center">
                                        <div className="grid--cell fc-black-350"><svg aria-hidden="true" className="svg-icon iconEye" width="18" height="18" viewBox="0 0 18 18"><path d="M9.06 3C4 3 1 9 1 9s3 6 8.06 6C14 15 17 9 17 9s-3-6-7.94-6zM9 13a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 0 0 2-2 2 2 0 0 0-2-2 2 2 0 0 0-2 2 2 2 0 0 0 2 2z"></path></svg></div>
                                        <div className="grid--cell fl1">&nbsp; 14 profile views</div>
                                    </div>
                                </li>
                                <li className="mb8">
                                    <div className="d-flex align-items-center">
                                        <div className="grid--cell fc-black-350"><svg aria-hidden="true" className="svg-icon iconClock" width="18" height="18" viewBox="0 0 18 18"><path d="M9 17A8 8 0 1 1 9 1a8 8 0 0 1 0 16zm0-2A6 6 0 1 0 9 3a6 6 0 0 0 0 12zM8 5h1.01L9 9.36l3.22 2.1-.6.93L8 10V5z"></path></svg></div>
                                        <div className="grid--cell fl1">&nbsp; Last seen 2mins ago</div>
                                    </div>
                                </li>
                                <li className="mb8">
                                    <div className="d-flex align-items-center">
                                        <div className="grid--cell fc-black-350"><svg aria-hidden="true" className="svg-icon iconCalendar" width="18" height="18" viewBox="0 0 18 18"><path d="M14 2h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2h1V0h2v2h6V0h2v2zM3 6v9h12V6H3zm2 2h2v2H5V8zm0 3h2v2H5v-2zm3 0h2v2H8v-2zm3 0h2v2h-2v-2zm0-3h2v2h-2V8zM8 8h2v2H8V8z"></path></svg></div>
                                        <div className="grid--cell fl1">&nbsp; Visited 56 days, 6 consecutive</div>
                                    </div>
                                </li>
                                
                            </ul>
                        </div>
    
                        <div className="profile-user--about mb16 mt36 bs-md p20">
                            <h3 className="mb24">LANGUAGE</h3>
                            <ul>
                                <li className="mb12">
                                    <div className="d-flex align-items-center">
                                        <img src="https://discordapp.com/assets/b1309f8892f138383d8b0b6ff8e23463.png" width="18" alt="vi"/>
                                        <div className="grid--cell fl1">&nbsp; Vietnamese</div>
                                    </div>
                                </li>
                                <li className="mb12">
                                    <div className="d-flex align-items-center">
                                        <img src="https://discordapp.com/assets/e6d6b255259ac878d00819a9555072ad.png" width="18" alt="eng-us"/>
                                        <div className="grid--cell fl1">&nbsp; English-Us</div>
                                    </div>
                                </li>
                                <li className="">
                                    <div className="d-flex align-items-center">
                                        <img src="https://discordapp.com/assets/f23c5c28c4429691f7c54af93876d661.png" width="18" alt="japanese"/>
                                        <div className="grid--cell fl1">&nbsp; Japanese</div>
                                    </div>
                                </li>
                                
                            </ul>
                        </div>
    
                        <div className="profile-user--about mb16 mt36 bs-md p20">
                            <h3 className="mb24">BASIC SETTING</h3>
                            <ul>
                                <li className="mb12">
                                    <div className="theme-switch-wrapper d-flex align-items-center">
                                        <label className="theme-switch" htmlFor="darkmode">
                                            <input type="checkbox" id="darkmode" />
                                            <div className="slider round"></div>
                                    </label>
                                    &nbsp; <p className="ml-auto">DARK MODE</p>
                                    </div>
                                </li>
                                
                            </ul>
                        </div>

                        <div className="profile-user--about mb16 mt36 bs-md p20">
                            <h3 className="mb24">YOUR QUESTIONS</h3>
                            <ul>
                                <li className="mb12">
                                    {
                                        questions.map( (q, i) => {
                                            return (
                                                <p key={i} id={`onRemoveQuestion-${q.id}`}>
                                                    <img
                                                        width="15" height="15" style={{cursor: "pointer"}} src={DeleteIcon} alt="delete-icon"
                                                        id={`img-delete-ques-${q.id}`}
                                                        onClick={this.handleDeleteYourQuestion(q.id, q.title)}
                                                    />
                                                    &nbsp;
                                                    <Link className="text-54b8ff" to={`/questions/ask/edit/${q.id}`}>{q.title}</Link>
                                                </p>
                                            )
                                        })
                                    }
                                </li>
                                
                            </ul>
                        </div>

                        <div className="profile-user--about mb16 mt36 bs-md p20">
                            <h3 className="mb24">YOUR BLOGS</h3>
                            <ul>
                                <li className="mb12">
                                    {
                                        blogs.map( (blog, i) => {
                                            return (
                                                <p key={i} id={`onRemoveBlog-${blog.id}`}>
                                                    <img
                                                        width="15" height="15" style={{cursor: "pointer"}} src={DeleteIcon} alt="delete-icon"
                                                        id={`img-delete-${blog.id}`}
                                                        onClick={this.handleDeleteBlog(blog.id, blog.title)}
                                                    />
                                                    &nbsp;
                                                    <Link className="text-54b8ff" to={`/blogs/edit/${blog.id}`}>{blog.title}</Link>
                                                </p>
                                            )
                                        })
                                    }
                                </li>
                                
                            </ul>
                        </div>
                        
                    </div>
                </div>
                <div className="clear-fix"></div>
            </div>
        )
    }
}

export default UserDetail;

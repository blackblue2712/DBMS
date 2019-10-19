import React, { Component } from 'react';
import './QuestionsComponent.css';
import Post from './Post';
import Code from 'react-code-prettify';
import UserInfo from '../users/UserInfo';
import Sidebar from '../components/Sidebar';
import AskAQuestion from '../components/AskAQuestion';
import Mde from '../editor/Mde';

const codeString2 = `
#overlay {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;

    background:black;
    background:rgba(0,0,0,0.8);

    filter:blur(4px);
    -o-filter:blur(4px);
    -ms-filter:blur(4px);
    -moz-filter:blur(4px);
    -webkit-filter:blur(4px);
}
`
class QuestionsComponent extends Component {
    render() {
        
        return (
            <div id="content">
                <div id="mainbar">

                    <div className="main-head">
                        <div className="grid d-flex align-items-centers mb16">
                            <h1 className="fs-headline1 mr-auto">How can I make a CSS glass/blur effect work for an overlay?</h1>
                            <div className="s-btn-group ml20">
                                <AskAQuestion />
                            </div>
                        </div>

                        <div className="d-flex algin-items-center f13 bc-black-2 bb pb8">
                            <div className="mb8 mr16">
                                <span className="fc-light mr2">Asked</span>
                                <time>4 years, 9 months ago</time>
                            </div>
                            <div className="mb8 mr16">
                                <span className="fc-light mr2">Asked</span>
                                <a href="?lastactivity" className="s-link s-link__inherit" title="2019-09-24 15:23:18Z">today</a>
                            </div>
                            <div className="mb8 mr16">
                                <span className="fc-light mr2">Viewed</span>        
                                185k times
                            </div>
                        </div>
                    </div>

                    <div id="questbar">
                        <div className="question" id="id-question">
                            <Post
                                voteCount="7"
                                preString={codeString2}
                            />
                        </div>
                    </div>
                    
                    <div id="answers" className="mt24">
                        <div className="answers-header">
                            <h2>7 Answers</h2>
                            
                        </div>

                        <div className="answer mt16 mb16">
                            <div className="post-layout d-flex">
                                <div className="votecell post-layout--left mr24">
                                    <div className="js-voting">
                                        <button className="js-vote--up">
                                            <svg aria-hidden="true" className="svg-icon m0 iconArrowUpLg" width="36" height="36" viewBox="0 0 36 36"><path d="M2 26h32L18 10 2 26z"></path></svg>
                                        </button>
                                        <div className="vote-count">{499}</div>
                                        <button className="js-vote--down">
                                            <svg aria-hidden="true" className="svg-icon m0 iconArrowDownLg" width="36" height="36" viewBox="0 0 36 36"><path d="M2 10h32L18 26 2 10z"></path></svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="votecell post-layout--right">
                                    <div className="post-text">
                                        <p>
                                            For a more simple and up to date answer:
                                        </p>
                                        <Code
                                            codeString={`backdrop-filter: blur(6px);`} 
                                            language="css" 
                                        />
                                        <p>Note <a href="https://caniuse.com/#feat=css-backdrop-filter" rel="nofollow noreferrer">browser support</a> is not perfect but in most cases a blur would be non essential.</p>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <UserInfo
                                            username={Math.random().toString(36).substring(7)}
                                            userLocation="Bratislava, Slovakia"
                                            userImage={`https://api.adorable.io/avatars/55/${Date.now() + Math.random(1 * 10)}`}
                                            userReputation="1,110"
                                        />
                                    </div>
                                
                                </div>
                            </div>
                        </div>

                    </div>

                    <div id="youranswer">
                        <div className="answers-header">
                            <h2 className="mb24">Your answer</h2>
                            <Mde />
                            <button className="s-btn s-btn__outline s-btn__primary mt24">Post your answer</button>
                        </div>
                    </div>
                </div>

                <Sidebar />
                <div className="clear-fix"></div>
            </div>
        )
    }
}

export default QuestionsComponent;
import React from 'react';
import UserInfo from '../users/UserInfo';
import ReactMarkdown from 'react-markdown';
import CodeBlock from '../editor/CodeBlock';
import { isAuthenticated } from '../../controllers/userController';
import { voteAnswerUp } from '../../controllers/voteController';

class AnswerItem extends React.Component {
    constructor() {
        super();
        this.state = {
            count: 0,
            isActive: ""
        }
    }

    componentDidMount() {
        let voted = this.props.data.votes.split(" ").filter( t => t !== "");
        let userId = isAuthenticated().user._id;
        let check = voted.indexOf(String(userId))

        if(check !== - 1) {
            this.setState( {isActive: "active"} );
        }

        this.setState( {count: voted.length} );

    }

    handleAnswerVoteUp = () => {
        let ansId = this.props.data.id;
        let userId = isAuthenticated().user._id;
        let token = isAuthenticated().token;
        voteAnswerUp(ansId, userId, token)
        .then( res => {
            console.log(res);
            if(res.message === "Voted") {
                this.setState( {count: res.votesLength, isActive: "active"} );
            } else if(res.message === "unVote") {
                this.setState( {count: res.votesLength, isActive: ""} );
            }

        })
    }
    
    render() {
        const { count, isActive } = this.state;
        const ans = this.props.data;   
        return (
            <div className="answer mt16 mb16">
                <div className="post-layout d-flex">
                    <div className="votecell post-layout--left mr24">
                        <div className="js-voting">
                            <button
                                className="js-vote--up"
                                onClick={this.handleAnswerVoteUp}
                            >
                                <svg aria-hidden="true" className={`svg-icon m0 iconArrowUpLg ${isActive}`} width="36" height="36" viewBox="0 0 36 36"><path d="M2 26h32L18 10 2 26z"></path></svg>
                            </button>
                            <div className="vote-count">{count}</div>
                            <button className="js-vote--down">
                                <svg aria-hidden="true" className="svg-icon m0 iconArrowDownLg" width="36" height="36" viewBox="0 0 36 36"><path d="M2 10h32L18 26 2 10z"></path></svg>
                            </button>
                        </div>
                    </div>
                    <div className="votecell post-layout--right">
                        <div className="post-text md-content">
                            <ReactMarkdown source={ans.body} renderers={{ code: CodeBlock }} />
                        </div>
                        <div className="d-flex justify-content-end">
                            <UserInfo
                                username={ans.email}
                                // userLocation="Bratislava, Slovakia"
                                userImage={ans.photo}
                                userFullname={ans.fullname}
                                userId={ans.owner}
                            />
                        </div>
                    
                    </div>
                </div>
            </div>
        )
    }

}   

export default AnswerItem;
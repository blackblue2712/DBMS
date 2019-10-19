import React from 'react'
import Mde from '../editor/Mde';
import { isAuthenticated } from '../../controllers/userController';
import { withRouter } from 'react-router-dom';
import { postAnswer } from '../../controllers/askController' ;
import Notify from '../components/Notify';


class YourAnswer extends React.Component {
    constructor() {
        super();
        this.state = {
            message: ""
        }
    }

    handlePostAnswer = () => {
        let editor = document.querySelector("textarea.mde-text");
        if(editor && editor.value.length > 0) {
            let body = editor.value;
            let userId = isAuthenticated().user._id;
            let {email, photo, fullname} = isAuthenticated().user;
            let token  = isAuthenticated().token;
            let quesId = this.props.match.params.quesId;

            postAnswer( {body, userId, quesId, email, photo, fullname}, token )
            .then( res => {
                console.log("***",res)
                this.setState( {message: res.message} );
                if(res.message === "Your answer added") {
                    editor.value = "";
                    let email = isAuthenticated().user.email;
                    let photo = isAuthenticated().user.photo;
                    this.props.addAnswer({
                        body,
                        votes: '[]',
                        owner: {
                            _id: userId,
                            email,
                            photo,
                            votes: '[]'
                        }
                    })
                }
            })

        } else {
            alert("Please enter your answer and turn editor to write mode");
        }
    }

    clearMess = () => {
        this.setState( {message: ""} );
    }

    render() {
        let { message } = this.state;
        return (
            <div id="youranswer">
                <Notify />  
                {message !== "" &&  <Notify class="on" text={message} clearMess={this.clearMess} />}
                <div className="answers-header">
                    <h2 className="mb24">Your answer</h2>
                    <Mde />
                    <button
                        className="s-btn s-btn__outline s-btn__primary mt24"
                        onClick={this.handlePostAnswer}
                    >Post your answer</button>
                </div>
            </div>
        )
    }

}

export default withRouter(YourAnswer);
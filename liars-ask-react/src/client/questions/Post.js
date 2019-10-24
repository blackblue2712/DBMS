import React, { Component } from 'react';
import Tags from '../components/Tags';
import ReactMarkdown from 'react-markdown';
import CodeBlock from '../editor/CodeBlock';
import Code from 'react-code-prettify';
class Post extends Component {
    constructor() {
        super();
        this.state = {
            ques: {}
        }
    }

    shouldComponentUpdate(prevProps, prevState) {
        return prevProps.data.id !== this.state.ques.id
    }

    componentDidUpdate() {
        this.setState( {ques: this.props.data})
    }

    render() {
        let { ques } = this.state;
        return (
            <div className="post-layout d-flex">
                <div className="votecell post-layout--left mr24">
                    <div className="js-voting">
                        <button className="js-vote--up">
                            <svg aria-hidden="true" className="svg-icon m0 iconArrowUpLg" width="36" height="36" viewBox="0 0 36 36"><path d="M2 26h32L18 10 2 26z"></path></svg>
                        </button>
                        <div className="vote-count">{ques.votes}</div>
                        <button className="js-vote--down">
                            <svg aria-hidden="true" className="svg-icon m0 iconArrowDownLg" width="36" height="36" viewBox="0 0 36 36"><path d="M2 10h32L18 26 2 10z"></path></svg>
                        </button>
                    </div>
                </div>
                <div className="votecell post-layout--right">
                    <div className="post-text md-content">
                        <ReactMarkdown source={ques.body} renderers={{ code: CodeBlock }} />
                    </div>
                    {
                        ques.anonymousTags && JSON.parse(ques.anonymousTags).map( (tag,i) => {
                            return <Tags key={i} name={tag}/>
                        })
                    }
                </div>
                
            </div>
        )
    }
}

export default Post;
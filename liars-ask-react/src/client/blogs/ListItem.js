import React, { Component } from 'react';
import Tags from '../components/Tags';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

class ListItem extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps != this.props;
    }

    render() {
        const { title, body, tags, id } = this.props;
        return (
            <div className={`item-list narrow d-flex`}>
                <div className="cp d-flex">
                    <div className="votes">
                        <div className="mini-counts">
                            <span title="0 votes">0</span>
                        </div>
                        <div>votes</div>
                    </div>
                    <div className="status">
                        <div className="mini-counts">
                            <span title="0 votes">0</span>
                        </div>
                        <div>answers</div>
                    </div>
                    <div className="views">
                        <div className="mini-counts">
                            <span title="0 votes">0</span>
                        </div>
                        <div>views</div>
                    </div>
                </div>
                <div className="list-sumary w-100">
                    <h3>
                        <Link to={`/blogs/${id}`} className="hyper-link">{title}</Link>
                    </h3>
                    <div className="list-body--text mb4" style={{}}>
                        {
                            body.length > 100 ? body.slice(0, 100) + "..." : body
                        }
                    </div>
                    {
                        tags && tags.map( (t, i) => {
                            return <Tags key={i} name={t.name}/>
                        })
                    }
                    {/* <div className="started ml-auto" dir="ltr">
                        <a href="#relativetime">asked 44 min ago</a>
                    </div> */}
                    <div className="clear-fix"></div>
                </div>
            </div>
        )
    }
}

export default ListItem;
import React, { Component } from 'react';
import Tags from '../components/Tags';
import Important from '../../images/important.png';
import { Link } from 'react-router-dom';

class ListItem extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps != this.props;
    }

    render() {
        const { title, body, isImportant, tags, id } = this.props;
        return (
            <div className={`item-list narrow d-flex ${isImportant}`}>
                {
                    isImportant && <img className="important-message" src={Important} alt="important message"/>
                }
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
                        <Link to={`/announcements/${id}`} className="hyper-link">{title}</Link>
                    </h3>
                    <div className="list-body--text mb4">
                        {
                            body.length > 200 ? body.slice(0, 200) + "..." : body
                        }
                    </div>
                    {
                        tags && JSON.parse(tags).map( (t, i) => {
                            return <Tags key={i} name={t}/>
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
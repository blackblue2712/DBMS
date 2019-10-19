import React, { Component } from 'react';
import Tags from './Tags';

class ListItem extends Component {
    render() {
        return (
            <div className="item-list narrow d-flex align-items-center">
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
                        <a href="#q" className="hyper-link">How to convert one-dimensional lstm into three-dimensional one</a>
                    </h3>
                    <Tags name="flutter" close={false}/>
                    <Tags name="dart" close={false}/>
                    <Tags name="go lang" close={false}/>
                    <div className="started ml-auto" dir="ltr">
                        <a href="#relativetime">asked 44 min ago</a>
                    </div>
                    <div className="clear-fix"></div>
                </div>
            </div>
        )
    }
}

export default ListItem;
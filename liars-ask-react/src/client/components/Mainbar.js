import React, { Component } from 'react';
import HeadMainbar from './HeadMainbar';
import './Mainbar.css';
import ListWrapper from './ListWrapper';

class Mainbar extends Component {
    render() {
        return (
            <div id="mainbar">
                <HeadMainbar />
                <ListWrapper />
            </div>
        )
    }
}

export default Mainbar;
import React from 'react';
import ListItem from './ListItem';
import './ListWrapper.css';

const ListWrapper = props => {
    return (
        <div id="list-wrapper">
            <div className="mini-list">
                <ListItem /> 
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
            </div>
        </div>
    )
}

export default ListWrapper;
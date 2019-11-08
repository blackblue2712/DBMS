import React, {useState, useEffect} from 'react';
import ListItem from './ListItem';

const ListWrapper = props => {
    const [acms, setAcms] = useState([]);

    useEffect( () => {
        setAcms(props.data);
    }, [props.data]);

    return (
        <div id="list-wrapper">
            <div className="mini-list">
                {
                    acms && acms.map( (acm, i) => {
                        return <ListItem key={i} title={acm.title} body={acm.body} tags={acm.tags} isImportant={acm.isImportant} id={acm.id} /> 
                    })
                }
            </div>
        </div>
    )
}

export default ListWrapper;
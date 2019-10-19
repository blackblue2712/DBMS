import React, {useState, useEffect} from 'react';
import ListItem from './ListItem';

const ListWrapper = props => {
    const [questions, setQues] = useState([]);

    useEffect( () => {
        setQues(props.data);
    })

    return (
        <div id="list-wrapper">
            <div className="mini-list">
                {
                    questions && questions.map( (ques, i) => {
                        return <ListItem key={i} title={ques.title} body={ques.body} tags={ques.anonymousTags} id={ques._id} answers={ques.answers.length} /> 
                    })
                }
            </div>
        </div>
    )
}

export default ListWrapper;
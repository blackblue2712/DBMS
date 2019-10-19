import React, {useState, useEffect} from 'react';
import ListItem from './ListItem';

const ListWrapper = props => {
    const [blogs, setBlogs] = useState([]);

    useEffect( () => {
        setBlogs(props.data);
    })

    return (
        <div id="list-wrapper">
            <div className="mini-list">
                {
                    blogs && blogs.map( (blog, i) => {
                        return <ListItem key={i} title={blog.title} body={blog.body} tags={blog.anonymousTags} id={blog._id} /> 
                    })
                }
            </div>
        </div>
    )
}

export default ListWrapper;
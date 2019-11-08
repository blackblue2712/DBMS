import React, {useState, useEffect} from 'react';
import SidebarWidgetItem from './SidebarWidgetItem';
import { getBlogs } from '../../controllers/blogController';

const SidebarWidget = props => {
    let [blogs, setBlogs] = useState([]);

    useEffect( () => {
        getBlogs()
        .then( res => {
            setBlogs(res[0]);
        })
    }, [blogs.length]);

    return (
        <>
            {
                blogs.map( (blog, i) => {
                    return <SidebarWidgetItem
                        key={i}
                        classIcon=""
                        widgetContent={blog.title}
                        id={blog.id}
                    />
                })
            }
            
            {/*<SidebarWidgetItem classIcon="fav-liarsflow"
                widgetContent="2020 Developer Survey: any topic suggestions?"
            /> */}
        </>
    )
}

export default SidebarWidget;
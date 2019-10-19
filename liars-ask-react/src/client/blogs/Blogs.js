import React from 'react';
import { Link } from 'react-router-dom';
import ListWrapper from './ListWrapper';
import { getAllBlogs } from '../../controllers/blogController';


class Blogs extends React.Component {
    constructor() {
        super();
        this.state = {
            blogs: []
        }
    }

    componentDidMount() {
        getAllBlogs()
        .then( res => {
            this.setState( {blogs: res} )
        })
    }

    render() {
        const { blogs } = this.state;
        return (
            <div id="content">
                <div className="main-head">
                    {/* <Notify />  
                    {message !== "" &&  <Notify class="on" text={message} clearMess={this.clearMess} />} */}
                    <div className="grid d-flex align-items-centers mb16">
                        <h1 className="fs-headline1 mr-auto">Blogs</h1>
                        <Link to="/blogs/write/new" className="s-btn s-btn__outline s-btn__primary">Wtire blog</Link>
                    </div>
                    <p className="mb24 f13 fw350">Write blog about whatever you want to share with everyone &lt;3</p>
                </div>
                <ListWrapper data={blogs}/>
                <div className="clear-fix"></div>
            </div>
        )
    }
}

export default Blogs;
import React from 'react';
import Sidebar from '../components/Sidebar';
import { getAnnouncements } from '../../controllers/announcementController';
import Notify from '../components/Notify';
import ListWrapper from './ListWrapper';
// const [acms, setAcms] = useState([]);
// const [showNotify, setShowNotify] = useState("");

// useEffect( async () => {
//     const data = await getAnnouncements();
//     if(data.payload) {
//         setAcms(data.payload);
//     }
//     setShowNotify(data.message);
// });

class Announcement extends React.Component {
    constructor() {
        super();
        this.state = {
            acms: [],
            tags: [],
            message: ""
        }
    }

    clearMess = () => {
        this.setState( {message: ""} );
    }

    componentDidMount() {
        getAnnouncements()
        .then( res => {
            if(res.payload) {
                this.setState( {acms: res.payload, tags: res.tags, message: res.message} );
            } else {
                this.setState( {message: res.message} );
            }
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.acms !== this.state.acms;
    }

    render() {
        const { message, acms, tags } = this.state;
        acms.map( acm => {
            acm.tags = [];
            tags.map( tag => {
                if(tag.typeId === acm.id) acm.tags.push(tag)
            })
        })
        return (
            <div id="content">
                <div id="mainbar">
                    <div className="main-head">
                        <Notify />  
                        {message !== "" &&  <Notify class="on" text={message} clearMess={this.clearMess} />}
                        <div className="grid d-flex align-items-centers mb16">
                            <h1 className="fs-headline1 mr-auto">What news?</h1>
                        </div>
                        <p className="mb24 f13 fw350"></p>
                    </div>
    
                    <ListWrapper data={acms}/>

                    <div className="clear-fix"></div>
                    <div className="nearfooter" style={{padding: "40px 0px"}}>
                        <p>
                            Looking for more? Browse 
                            <a style={{ color: "#3af" }} href="#a"> the complete list of questions</a>
                            , or
                            <a style={{ color: "#3af" }} href="#a"> popular tags </a>
                            .Help us answer 
                            <a style={{ color: "#3af" }} href="#a"> unanswered questions</a>
                            .
                        </p>
                    </div>
                </div>
                <Sidebar />
                <div className="clear-fix"></div>
            </div>
        )
    }
}

export default Announcement;
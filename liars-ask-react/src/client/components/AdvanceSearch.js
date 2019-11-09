import React, { Component } from 'react';
import Sidebar from '../components/Sidebar';
import Notify from '../components/Notify';
import { onAdvanceSearch } from '../../controllers/searchController';
import Highlight from './Highlight';

class AdvanceSearch extends Component {
    constructor() {
        super();
        this.state = {
            message: '',
            data: [],
            dataHL: [],
            category: "",
            query: ""
        }
    }

    componentDidMount() {

    }
    
    handleSearchAdvance = async () => {
        try {
            let category = document.getElementById("s-category").value;
            let tags = document.getElementById("s-tags").value;
            let query = document.getElementById("s-query").value;
            let dateFrom = document.getElementById("s-date-from").value;
            let dateTo = document.getElementById("s-date-to").value;

            let data = await onAdvanceSearch({category, tags, query, dateFrom, dateTo});
            console.log(data);
            if(data && !data.message) {
                // let HOLY_SHIT_I_HAVE_NO_IDEA_TO_NAME_THIS_VARIABLE = [];
                // data.resHL.map( d => {
                //     let wrap = document.createElement("span");
                //     wrap.innerHTML = d;
                //     HOLY_SHIT_I_HAVE_NO_IDEA_TO_NAME_THIS_VARIABLE.push(wrap)
                // })
                
                this.setState( { data, category: category === "questions" ? category + "/ask" : category, query } );
            }
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        let { message, data, category, query } = this.state;
        return (
            <div id="content">
                <div id="mainbar">
                    <div className="main-head">
                        <Notify />  
                        {message !== "" &&  <Notify class="on" text={message} clearMess={this.clearMess} />}
                        <div className="grid d-flex align-items-centers mb16">
                            <h1 className="fs-headline1 mr-auto">Advance Search</h1>
                        </div>
                        <p className="mb24 f13 fw350"></p>
                    </div>
    
                    <div id="advance-search-box" className="bg-white bar-sm bs-md p16 md-content w-100">
                        <div className="form-group">
                            <label htmlFor="s-category" className="d-block">Category</label>
                            <select name="s-category" id="s-category">
                                <option value="announcements">Announcements</option>
                                <option value="questions">Questions</option>
                                <option value="blogs">Blogs</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="s-tags">Tags</label>
                            <input type="text" id="s-tags" className="s-input s-input__search w-100"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="s-query">Query</label>
                            <input type="text" id="s-query" className="s-input s-input__search w-100"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="s-date-from">Date From</label>
                            <input type="date" id="s-date-from" className="s-input s-input__search w-100"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="s-date-to">Date To</label>
                            <input type="date" id="s-date-to" className="s-input s-input__search w-100"/>
                        </div>

                        <div className="form-group mt24">
                            <button
                                className="s-btn btn-sm btn-outlined colorGreen"
                                onClick={this.handleSearchAdvance}
                            >Search</button>
                        </div>
                    </div>

                    <div className="bg-white bar-sm bs-md p16 md-content w-100 mt24">
                        {
                            data.map( (d, i) => {
                                return (
                                    <div className="list-sumary w-100" key={i}>
                                        <h3>
                                            <a className="hyper-link" target="_blank" href={`/${category}/${d.id}`}>
                                                {
                                                    // d.title.replace(query, <b>{query}</b>)
                                                    "- " + d.title
                                                }
                                            </a>
                                        </h3>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className="clear-fix"></div>
                    {/* <div className="nearfooter" style={{padding: "40px 0px"}}>
                        <p>
                            Looking for more? Browse 
                            <a style={{ color: "#3af" }} href="#a"> the complete list of questions</a>
                            , or
                            <a style={{ color: "#3af" }} href="#a"> popular tags </a>
                            .Help us answer 
                            <a style={{ color: "#3af" }} href="#a"> unanswered questions</a>
                            .
                        </p>
                    </div> */}
                </div>
                <Sidebar />
                <div className="clear-fix"></div>
            </div>
        )
    }
}

export default AdvanceSearch;
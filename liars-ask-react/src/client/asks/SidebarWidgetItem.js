import React, { Component } from 'react';
import ButtonGuild from './ButtonGuild';

class SidebarWidgetItem extends Component {
    render() {
        return (
                <div className="s-sidebar-widget--content s-sidebar-widget--items">
                    <div className="d-flex align-items-center">
                        {/* <div className={`widget-favicon ${this.props.classIcon}`}></div> */}
                        <div className="widget-content">
                            {this.props.widgetContent}
                            <ButtonGuild 
                                index={0}
                                key={0}
                                icon={[<img key={0} src="https://cdn.sstatic.net/Img/list-1.svg?v=e8dd475ba207" width="16" height="16" alt="1." />]}
                                title={'Summarize the problem'}
                                child={[<ul key={0} className="ml24 mb0"><li><p>Include details about your goal</p></li><li><p>Describe expected and actual results</p></li><li><p className="mb0">Include any error messages</p></li></ul>]}
                            />
                            <ButtonGuild 
                                key={1}
                                index={1}
                                icon={[<img key={1} src="https://cdn.sstatic.net/Img/list-2.svg?v=9382fc2c3631" width="16" height="16" alt="2."/>]}
                                title={'Describe what you\'re tried'}
                                child={[<p key={1}>Show what you’ve tried and tell us what you found (on this site or elsewhere) and why it didn’t meet your needs. You can get better answers when you provide research.</p>]}
                            />
                            <ButtonGuild
                                key={2}
                                index={2} 
                                icon={[<img key={2} src="https://cdn.sstatic.net/Img/list-3.svg?v=323a95564232" width="16" height="16" alt="3."/>]}
                                title={'Show some code'}
                                child={[<p key={2}>When appropriate, share the minimum amount of code others need to reproduce your problem (also called a minimum, reproducible example)</p>]}
                            />
                        </div>
                    </div>
                </div>
        )
    }
}

export default SidebarWidgetItem;
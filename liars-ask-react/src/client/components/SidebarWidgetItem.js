import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SidebarWidgetItem extends Component {
    render() {
        return (
                <div className="s-sidebar-widget--content s-sidebar-widget--items">
                    <div className="d-flex align-items-center">
                        <div className={`widget-favicon ${this.props.classIcon}`}></div>
                        <div className="widget-content">
                            <Link to={`/blogs/${this.props.id}`}>{this.props.widgetContent}</Link>
                        </div>
                    </div>
                </div>
        )
    }
}

export default SidebarWidgetItem;
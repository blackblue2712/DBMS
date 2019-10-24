import React from 'react';
import { Switch, withRouter } from "react-router-dom";
import RouteClient from './client/RouteClient';
import RouteAdmin from './admin/RouteAdmin';
import Auth from './client/auth/Auth';

class MainRouter extends React.Component {
    render() {
        let isAdminPage = this.props.location.pathname.split("/")[1];
        if(isAdminPage === "auth") {
            return <Switch>
                <>
                   <Auth />
                </>
            </Switch>
        } else if (isAdminPage === "admin"){
            return <RouteAdmin />
        }
        else {
            return <RouteClient />
        }
    }
}

export default withRouter(MainRouter);
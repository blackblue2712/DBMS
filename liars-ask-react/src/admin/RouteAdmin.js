import React from 'react';
import './style.css';
import Header from './components/Header';
import Footer from './components/Footer'
import Content from './components/Content';
import LeftSidenar from './components/LeftSidebar';
import Tags from './tags/Tags';
import AddTag from './tags/AddTag';
import UsersComponent from './users/UsersComponent';
import AddUser from './users/AddUser';
import Announcements from './announcements/Announcements';
import AddAnnouncement from './announcements/AddAnnouncement';
import EditAcm from './announcements/EditAcm';
import PrivateRouteAdmin from './PrivateRouteAdmin';
import { Switch } from 'react-router-dom';
import NotFound from '../client/components/NotFound';

const RouteAdmin = props => {
    return <>
        <div className="container" style={{marginTop: "50px"}}>
            <LeftSidenar />
            <Header />
            <div id="content">
                <Switch>
                    <PrivateRouteAdmin exact path="/admin" component={Content}></PrivateRouteAdmin>
                    <PrivateRouteAdmin exact path="/admin/tags" component={Tags}></PrivateRouteAdmin>
                    <PrivateRouteAdmin exact path="/admin/tags/new" component={AddTag}></PrivateRouteAdmin>
                    <PrivateRouteAdmin exact path="/admin/users" component={UsersComponent}></PrivateRouteAdmin>
                    <PrivateRouteAdmin exact path="/admin/users/new" component={AddUser}></PrivateRouteAdmin>
                    <PrivateRouteAdmin exact path="/admin/announcements" component={Announcements}></PrivateRouteAdmin>
                    <PrivateRouteAdmin exact path="/admin/announcements/new" component={AddAnnouncement}></PrivateRouteAdmin>
                    <PrivateRouteAdmin exact path="/admin/announcements/edit/:acmId" component={EditAcm}></PrivateRouteAdmin>
                    
                    <PrivateRouteAdmin component={NotFound} />
                </Switch>
            </div>
        </div>

        <Footer />
    </>
}

export default RouteAdmin;
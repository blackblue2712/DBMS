import React, {useState, useEffect} from 'react';
import { Route } from 'react-router-dom';
import { isAuthenticated } from '../controllers/userController';
import { isAdmin } from '../controllers/authController';

const PrivateRouteAdmin = ({ component: Component, ...rest }) => {
    
    const [open, setOpen] = useState(false);

    useEffect( () => {
        async function fetchData () {
            let check = await isAdmin(isAuthenticated().token);
            if(check.message === "admin") {
                setOpen(true);
            } else if(check.message === "Permission deny") {
                window.location = "/404";
            }
        }
        fetchData();
        

    }, [])

    return (
        open === true ? 
        <Route
            {...rest}
            render={ props =>
                (
                    <Component {...props} userPayload={isAuthenticated()} />
                )
            }
        />
        : <div></div>
    );
}

export default PrivateRouteAdmin;
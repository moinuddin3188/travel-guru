import React, { useContext } from 'react';
import { UserContext } from '../../App';
import { Route, Redirect } from 'react-router-dom';

const PrivetRoute = ({ children, ...rest }) => {

    const [user, setUser] = useContext(UserContext);

    return (
        <Route
            {...rest}
            render={({ location }) =>
                user.email ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
};

export default PrivetRoute;
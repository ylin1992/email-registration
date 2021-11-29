import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function LoginButton(props) {
    const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

    return (
        !isAuthenticated && !isLoading && (
            <button type="button" class={"login-btn btn "+props.btnClass} onClick= {() => loginWithRedirect() }>
                Login
            </button>
        )
    )
}

export default LoginButton

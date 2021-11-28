import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function LoginButton() {
    const { loginWithRedirect } = useAuth0();

    return (
        <button type="button" class="btn btn-primary" onClick= {() => loginWithRedirect() }>
            Login
        </button>
    )
}

export default LoginButton

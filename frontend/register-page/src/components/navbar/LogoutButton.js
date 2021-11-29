import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';

function LogoutButton() {
    const { logout, isAuthenticated, isLoading} = useAuth0();
    return (
        isAuthenticated && !isLoading && (
            <button type="button" class="logout-btn btn btn-outline-light" onClick={ () => logout() }>
                Logout
            </button>
        )
    )
}

export default LogoutButton

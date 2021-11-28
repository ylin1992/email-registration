import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
function SubscribeButton(props) {
    function subscribeButtonHandler() {
        console.log(props.id);
        console.log(props.isSubscribe)
        let data = new FormData();
        data.append('subscribed', props.isSubscribed);
        axios.patch('http://localhost:5000/users/'+props.id, {
            'subscribed': true
        }).then(response => {
            console.log(response.data);
            props.setIsSubscribe(data.subscribed);
        }).then( () => {
            window.location.href = window.location.origin;
        })
        .catch(error => {
            console.log(error);
        })
    }

    return (
            <div>
                <button onClick={subscribeButtonHandler} type="button" class="btn btn-success">
                    Subscribe
                </button>
            </div>
        )
}
export default SubscribeButton

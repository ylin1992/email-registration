import React from 'react'
import axios from 'axios';
import { DB_SERVER_HOST } from '../../config';


function SubscribeButton(props) {
    function subscribeButtonHandler() {
        let data = new FormData();

        data.append('subscribed', props.isSubscribed);
        axios.patch(DB_SERVER_HOST+'/users/'+props.id, {
            'subscribed': true
        }).then(response => {
            props.setIsSubscribe(data.subscribed);
        }).then( response => {
            console.log(props.user.sub);
            axios.get(DB_SERVER_HOST+'/welcome/'+props.user.sub)
            .then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error);
            })
        })
        
        .then( () => {
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

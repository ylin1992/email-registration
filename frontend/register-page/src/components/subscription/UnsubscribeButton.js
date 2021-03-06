import React from 'react'
import axios from 'axios';
import { DB_SERVER_HOST } from '../../config';


function UnsubscribeButton(props) {
    function UnsubscribeButtonHandler() {
        let data = new FormData();
        data.append('subscribed', props.isSubscribed);
        axios.patch(DB_SERVER_HOST+'/users/'+props.id, {
            'subscribed': false
        }).then(response => {
            props.setIsSubscribe(data.subscribed);
        }).then( response => {
            console.log(props.user.sub);
            axios.get(DB_SERVER_HOST+'/leave/'+props.user.sub)
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
                <button onClick={UnsubscribeButtonHandler} type="button" class="btn btn btn-dark">
                    Unsubscribe
                </button>
            </div>
    )

}

export default UnsubscribeButton

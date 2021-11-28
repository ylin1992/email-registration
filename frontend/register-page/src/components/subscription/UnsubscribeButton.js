import React from 'react'
import axios from 'axios';
function UnsubscribeButton(props) {
    function UnsubscribeButtonHandler() {
        console.log(props.id);
        console.log(props.isSubscribe)
        let data = new FormData();
        data.append('subscribed', props.isSubscribed);
        axios.patch('http://localhost:5000/users/'+props.id, {
            'subscribed': false
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
                <button onClick={UnsubscribeButtonHandler} type="button" class="btn btn btn-dark">
                    Unsubscribe
                </button>
            </div>
    )

}

export default UnsubscribeButton

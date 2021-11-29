import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import axios from 'axios';
import SubscribeButton from './SubscribeButton';
import UnsubscribeButton from './UnsubscribeButton';

function SubscriptionGroup() {
    const [subscribeText, setSubscribeText] = useState("");
    const [isSubscribe, setIsSubscribe] = useState(false);
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [userIdInDB, setUserIdInDB] = useState(0);
    if (isAuthenticated) {
        axios.get('http://localhost:5000/users/'+user.email)
                .then(response => {
                    setUserIdInDB(response.data.id);
                    let isSubscribed = response.data.subscribed;
                    if (isSubscribed) {
                        setSubscribeText("You've already subscribed, let's wait together!")
                        setIsSubscribe(true);
                    } else {
                        setSubscribeText("Wanna subscribe for a feed? Not a cost!")
                        setIsSubscribe(false);
                    }
                    console.log(subscribeText)
                })
    }
    console.log("autheticated:" + isAuthenticated);
    console.log("isLoading:" + isLoading);
    return (
        !isLoading && isAuthenticated && (
            <div>
                <p>{subscribeText}</p>
                <p>{userIdInDB}</p>
                {!isSubscribe ? (
                    <SubscribeButton isSubscribe={isSubscribe} id={userIdInDB} setIsSubscribe={setIsSubscribe}/>
                ) : (
                    <UnsubscribeButton isSubscribe={isSubscribe} id={userIdInDB} setIsSubscribe={setIsSubscribe}/>
                )}

            </div>
        )
    )
}

export default SubscriptionGroup

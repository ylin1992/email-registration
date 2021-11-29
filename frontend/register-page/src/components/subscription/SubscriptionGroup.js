import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import axios from 'axios';
import SubscribeButton from './SubscribeButton';
import UnsubscribeButton from './UnsubscribeButton';
import LoginButton from '../navbar/LoginButton';

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
                        setSubscribeText("You've already subscribed, grab a cup of coffee and enjoy the feeds!")
                        setIsSubscribe(true);
                    } else {
                        setSubscribeText("Wanna subscribe for a feed? Not a cost!")
                        setIsSubscribe(false);
                    }
                    console.log(subscribeText)
                })
    }

    if (isLoading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }

    return (
        (!isLoading && isAuthenticated) ? (
            <div className="subscription-section">
                <h2>Hi! {user.name}</h2>
                <p>{subscribeText}</p>
                {!isSubscribe ? (
                    <SubscribeButton isSubscribe={isSubscribe} id={userIdInDB} setIsSubscribe={setIsSubscribe}/>
                ) : (
                    <UnsubscribeButton isSubscribe={isSubscribe} id={userIdInDB} setIsSubscribe={setIsSubscribe}/>
                )}
            </div>
        ) : (
            <div className="subscription-section">
                <h1>Login first</h1>
                <LoginButton btnClass="btn-outline-dark"/>
            </div>
        )
    )
}

export default SubscriptionGroup

import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import axios from 'axios';
import SubscribeButton from './SubscribeButton';
import UnsubscribeButton from './UnsubscribeButton';
import LoginButton from '../navbar/LoginButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { DB_SERVER_HOST } from '../../config';

function SubscriptionGroup() {
    const [subscribeText, setSubscribeText] = useState("");
    const [isSubscribe, setIsSubscribe] = useState(false);
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [userIdInDB, setUserIdInDB] = useState(0);
    if (isAuthenticated) {

        axios.get(DB_SERVER_HOST+'/users/auth0/'+user.sub)
                .then(response => {
                    setUserIdInDB(response.data.user.id);
                    let isSubscribed = response.data.user.subscribed;
                    if (isSubscribed) {
                        setSubscribeText("You've already subscribed, grab a cup of coffee and enjoy the feeds!")
                        setIsSubscribe(true);
                    } else {
                        setSubscribeText("Wanna subscribe for a feed? Not a cost!")
                        setIsSubscribe(false);
                    }
                })
                .catch(error => {
                    if (error.response && error.response.status === 404) {
                        axios.post(DB_SERVER_HOST+'/users', {
                            "email": user.email,
                            "auth0_id": user.sub
                        }).then( response => {
                            setUserIdInDB(response.data.user.id);
                        }).catch( error => {
                            console.log(error);
                        })
                    }
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
                {isSubscribe && ( <CheckCircleIcon fontSize="large" style={{ color: "green" }}/> )}
                <p>{subscribeText}</p>
                {!isSubscribe ? (
                    <SubscribeButton isSubscribe={isSubscribe} id={userIdInDB} setIsSubscribe={setIsSubscribe} user={user}/>
                ) : (
                    <UnsubscribeButton isSubscribe={isSubscribe} id={userIdInDB} setIsSubscribe={setIsSubscribe} user={user}/>
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

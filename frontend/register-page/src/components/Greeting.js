import React from 'react'
import '../App.css';
import RefreshIcon from '@mui/icons-material/Refresh';
import appleScreenshot from '../static/img/apple-screenshot.png'

function Greeting() {
    return (
        <div className="greeting">
            <div>
                <h1><RefreshIcon sx={{ fontSize: 80 }}/>MacBook ProFresher!</h1>
            </div>
            <div className="container split">
                <div>
                    <h3>Getting tired with refreshing Apple's webpage?</h3>
                    <p>Subscribe and keep yourself updated on the latest status!</p>
                </div>
                <div>
                    <img src={appleScreenshot} alt="screenshot" />
                </div>
            </div>
        </div>

    )
}

export default Greeting

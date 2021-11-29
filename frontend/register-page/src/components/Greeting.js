import React from 'react'
import '../App.css';
import RefreshIcon from '@mui/icons-material/Refresh';
import appleScreenshot from '../static/img/apple-screenshot.png'

function Greeting() {
    return (
        <div className="greeting">
            <div className="container split">
                <div>
                    <h1><RefreshIcon sx={{ fontSize: 80 }}/>MacBook ProFresher!</h1>
                    <p>A 2021 MBP release monitoring service</p>
                    {/* <h3>Getting tired with refreshing Apple's webpage?</h3>
                    <p>Subscribe and keep yourself updated on the latest status!</p> */}
                </div>
                <div>
                    <img src={appleScreenshot} alt="screenshot" />
                </div>
            </div>
        </div>

    )
}

export default Greeting

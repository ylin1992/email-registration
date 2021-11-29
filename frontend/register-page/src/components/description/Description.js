import React from 'react'
import Steps from './Steps'
import step1Img from '../../static/img/step1.png'
import step2Img from '../../static/img/step2.png'

function Description() {
    return (
        <div>
            <h3>Getting tired with refreshing Apple's webpage?</h3>
            <p>Subscribe and make your life easier!</p>
            <div className="split-even">
                <Steps title="Step 1" description="Login and create an account" imgSrc={step1Img}/>
                <Steps title="Step 2" description="Hit the subscribe button" imgSrc={step2Img}/>
                <Steps title="Step 3" description="Login and create an account" imgSrc={step1Img}/>
            </div>
        </div>
    )
}

export default Description

import React from 'react'
import Steps from './Steps'
import step1Img from '../../static/img/step1.png'
import step2Img from '../../static/img/step2.png'
import step3Img from '../../static/img/step3.png'

function Description() {
    return (
        <div>
            <h3>Getting tired with refreshing Apple's webpage?</h3>
            <p>Subscribe and make your life easier!</p>
            <div class="row">
                <div class="col-sm-4 d-flex align-items-stretch">
                    <Steps title="Step 1" description="Login and create an account" imgSrc={step1Img}/>
                </div>
                <div class="col-sm-4 d-flex align-items-stretch">
                    <Steps title="Step 2" description="Hit the subscribe button" imgSrc={step2Img}/>
                </div>
                <div class="col-sm-4 d-flex align-items-stretch">
                    <Steps title="Step 3" description="Binge watch the series you left behind and leave the rest to us" imgSrc={step3Img}/>
                </div>
            </div>
        </div>
    )
}

export default Description

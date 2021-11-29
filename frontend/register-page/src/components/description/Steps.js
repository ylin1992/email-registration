import React from 'react'
function Steps(props) {
    return (
        <div className="step-container">
            <h3>{props.title}</h3>
            <p>{props.description}</p>
            <img src={props.imgSrc} alt={props.title} />
        </div>
    )
}

export default Steps

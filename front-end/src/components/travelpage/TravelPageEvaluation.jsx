import React from 'react'
import '/src/components/travelpage/travelpageevaluation.css'

const TravelPageEvaluation = () => {
  return (
    <div className='travelpage-evaluation'>
        <p className='travelpage-evaluation-title'>Evaluation</p>
        <div className='stars-number-evaluation-container'>
            <div className='rating-number-evaluation-container'><p className='rating-evaluation'>4.1</p><p className='number-evaluation'>30 Evaluation</p></div>
            <div className='line-that-does-not-makesense'>
                <div className='stars-evaluation-meter'><span className='green-chkoupi'></span></div>
                <div className='stars-evaluation-meter'><span className='green-chkoupi'></span></div>
                <div className='stars-evaluation-meter'><span className='green-chkoupi'></span></div>
                <div className='stars-evaluation-meter'><span className='green-chkoupi'></span></div>
                <div className='stars-evaluation-meter'><span className='green-chkoupi'></span></div>
            </div>
        </div>
        <div className='feedback-evaluation-container'>
            <p className='feed-text-title'>Feedback</p>
            <div className='this-stuff-is-really-notnecessary'><p className='feedback-comment'><span className='button-left'></span>this opportunity is so good and not expensive i like it<span className='button-right'></span></p></div>
        </div>
        <div className='buttons-evaluation-container'>
            <img className='buttons-that-dont-do-shii' src="/src/SVGs/travelpage/like.svg" alt="" />
            <img className='buttons-that-dont-do-shii' src="/src/SVGs/travelpage/message.svg" alt="" />
            <img className='buttons-that-dont-do-shii' src="/src/SVGs/travelpage/Vector.svg" alt="" />
        </div>
    </div>
  )
}

export default TravelPageEvaluation
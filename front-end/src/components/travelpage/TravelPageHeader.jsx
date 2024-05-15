import React from 'react'
import "./travelpageheader.css"
import travelpageimages from "/src/images/travelpage/Travelpageheader/sahitmamaas.png"
const TravelPageHeader = () => {
  return (
    <div className='travelpageheader'>  
        <img src="/src/SVGs/travelpage/Group 33974.svg" alt="" className="i-dont-know-whatthehellisthat" />
        <img className="image-travelpageheader"src="/src/images/travelpage/Travelpageheader/sahitmamaas.png" alt="" />    
        <div className='information-container'>
            <div className='Title-deadline-container'>
            <h1>Japan: Contemplate The Beauty Of Fuji</h1>
            <p>Deadline 04-05-2024</p>
            </div>
            <div className='evaluation-container'>
                <div className='Rating-evaluation'>
                  <div className='star-chkoupi'>
                  <p className='evaluation-container-header'>3.7 <img src="/src/images/travelpage/Travelpageheader/Vector.png" /></p></div> 
                  <div className='comments-evaluation-container'>
                    <p>Medium</p>
                  </div>
                </div>
                <div className='Evaluatoin-evaluation'><p className='evaluation-container-header2' >3</p><div className='comments-evaluation-container'><p>Evaluations</p></div></div>
                <div className='time-comments-evaluation'>
                  <div className='this-is-getting-outofhand'>
                    <p className='evaluation-container-header-time'>+2</p><p className='evaluation-container-header-year'>years</p>
                  </div>
                  <div className='comments-evaluation-container'>
                  <p>-Walking for a long time.</p>
                  <p>-Infant discomfort.</p>
                  <p>-Especially directed to newly married.</p>
                  </div>
                  </div>
            </div>
            <div className='description-reservation-button'>
              <p>Discover The Enchanting Allure of japan as you Venture Towards The Majestic Mount Fujy, A Destination That Promises Breathtaking Vistas And Unforgettable Experiences For Every Traveler.</p>
              <button className='reservation-button'><p className='reservation-button-text'>Reservation</p></button>
            </div>
        </div>
    </div>
  )
}

export default TravelPageHeader
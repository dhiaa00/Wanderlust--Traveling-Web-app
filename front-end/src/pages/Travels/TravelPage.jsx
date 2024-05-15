import React from 'react'
import TravelPageHeader from '../../components/travelpage/TravelPageHeader'
import TravelPagePictures from '../../components/travelpage/TravelPagePictures'
import TravelPageDescription from '../../components/travelpage/TravelPageDescription'
import TravelPageEvaluation from '../../components/travelpage/TravelPageEvaluation'
import TravelPagePrice from '../../components/travelpage/TravelPagePrice'
import '/src/pages/Travels/travelspage.css'
const TravelPage = () => {
  return (
    <div className='travel_page'>
        <img src="/src/images/travelpage/Rectangle 1267.svg" alt="" className="background-image" />
        <TravelPageHeader/>
        <TravelPagePictures/>
        <TravelPageDescription/>
        <TravelPageEvaluation/>
        <TravelPagePrice/>
    </div>
    
  )
}

export default TravelPage
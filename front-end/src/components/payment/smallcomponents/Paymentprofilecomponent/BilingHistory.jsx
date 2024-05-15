import React from 'react'
import './bilinghistory.css'
import TitleButton from './TitleButton'
import ListOfStuff from './ListOfStuff'
import BilingHistoryElement from './BilingHistoryElement'

const BilingHistory = () => {
  return (
    <div className="everything-bro">
        <div className="the-first-thingos">
            <TitleButton/>
        </div>
        <div className="Biling-history-container">    
            <div className="everything-else-container">
                <ListOfStuff/>
                <BilingHistoryElement/>
                <BilingHistoryElement/>
                <BilingHistoryElement/>
                <BilingHistoryElement/>
                <BilingHistoryElement/>
                <BilingHistoryElement/>
                <BilingHistoryElement/>
                <BilingHistoryElement/>
                <BilingHistoryElement/>
            </div>
        </div>
    </div>
  )
}

export default BilingHistory
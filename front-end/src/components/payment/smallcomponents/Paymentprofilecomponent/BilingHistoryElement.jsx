import React from 'react'
import './bilinghistoryelement.css'
const BilingHistoryElement = (name,price,date,model,plan,date2) => {
  return (
    <div className="biling-history-element-container">
       
        <div className="name-datetype-shit">
        <img src="/src/SVGs/EditProfileActualPaymentPage/Group 33860.svg" alt="" />
            <div className="title-container-details">
                <h2>{name="Basic Plan"} - {date="June 2022"}</h2>
                <p>{model="Dipa -#100122"}</p>
            </div>
        </div>
        <div className="element">
            <h2>{price="144.00$"}</h2>
        </div>
        <div className="element">
            <h2>{date2='Jun 10,2022'}</h2>
        </div>
        <div className="element">
            <h2>played</h2>
        </div>
        <div className="element">
            <h2>{plan="Basic Plan"}</h2>
        </div>
        <img src="/src/SVGs/EditProfileActualPaymentPage/Download.svg" alt="" />
    </div>
  )
}

export default BilingHistoryElement
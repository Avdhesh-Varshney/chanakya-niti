import React from 'react'
import './Contributor.css'

function Contricard(props) {
  const {name,img,count}=props;
  return (
    <>
      <div className='contricard my-4 mx-3'>
        <div className='user-img'>
          <img src={img} />
        </div>
        <div className="count">
          {count}
        </div>
        <div className='user-name my-4'>
          <p>
            {name}
          </p>
        </div>
      </div>
    </>
  )
}

export default Contricard
import React from 'react'
import './Contributor.css'
import { Link } from 'react-router-dom';
function Contricard(props) {
  const { name, img, count } = props;
  return (
    <>
      <div className='contricard my-4 mx-3'>
        <div className='user-img'>
          <img src={img} />
        </div>
        <div className="count">
          {count}
        </div>
        <div className='user-name'>
          <p>
            {name}
          </p>
        </div>
        <div className="detail">
          <Link to='/contributor/details'>
            <button className='btn btn-secondary'>
              Get details
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Contricard
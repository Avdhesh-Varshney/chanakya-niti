import React from 'react'
import { Link } from 'react-router-dom';

const Card = ({ imgSrc, title, description, path, btnName }) => {
  return (
    <div className="card" style={{ width: '18rem' }}>
      <img src={imgSrc} alt="image" className='card-img-top' />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className='card-text'>{description}</p>
        <Link to={path} className='btn btn-dark'>{btnName}</Link>
      </div>
    </div>
  )
}

export default Card;

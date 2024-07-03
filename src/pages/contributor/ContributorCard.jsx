import React from 'react'
import { Link } from 'react-router-dom';
import "../../css/Contributor.css"

function ContributorCard(props) {
  const { name, img,contributions } = props;

  return (
    <>
      

      <div className="card mx-2 my-2" style={{width:"18rem"}}>
        <img src={img} className="card-img-top" alt="..."/>
          <div className="card-body ">
            <h5 className="card-title">{name}</h5>
            <Link to="/contributor/details" className="btn btn-primary" onClick={()=>{
              localStorage.setItem('contributorName',name);
              localStorage.setItem('contributions',contributions);
            }} >Get Details</Link>
          </div>
      </div>
    </>
  )
}

export default ContributorCard
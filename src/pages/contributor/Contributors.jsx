import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ContributorCard from './ContributorCard'

const Contributors = (props) => {
  const [data, setdata] = useState([])
  useEffect(() => {
    getContributor();
    localStorage.setItem('contributorName','');
    localStorage.setItem('contributions','');
  }, [])


  const getContributor = async () => {
    await axios.get('https://api.github.com/repos/Avdhesh-Varshney/chanakya-niti/contributors')
      .then(function (response) {
        setdata(response.data);
        // console.log(data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  return (
    <>
    <div><a href="#top" class="scrollToTopBtn" id="scrollToTopBtn">▲</a></div>
      <svg class="progress-ring" width="60" height="60">
        <circle class="progress-ring__circle" stroke="grey" stroke-width="4" fill="transparent" r="28" cx="30" cy="30" />
      </svg>
      <div className='d-flex flex-column contribution' style={{ overflowX: "hidden" }}>
        <div className="fs-3" style={{fontWeight:"500"}}>
          Our Contributors
        </div>
        <div className='d-flex flex-wrap justify-content-evenly'>

        {
          data.map((element) => {
            return <div key={data.indexOf(element)}>
              <ContributorCard name={element.login} img={element.avatar_url} contributions={element.contributions} />
            </div>
          })
        }
        </div>

      </div>
    </>
  )
}

export default Contributors;


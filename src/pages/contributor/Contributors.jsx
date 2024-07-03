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


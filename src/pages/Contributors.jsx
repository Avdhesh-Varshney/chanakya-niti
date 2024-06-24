import React from 'react'
import { useEffect, useState } from 'react'
import Contricard from './Contricard'
import axios from 'axios'
import './Contributor.css'

const Contributors = () => {
  
  const [data, setdata] = useState([])
  useEffect(() => {
    getContributor();
  }, [])


  const getContributor = async () => {
    await axios.get('https://api.github.com/repos/Avdhesh-Varshney/chanakya-niti/contributors')
      .then(function (response) {
        setdata(response.data);
        // console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  return (
    <>
      <div className='d-flex flex-column contribution' style={{ overflowX: "hidden" }}>
        <div className="contri-heading">
          Our Contributors
        </div>
        <div className='d-flex flex-wrap'>

        {
          data.map((element) => {
            return <div>
              <Contricard name={element.login} img={element.avatar_url} count={element.contributions} />
            </div>
          })
        }
        </div>

      </div>
    </>
  )
}

export default Contributors;


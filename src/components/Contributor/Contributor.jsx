import React from 'react'
import { useEffect, useState } from 'react'
import Contricard from './Contricard'
import axios from 'axios'
import { motion } from 'framer-motion'
import './Contributor.css'


function Contributor() {
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
      <div className='d-flex flex-column' style={{ overflowX: "hidden" }}>
        <div className="contri-heading">
          Our Contributors
        </div>
        <div className='d-flex'>

        {
          data.map((element) => {
            return <motion.div initial={{ x: 100 }}
              animate={{ x: "-250vw" }}
              transition={{ duration: 20, repeat: Infinity }}>
              <Contricard name={element.login} img={element.avatar_url} count={element.contributions} />
            </motion.div>
          })
        }
        </div>

      </div>
    </>
  )
}

export default Contributor
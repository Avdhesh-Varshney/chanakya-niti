import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ContributorCard from './ContributorCard'
import { FaAngleDoubleUp } from 'react-icons/fa'

const Contributors = ({ isDarkMode }) => {
  const [data, setdata] = useState([])
  const [showScroll, setShowScroll] = useState(false);

  // Function to handle scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Function to check the scroll position
  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 300) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 300) {
      setShowScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => {
      window.removeEventListener('scroll', checkScrollTop);
    };
  }, [showScroll]);

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
        <div className="fs-2 text-center fw-bold" style={{fontWeight:"500"}}>
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
        {/* Scroll to Top Button */}
      <button
        className="scroll-to-top"
        onClick={scrollToTop}
        style={{
          position: 'fixed',
          bottom: '50px',
          right: '30px',
          display: showScroll ? 'flex' : 'none',
          backgroundColor: `${isDarkMode ? '#333' : '#fff'}`,
          color: `${isDarkMode ? '#fff' : '#333'}`,
          borderRadius: '50%',
          height: '50px',
          width: '50px',
          padding: '10px',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '24px',
          cursor: 'pointer',
          zIndex: 1000,
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        <FaAngleDoubleUp />
      </button>
      </div>
    </>
    
  )
}

export default Contributors;


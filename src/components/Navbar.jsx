import React from 'react'
import Searchepisode from './Searchepisode'

function Navbar(props) {
  const { handleOnChange, handleKeyPress, value, handleKey } = props;
  const ww=window.innerWidth;
  return (
    <>
      <nav className={`d-flex ${ww<750 && 'flex-column'} flex-wrap justify-content-${ww>550?'between':'center'} align-items-center my-3`}>
        <div className='fs-4 my-2 ' >
          <img src="https://raw.githubusercontent.com/Avdhesh-Varshney/Chanakya/main/src/assets/Chanakya-Logo.webp" alt="Chanakya-Image" width={"auto"} style={{ width: '5rem' }} />
          चाणक्य नीति
        </div>
        <div className='' style={{margin:""}}>
          <Searchepisode className="" handleOnChange={handleOnChange} handleKeyPress={handleKeyPress} value={value} handleKey={handleKey} />

        </div>
      </nav>
    </>
  )
}

export default Navbar
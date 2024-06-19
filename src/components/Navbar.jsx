import React from 'react'
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { options } from '../functions/options';

function Navbar(props) {
  const { handleOnChange, handleKeyPress, value, handleKey } = props;
  const ww = window.innerWidth;
  return (
    <>
      <nav className={`text-dark d-flex ${ww < 750 && 'flex-column'} flex-wrap justify-content-${ww > 550 ? 'between' : 'center'} align-items-center my-3`}>
        <div className='fs-4 my-2 ' >
          <img src="https://raw.githubusercontent.com/Avdhesh-Varshney/Chanakya/main/src/assets/Chanakya-Logo.webp" alt="Chanakya-Image" width={"auto"} style={{ width: '5rem' }} />
          चाणक्य नीति
        </div>
        <div className="d-flex justify-content-center align-items-center">
          {/* <div className="mx-2">
            <label htmlFor="inputNumber" className="col-form-label">Episode Number</label>
          </div> */}

          <div className="mx-2 input-group-text" style={{backgroundColor:"transparent", border:"none", maxWidth:"50vw"}}>
            <Autocomplete
              disablePortal
              className="bg-white rounded"
              options={options}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField onSelect={handleOnChange} onChange={handleOnChange} {...params} label="Enter episode"/>}
            />
          </div>
          <div className="">
            <button
              onClick={handleKey}
              className="btn btn-primary"
            >
              Enter
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
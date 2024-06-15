import React from 'react'

function Searchepisode(props) {
    const { handleOnChange, handleKeyPress, value, handleKey } = props;
    const ww = window.innerWidth;
    return (
        <>
            <div className="d-flex text-center align-items-center justify-content-center ">
                <div className="col-auto">
                    {ww > 740 && <label htmlFor="inputNumber" className="col-form-label">Search</label>}
                </div>
                <div className="col-auto mx-2">
                    <input type="number" id="inputNumber" className="form-control" value={value} onKeyDown={handleKeyPress} onChange={handleOnChange} placeholder='Episode number' />
                </div>
                <div className='col-auto'>
                    <button
                        onClick={handleKey}
                        className="btn"
                    ><i className="fa fa-search" ></i>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Searchepisode
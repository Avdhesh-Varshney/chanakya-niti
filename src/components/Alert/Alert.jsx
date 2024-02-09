import React from 'react'

const Alert = (props) => {
  return (
    <div style={{ height: '50px' }} className='text-center align-center'>
      {props.alert && <div className={`alert alert-warning alert-dismissible fade show`} role="alert">
        {props.alert.msg}
      </div>}
    </div>
  )
}

export default Alert;

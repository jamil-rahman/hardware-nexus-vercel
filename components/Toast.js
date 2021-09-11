import React from 'react'

export default function Toast({message, handleShow, bgColor}) {
    return (
      <div className={`toast show position-fixed text-light ${bgColor}`}
      style={{top: "5px", right: "5px", zIndex:"9", minWidth:"340px", outline:"none"}}
      >
      <div className="toast-header">
        <strong className="mr-auto text-primary">{message.title}</strong>
        <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" onClick={handleShow}>&times;</button>
      </div>
      <div className="toast-body">
        {message.msg}
      </div>
    </div>
    )
}

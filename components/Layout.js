import React from 'react'
import NavBar from './NavBar'
import Notify from './Notify'

export default function Layout({children}) {
    return (
        <div>
           <NavBar />
           <div className="container justify-end">
           <Notify />
               {children}
            </div>
        </div>
    )
}

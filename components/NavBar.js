/* eslint-disable @next/next/no-img-element */
import React, { useContext } from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {DataContext} from '../store/GlobalState'
import Cookie from 'js-cookie'

function NavBar() {
    const router = useRouter()
    const {state, dispatch} = useContext(DataContext)
    const { auth } = state


    const isActive = (r) => {
        if(r === router.pathname){
            return " active"
        }else{
            return ""
        }
    }

    const handleLogout = () => {
        Cookie.remove('refreshtoken', {path: 'api/auth/accessToken'})
        localStorage.removeItem('firstLogin')
        dispatch({ type: 'AUTH', payload: {} })
        dispatch({ type: 'NOTIFY', payload: {success: 'Logged out!'} })
        return router.push('/signin')
    }


    //if user is logged in, then logged Router

    const loggedRouter = () => {
        return(
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img src={auth.user.avatar} alt={auth.user.avatar} 
                    style={{
                        borderRadius: '50%', width: '30px', height: '30px',
                        transform: 'translateY(-3px)', marginRight: '3px',
                        color:"black"
                    }} /> {auth.user.name}
                </a>

                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <Link href="/profile">
                        <a className="dropdown-item">Profile</a>
                    </Link>
                    {/* {
                        auth.user.role === 'admin' && adminRouter()
                    } */}
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                </div>
            </li>
        )
    }
//If user is not logged in
    return (
        <nav className="navbar navbar-expand-lg navbar-light navbar-custom" >
            <Link  href="/">
                <a className="navbar-brand mx-auto text-white" style={{fontFamily: "Exo"}}>Hardware Nexus</a> 
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                <ul className="navbar-nav p-1">
                   
                    {
                        Object.keys(auth).length === 0 
                        ? <li className="nav-item" >
                            <Link href="/signin">
                                <a className={"nav-link text-white" + isActive('/signin')} >
                                    <i className="fa fa-user"  aria-hidden="true"></i> Sign in
                                </a>
                            </Link>
                        </li>
                        : loggedRouter()
                    }
                </ul>
            </div>
        </nav>
    )
}

export default NavBar
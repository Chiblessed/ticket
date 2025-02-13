import React from 'react';
import Logo from '../assets/logo.png'

function Navbar() {
  return (
    <>
    <header>
        <a href="#" className='logo' >
            <img src={Logo} alt="" />
        </a>
        <nav>
            <ul>
                <li><a href="/">Events</a></li>
                <li><a href="/">My Tickets</a></li>
                <li><a href="/">About Projects</a></li>
            </ul>
        </nav>
        <div>
            <button>
                MY TICKETS
            </button>
        </div>
    </header>
    </>
  )
}

export default Navbar
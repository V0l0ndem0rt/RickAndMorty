import React from 'react'
import style from './Header.module.css'
import logo from '../../img/svg/logo.svg'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'



const Header = () => {
  const {pathname} = useLocation();
  return (
    <header className={style.header}>
        <div className={style.logo}><a href="/"><img src={logo} alt="logo" /></a></div>
        <nav className={style.nav}>
            <ul>
                <li><Link className={pathname === '/' ? style.active: ''} to="/">Character</Link></li>
                <li><Link className={pathname === '/location' ? style.active: ''} to="/location">Location</Link></li>
                <li><Link className={pathname === '/episode' ? style.active: ''} to="/episode">Episode</Link></li>
            </ul>
        </nav>
    </header>
  )
}

export default Header
import React from "react";
import logo from "../images/logo.svg";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom";

function Header(props) {
  const location = useLocation();

  function handleLinkClick() {
    if (location.pathname === '/') {
        props.OnSignOut();
    }
  }

 return (
   <header className="header">
     <img className="header__icon-logo" src={logo} alt="логотип сайта Место" />
         <p className="link header__link">{props.email}</p>
         <Link to="/sign-in" className="link header__link" onClick={handleLinkClick}>Выход</Link>
         <p className="link header__link">{props.email}</p>
         <Link to="/sign-up" className="link header__link" onClick={handleLinkClick}>Регистрация</Link>
         <p className="link header__link">{props.email}</p>
         <Link to="/sign-in" className="link header__link" onClick={handleLinkClick}>Вход</Link>

   </header>
 );
}

export default Header;
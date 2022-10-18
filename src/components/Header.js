import React from "react";
import logo from "../images/logo.svg";

function Header() {
 return (
   <header className="header">
     <img className="header__icon-logo" src={logo} alt="логотип сайта Место" />
   </header>
 );
}

export default Header;
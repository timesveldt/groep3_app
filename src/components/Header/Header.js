import React, { useState } from 'react';

// react-router
import { Link } from 'react-router-dom';

// components
import Menu from './Menu';

// css
import './Header.css';

const Header = () => {

    const [menu, setMenu] = useState(false);

    return (
        <header className="header">
            <Link to="/" className="header__title">
                <span className="header__title__blue-1">Vid</span>
                <span className="header__title__blue-2">Va</span>
                <span className="header__title__blue-3">So</span>
            </Link>
            <div className="header__nav">
                <label className={menu ? 'header__nav__label label-active' : 'header__nav__label'} htmlFor="menu-button">Menu</label>
                <button className="header__nav__btn" id="menu-button" onClick={() => setMenu(prevMenu => !prevMenu)}>
                    <span className={menu ? 'header__nav__btn__bar-1 active-1' : 'header__nav__btn__bar-1'}></span>
                    <span className={menu ? 'header__nav__btn__bar-2 active-2' : 'header__nav__btn__bar-2'}></span>
                    <span className={menu ? 'header__nav__btn__bar-3 active-3' : 'header__nav__btn__bar-3'}></span>
                </button>
            </div>
            <Menu active={menu} />
        </header>
    )
}

export default Header;

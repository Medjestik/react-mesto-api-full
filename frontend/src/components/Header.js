import React from 'react';
import { useLocation, useHistory } from 'react-router-dom'
import logo from '../images/logo.svg';

function Header({ onLogout, userEmail, loggedIn }) {

    const { pathname } = useLocation();
    const history = useHistory();
    const [windowWidth, setWindowWidth] = React.useState(0);
    const [showMenu, setShowMenu] = React.useState(false);
  
    React.useEffect(() => {
      function resizeWindow (evt) {
        setWindowWidth(evt.target.innerWidth);
      }

      window.addEventListener('resize', resizeWindow);

      return () => {
        window.removeEventListener('resize', resizeWindow);
      }
    }, []);
  
    React.useEffect(() => {
        setWindowWidth(window.innerWidth);
        if (windowWidth > 600) {
            setShowMenu(false);
        }
    }, [windowWidth])

    const navButtons = [
        { from: '/sign-up', to: '/sign-in', text: 'Войти' },
        { from: '/sign-in', to: '/sign-up', text: 'Регистрация' }
    ]

    function getNavButton (buttons, pathname) {
        const button = buttons.find((btn) => btn.from === pathname)
        if (!button) return null
        return (
            <div className="header__auth">
                <button className="header__auth-nav" type="button" onClick={() => history.push(button.to)}>{button.text}</button>
            </div>
        )
    }

    function getAuthMenu (windowWidth) {
        if (windowWidth > 600) { 
            return (
                <div className="header__auth">
                    <p className="header__auth-email">{userEmail}</p>
                    <button className="header__auth-nav header__auth-nav_type_logout" type="button" onClick={onLogout}>Выход</button>
                </div>
          )
        } else {
                return (
                    <div className="header__auth">
                        {showMenu
                        ? <button className="header__button header__button_menu_hide" type="button" onClick={() => setShowMenu(false)} />
                        : <button className="header__button header__button_menu_show" type="button" onClick={() => setShowMenu(true)} />
                        }
                    </div>
                ) 
        }
    }

    const mobileMenu = (
        <>
            <p className="header__auth-email header__auth-email_type_mobile">{userEmail}</p>
            <button className="header__auth-nav header__auth-nav_type_logout" type="button" onClick={onLogout}>Выход</button>
        </>
    )

    return (
        <>
            {loggedIn && 
                    <div className={`header__menu-mobile header__menu-mobile_type_${showMenu ? 'show' : 'hide'}`}>{mobileMenu}</div>
            }
            <header className="header">
                <img className="header__logo" src={logo} alt="Логотип" />
                {loggedIn
                    ? getAuthMenu(windowWidth)
                    : getNavButton(navButtons, pathname)
                }       
            </header>
        </>
    );
  }


export default Header;
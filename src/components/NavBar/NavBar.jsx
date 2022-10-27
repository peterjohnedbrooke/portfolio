import React, { useEffect, useState } from 'react';
import styles from "./NavBar.module.scss";
import Hamburger from 'hamburger-react';
import { Outlet, Link } from "react-router-dom";
import Logo from '../Logo';
import SideNav from '../SideNav/SideNav';

const NavBar = (props) => {
  const [click, setClick] = useState(false);
  const [clickLogo, setClickLogo] = useState(false);
  const [changePage, setChangePage] = useState(false);

  // window.onpopstate = () => {
  //   // localStorage.removeItem("click", "clickLogo", "changePage")
  //   setClick(false);
  //   setClickLogo(false);
  //   setChangePage(false)
  // }
  // window.onpopstate = () => {
  //   setClickLogo(true)
  // }

  // useEffect(() => {
  //   setClick(JSON.parse(window.localStorage.getItem('click')));
  //   setClickLogo(JSON.parse(window.localStorage.getItem('clickLogo')));
  //   setChangePage(JSON.parse(window.localStorage.getItem('changePage')));
  // }, []);

  // useEffect(() => {
  //   window.localStorage.setItem("click", click)
  //   window.localStorage.setItem("clickLogo", clickLogo)
  //   window.localStorage.setItem("changePage", changePage)
  // }, [click], [clickLogo], [changePage])

  const handlePageChange = () => {
    setChangePage(true)
    setClickLogo(true)
  }

  const handleLogo = () => {
    setClickLogo(true)
  }

  const handleClick = () => {
    setClick(!click)
    setHoverFour(false);
    setHoverOne(false);
    setHoverTwo(false);
    setHoverThree(false);
  }
  const handleExit = (e) => {
    setClick(!click)
    setHoverFour(false);
    setHoverOne(false);
    setHoverTwo(false);
    setHoverThree(false);
    setOpen(false);
    setClickLogo(true);
    setChangePage(true);
  }
  const handleExitHome = (e) => {
    setClick(!click)
    setHoverFour(false);
    setHoverOne(false);
    setHoverTwo(false);
    setHoverThree(false);
    setOpen(false);
    setChangePage(false);
    setClickLogo(false);
  }

  const [isOpen, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!isOpen)
  };

  const [isSideNavOpen, setIsSideOpen] = useState(true);
  const handleSideNavOpen = () => {
    if (setIsSideOpen(false)) {
      return
    } else {
      setIsSideOpen(!isSideNavOpen);
    }
  }

  const [hoverOne, setHoverOne] = useState(false);
  const handleHoverOne = () => {
    if (setHoverOne(true)) {
      return;
    } else {
      setHoverOne(true);
      setHoverTwo(false);
      setHoverThree(false);
      setHoverFour(false)
    }
  }
  const [hoverTwo, setHoverTwo] = useState(false);
  const handleHoverTwo = () => {
    if (setHoverTwo(true)) {
      return;
    } else {
      setHoverTwo(true);
      setHoverOne(false);
      setHoverThree(false);
      setHoverFour(false);
      setIsSideOpen(true);
    }
  }


  const [hoverThree, setHoverThree] = useState(false);
  const handleHoverThree = () => {
    if (setHoverThree(true)) {
      return;
    } else {
      setHoverThree(true);
      setHoverOne(false);
      setHoverTwo(false);
      setHoverFour(false);

    }
  }
  const [hoverFour, setHoverFour] = useState(false);
  const handleHoverFour = () => {
    if (setHoverFour(true)) {
      return;
    } else {
      setHoverFour(true);
      setHoverOne(false);
      setHoverTwo(false);
      setHoverThree(false);
    }
  }

  // when any linked besides home is clicked, change the navbar to a different class
  return (
    <div className={styles.navBar}>

      <div className={changePage ? `${styles.navBarContainer}` : `${styles.navBarContainerHome}`}>
        <div className={styles.navBarContainerRight}>
          <div className={changePage ? `${styles.burgerIconPage}` : `${styles.burgerIcon}`} onClick={handleClick}>
            <Hamburger className={styles.burgerInner} toggled={isOpen} rounded toggle={setOpen} />
          </div>
        </div>
        <div onMouseEnter={handleSideNavOpen} className={click ? `${styles.sideNavLeftActive}` : `${styles.sideNavLeftHidden}`}>
          <div className={hoverOne ? `${styles.hoverOneMenu}`
            : hoverTwo ? `${styles.hoverTwoMenu}`
              : hoverThree ? `${styles.hoverThreeMenu}`
                : hoverFour ? `${styles.hoverFourMenu}`
                  : `${styles.hoverMenuHidden}`}>
          </div>
        </div>
        <div className={click ? `${styles.sideNavRightActive}` : `${styles.sideNavRightHidden}`}>

          <ul className={click ? `${styles.rightSideList}` : `${styles.rightSideListHidden}`}>
            <li>
              <Link to="/" onMouseEnter={handleHoverOne} onClick={handleExitHome} >home.</Link>
            </li>
            <li>
              <Link to="/projects" onMouseEnter={handleHoverTwo} onClick={handleExit}>recent.</Link>
            </li>
            <li>
              <Link to="/about" onMouseEnter={handleHoverThree} onClick={handleExit}>about.</Link>
            </li>
            /
          </ul>
          {
            isSideNavOpen &&
            <div className={hoverTwo ? `${styles.rightMenuPopOut}` : `${styles.rightMenuPopOutHidden}`}>
              <ul className={hoverTwo ? `${styles.popOutListActive}` : `${styles.popOutListHidden}`} >
                <li className={styles.popOutList}>
                  <Link onClick={handleExit} to="/erbium" className={styles.popOutLink}>erbium records.</Link>
                </li>
                <li className={styles.popOutList}>
                  <Link onClick={handleExit} to="/cutabove" className={styles.popOutLink}>cut above barbers.</Link>
                </li>
                <li className={styles.popOutList}>
                  <Link onClick={handleExit} to="/brewdog" className={styles.popOutLink}>brewdog api.</Link>
                </li>
                {/* <li className={styles.popOutList}>
                          <Link  onClick={handleExit} to="/pokeapi" className={styles.popOutLink}>poke api.</Link>
                        </li> */}
                <li className={styles.popOutList}>
                  <Link onClick={handleExit} to="/calculator" className={styles.popOutLink}>js calculator.</Link>
                </li>
              </ul>
            </div>
          }
        </div>
      </div>
      <Outlet />
    </div>

  )
}

export default NavBar
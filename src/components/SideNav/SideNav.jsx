import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import styles from "./SideNav.module.scss"

const SideNav = (props) => {
    // const [changePage, setChangePage] = useState(false);
    // const handlePageChange = () => {
    //   setChangePage(true)
    // } 

    window.onreset = () => {
        localStorage.removeItem("changePage")
      }
    const {handlePageChange, changePage} = props;
    

  return (
        <div className={ changePage ? `${styles.sideNavBackgroundActive}` : `${styles.sideNavBackground}` }>
            <div className={styles.landingTextContainer}>
                {/* <Logo/> */}
                <div>
                    <ul className={styles.introGrid}>
                        <li>Peter J Edbrooke</li>
                        <li>Birmingham, uk</li>
                        <li className={styles.miniLink}>
                            <Link onClick={handlePageChange} to="/projects" className={styles.miniLink}>Recent</Link>
                        </li>
                        <li>peter.john.edbrooke@gmail.com</li>
                        <li>Web Developer</li>
                        <li className={styles.miniLink}>
                            <Link onClick={handlePageChange} className={styles.miniLink} to="/about">About</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div> 
  )
}

export default SideNav
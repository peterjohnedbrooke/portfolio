import React from 'react'
import styles from "./SideNav.module.scss"

const SideNav = () => {
  return (
            <div className={styles.landingTextContainer}>
                {/* <Logo/> */}
                <div>
                    <ul className={styles.introGrid}>
                        <li>Peter J Edbrooke</li>
                        <li>Birmingham, uk</li>
                        <li className={styles.miniLink}>Recent</li>
                        <li>peter.john.edbrooke@gmail.com</li>
                        <li>Web Developer</li>
                        <li className={styles.miniLink}>About</li>
                    </ul>
                </div>
            </div> 
  )
}

export default SideNav
import React from 'react'
import styles from "./KnowWastePage.module.scss"
import SideNav from '../SideNav/SideNav'

const KnowWastePage = () => {
  return (
    <>
    <div className={styles.wrapper}>
      <div>
        <h1>Coming soon..</h1>
      </div> 
    </div>
    <div className={styles.sideNavBackgroundActive}>
      <SideNav></SideNav>
    </div>
    </>
  )
}

export default KnowWastePage
import React from 'react'
import styles from "./Button.module.scss"
import { Link } from 'react-router-dom'

const ExploreButton = (props) => {
  const link = props.link;
  return (
    <div className={styles.circleButton}>
        <a href={link}>
          <div className={styles.arrow}></div>
        </a>
    </div>
  )
}

export default ExploreButton
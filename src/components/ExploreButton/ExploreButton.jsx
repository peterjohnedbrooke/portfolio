import React from 'react'
import styles from "./ExploreButton.module.scss"
import { Link } from 'react-router-dom'

const ExploreButton = (props) => {
  const {link, linkPoke, handleLayout} = props;
  return (
    <>
      <button className={styles.exploreButton}>
           <a href={link}>Explore!</a>
      </button>
    </>
  )
}

export default ExploreButton
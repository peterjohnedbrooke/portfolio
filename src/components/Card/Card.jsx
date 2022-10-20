import React from 'react'
import styles from "./Card.module.scss";
import ExploreButton from '../ExploreButton/ExploreButton';
import Button from '../Button';
import SideNav from '../SideNav/SideNav';
import Logo from '../Logo';

const Card = (props) => {
  const {link, title, paragraph, handleLayout, linkPoke} = props;

  return (
    <>
    <div className={styles.main}>
      <Logo></Logo>
        <div className={styles.container}>
          <div className={styles.textBox}>
            <h2>{title}</h2>
            <ExploreButton link={link}/>
          </div>
          <p>{paragraph}</p> 
        </div>
    </div>
    <div className={styles.sideNavBackgroundActive}>
      <SideNav></SideNav>
    </div>
    </>
  )
}

export default Card
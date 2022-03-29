import React from 'react'
import styles from "./Card.module.scss";
import ExploreButton from '../ExploreButton/ExploreButton';
import Button from '../Button';
import SideNav from '../SideNav/SideNav';

const Card = (props) => {
  const {link, title, paragraph, handleLayout, linkPoke} = props;

  return (
    <div className={styles.main}>
        <div className={styles.container}>
        <div className={styles.textBox}>
            <h2>{title}</h2>
            <ExploreButton link={link}/>
          </div>
          <div>
            <p>{paragraph}</p> 
          </div>
          { handleLayout ? 
          ""
          :
          <div>
            <Button/>
          </div> 
          }
        </div>
        <div className={styles.sideNavBackground}>
          <SideNav ></SideNav>
        </div>
        {/* <div className={styles.mainSecond}></div> */}
    </div>
  )
}

export default Card
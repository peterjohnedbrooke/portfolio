import React from 'react'
import styles from "./About.module.scss";
import SideNav from '../SideNav/SideNav';
import Logo from '../Logo';

const About = () => {
  return (
    <>
    <Logo></Logo>
    <div className={styles.wrapper}>
      <div className={styles.aboutContainer}>
        {/* <h2>About me</h2> */}
        <p>Hi, I'm Peter. I'm originally from Cardiff but currently living in Birmingham UK. After learning about web development during my degree course I developed a passion for user focused design. During my time studying web development at .Nology I've learnt about the fundamentals of design and coding in HTML, JS, CSS, React & Typescript </p>
      </div>  
    </div>
    <div className={styles.sideNavBackgroundActive}>
      <SideNav></SideNav>
    </div>
    </>
  )
}

export default About;
import React from 'react'
import styles from "./Erbium.module.scss"
import Card from '../Card/Card'

const Erbium = (props) => {
  const link = "https://erbium.vercel.app/";
  const title = "Erbium Records"
  const paragraph = "This is my current ongoing project, building a record label website for a client using react, Nextjs, Strapi as the headless CMS and hosted on heroku for the backend and vercel for the front end. The overall design needs a lot of improvement and a more overarching theme"
  
  return (
    <>
        <Card link={link} title={title} paragraph={paragraph}/>
    </>
  )
}

export default Erbium
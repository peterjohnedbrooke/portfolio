import React from 'react'
import Card from '../Card/Card';

const CutAbove = () => {
    const link = "https://cutabove.vercel.app/";
    const title = "Cut Above Barbers"
    const paragraph = "This proof of concept is a basic design presentation for a single page website. Create with react in nextjs I have drawn upon modern design sensibilities. As a real world project this would use strapi for the backend(negating performance issues) and either strapi or a third party widget for the booking area."
    return (
        <>
            <Card link={link} title={title} paragraph={paragraph} />
        </>
    )
}

export default CutAbove
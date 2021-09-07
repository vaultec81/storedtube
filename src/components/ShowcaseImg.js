import React from 'react'

export default function ShowcaseImg(props) {
    const { src } = props;
    return (/*<a href={src} target="_blank" rel="noreferrer">
        <img className="showcase-img" src={src} alt="" />
        </a>*/
    <img className="showcase-img" src={src} alt="" />)

}
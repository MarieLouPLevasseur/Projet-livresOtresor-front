import React from 'react'
import ImageError from '../../assets/img/image-404.png'

import './PageNotFound.scss'


function PageNotFound() {
  return (
    <div className='container'>
      <img src={ ImageError} alt="page erreur"></img>
    </div>
  )
}

export default PageNotFound
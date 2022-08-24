import React from 'react'

import Faq from './Faq/Faq'
import HomeCarousel from './HomeCarousel/HomeCarousel'

import './Home.scss'


function Home() {
  return (
    <div>
      <HomeCarousel />
      <Faq />
    </div>
  )
}

export default Home
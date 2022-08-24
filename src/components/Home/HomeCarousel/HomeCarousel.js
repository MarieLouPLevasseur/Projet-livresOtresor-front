import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material'

// import Image1 from '../../../assets/img/userlogin'

import './HomeCarousel.scss'

function HomeCarousel(props)
{
    var items = [
        {
            url: "https://www.secure-retail.com/wp-content/uploads/2021/07/SR-EVCP-Neon-Car-BW-1400-x-400-Page-Banner.jpg",
        },
        {
            url: "https://www.itvscience.com/wp-content/uploads/2016/08/blackhole_1600-1400x400.jpg",
        }
    ]

    return (
        <Carousel
          className='carousel'
          navButtonsAlwaysVisible= {true}
          indicators={true}
          fullHeightHover={true}          
        >
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
        
    )
}

function Item(props)
{
    return (
        <Paper sx={{ boxShadow: 0 }}  >
            <img src={props.item.url} alt='slider'/>
        </Paper>
    )
}

export default HomeCarousel
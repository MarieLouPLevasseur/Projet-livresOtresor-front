import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material'

import Banner1 from '../../../assets/img/banner.png'
import Banner2 from '../../../assets/img/banner2.png'

import './HomeCarousel.scss'

function HomeCarousel(props)
{
    var items = [
        {
            url: Banner1,
        },
        {
            url: Banner2,
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
            <img width='100%' src={props.item.url} alt='slider'/>
        </Paper>
    )
}

export default HomeCarousel
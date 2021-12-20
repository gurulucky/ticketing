import React from 'react';
import {Link} from 'react-router-dom';
import Carousel from 'react-material-ui-carousel'
import { Typography, CardActionArea, CardContent, Card, CardMedia, ButtonBase } from '@mui/material'

const Slider = ({ events }) => {
    return (
        <Carousel>
            {
                events.map((item, i) => <Item key={i} item={item} />)
            }
        </Carousel>
    )
}

const Item = ({ item }) => {
    return (
        <Card sx={{ width: "100%", height: "400px" }}>
            <CardMedia
                component="img"
                height="320"
                image={item.image || '/empty.png'}
                alt="green iguana"
            />
            {/* <CardActionArea> */}
            <ButtonBase component={Link} to={`/event/detail/${item._id}`} sx={{ display: 'block', textAlign: 'initial' }}>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {item.description}
                    </Typography>
                </CardContent>
            </ButtonBase>
            {/* </CardActionArea> */}
        </Card>
    )
}

export default Slider;
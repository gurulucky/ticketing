import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Typography, CardActionArea, CardContent, Card, CardMedia } from '@mui/material'

const Slider = (props) => {
    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!",
            background: "./image/01.jpg"
        },
        {
            name: "Random Name #2",
            description: "Hello World!",
            background: "./image/02.jpg"
        },
        {
            name: "Random Name #3",
            description: "Probably the most random thing you have ever seen!",
            background: "./image/03.jpg"
        },
        {
            name: "Random Name #4",
            description: "Hello World!",
            background: "./image/04.jpg"
        }
    ]

    return (
        <Carousel>
            {
                items.map((item, i) => <Item key={i} item={item} />)
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
                image={item.background}
                alt="green iguana"
            />
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {item.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default Slider;
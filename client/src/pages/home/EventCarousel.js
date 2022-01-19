import {Link} from 'react-router-dom';
// import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Typography, CardActionArea, CardContent, Card, CardMedia, Container, Grid, ButtonBase } from '@mui/material'

const EventCarousel = ({ caption, events }) => {

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

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
            slidesToSlide: 1 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 1 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };


    return (
        <Container sx={{ borderBottom: '1px solid green', paddingBottom: '10px' }}>
            <Typography variant='h5' className='caption'>{caption}</Typography>
            {/* <Carousel
                ssr
                partialVisbile
                deviceType={props.deviceType}
                itemClass="image-item"
                responsive={responsive}                
            > */}
            <Grid container>
                {
                    events.map((item, i) => <Item key={i} item={item} />)
                }
            </Grid>
            {/* </Carousel> */}
        </Container>
    )
}
const Item = ({ item }) => {
    return (
        <Grid item md={3}>
            <Card sx={{ width: "90%", height: "380px", m: "10" }}>
                {/* <CardActionArea> */}
                <ButtonBase component={Link} to={`/event/detail/${item.id}`} sx={{display:'block', textAlign:'initial'}}>
                    <CardMedia
                        component="img"
                        height="280"
                        image={item.image || '/empty.png'}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="body1" component="div">
                            {`${item.name.slice(0, 20)}...`}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {`${item.description.slice(0, 20)}...`}
                        </Typography>
                    </CardContent>
                    {/* </CardActionArea> */}
                </ButtonBase>
            </Card>
        </Grid>
    )
}

export default EventCarousel;
import React, { useEffect, useState } from 'react';
import { Container, Stack, TextField, FormControl, Select, MenuItem, InputLabel, Checkbox, FormControlLabel, Button } from "@mui/material";
import DatePicker from '@mui/lab/MobileDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

const SearchInfo = () => {
    const [location, setLocation] = useState("ALL");
    const [time, setTime] = useState("Today");
    const CATEGORIES = ["Festivals", "All Ages", "Live Music", "Arts", "Culture"];
    const [selectedCategories, setSelectedCategories] = useState(
        {
            "Festivals": false,
            "All Ages": false,
            "Live Music": false,
            "Arts": false,
            "Culture": false
        }
    );
    const [from, setFrom] = useState();
    const [to, setTo] = useState();

    useEffect(() => {
        let now = new Date();
        setFrom(new Date());
        now.setDate(now.getDate() + 7);
        setTo(now);
    }, [])

    const changeLocation = (e) => {
        setLocation(e.target.value);
    }
    const changeTime = (e) => {
        setTime(e.target.value);
    }
    const changeCategory = (e, index) => {
        let newSelCategories = selectedCategories;
        newSelCategories[CATEGORIES[index]] = e.target.checked;
        console.log(index, e.target.checked);
        setSelectedCategories(newSelCategories);
    }
    const changeFromDate = (e) => {
        e < to ? setFrom(e) : setFrom(to);
    }
    const changeToDate = (e) => {
        e < from ? setTo(from) : setTo(e);
    }
    return (
        <Container sx={{ py: "10px", borderBottom: "1px solid green" }}>
            <Stack direction='row' spacing={3}>
                <FormControl sx={{ width: "25%" }}>
                    <InputLabel id="demo-simple-select-label">Where?</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={location}
                        label="Where?"
                        onChange={changeLocation}
                    >
                        <MenuItem value="ALL">ALL</MenuItem>
                        <MenuItem value="ACT">ACT</MenuItem>
                        <MenuItem value="NSW">NSW</MenuItem>
                        <MenuItem value="NT">NT</MenuItem>
                        <MenuItem value="TAS">TAS</MenuItem>
                        <MenuItem value="WA">WA</MenuItem>
                        <MenuItem value="SA">SA</MenuItem>
                        <MenuItem value="QLD">QLD</MenuItem>
                        <MenuItem value="VIC">VIC</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ width: "25%" }}>
                    <InputLabel id="demo-simple-select-label">When?</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={time}
                        label="When?"
                        onChange={changeTime}
                    >
                        <MenuItem value="Today">Today</MenuItem>
                        <MenuItem value="Tomorrow">Tomorrow</MenuItem>
                        <MenuItem value="Weekend">This Weekend</MenuItem>
                        <MenuItem value="Next week">Next 7 Days</MenuItem>
                        <MenuItem value="Next month">Next 30 Days</MenuItem>
                        <MenuItem value="Upcoming">Upcoming</MenuItem>
                        <MenuItem value="Custom">Custom</MenuItem>
                    </Select>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <FormControl sx={{ width: "25%" }}>
                        <DatePicker
                            label="From"
                            inputFormat="MM/dd/yyyy"
                            value={from}
                            onChange={changeFromDate}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </FormControl>
                    <FormControl sx={{ width: "25%" }}>
                        <DatePicker
                            label="To"
                            inputFormat="MM/dd/yyyy"
                            value={to}
                            onChange={changeToDate}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </FormControl>
                </LocalizationProvider>
            </Stack>
            <Stack direction='row'>
                {
                    CATEGORIES.map((item, index) => <FormControlLabel control={<Checkbox onChange={(e) => changeCategory(e, index)} />} label={item} />)
                }
                {/* <FormControlLabel control={<Checkbox checked={categories[0]} />} label="Festivals" />
                <FormControlLabel control={<Checkbox checked={categories[0]} />} label="All Ages" />
                <FormControlLabel control={<Checkbox checked={categories[0]} />} label="Live Music" />
                <FormControlLabel control={<Checkbox checked={categories[0]} />} label="Arts" />
                <FormControlLabel control={<Checkbox checked={categories[0]} />} label="Culture" /> */}
            </Stack>
            <Stack direction='row' justifyContent='flex-end'>
                <Button className='bg-primary' variant='contained' >Update Results</Button>
            </Stack>
        </Container>
    )
}

export default SearchInfo;
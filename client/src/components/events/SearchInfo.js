import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Stack, TextField, FormControl, Select, MenuItem, InputLabel, Checkbox, FormControlLabel, Button } from "@mui/material";
import DatePicker from '@mui/lab/MobileDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { getEvents } from '../../actions/event';

const SearchInfo = () => {
    const dispatch = useDispatch();

    const [location, setLocation] = useState("ALL");
    const LOCATIONS = ["ALL", "ACT", "NSW", "NT", "TAS", "WA", "SA", "QLD", "VIC"];
    const [time, setTime] = useState("Next 7 Days");
    const TIMES = ["Today", "Tomorrow", "This Weekend", "Next 7 Days", "Next 30 Days", "Custom"];
    const CATEGORIES = ["Festivals", "Live Music", "Arts", "Culture"];
    const [categories, setCategories] = useState(
        {
            "Festivals": false,
            // "All Ages": false,
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

        updateResult();
    }, []);

    const changeLocation = (e) => {
        setLocation(e.target.value);
    }
    const changeTime = (e) => {
        setTime(e.target.value);
    }
    const changeCategory = (e, index) => {
        let newSelCategories = categories;
        newSelCategories[CATEGORIES[index]] = e.target.checked;
        // console.log(index, e.target.checked);
        setCategories(newSelCategories);
    }
    const changeFromDate = (e) => {
        e < to ? setFrom(e) : setFrom(to);
    }
    const changeToDate = (e) => {
        e < from ? setTo(from) : setTo(e);
    }

    const updateResult = () => {
        let now = new Date();
        let fromDate, toDate;
        switch (time) {
            case "Today":
                fromDate = new Date();
                toDate = new Date();
                break;
            case "Tomorrow":
                now.setDate(now.getDate() + 1);
                fromDate = now;
                toDate = now;
                break;
            case "This Weekend":
                now = new Date();
                var lastday = now.getDate() - (now.getDay() - 1) + 5;
                fromDate = new Date(now.setDate(lastday));
                toDate = new Date(now.setDate(lastday + 1));
                break;
            case "Next 7 Days":
                now = new Date();
                fromDate = new Date();
                now.setDate(now.getDate() + 7);
                toDate = now;
                break;
            case "Next 30 Days":
                now = new Date();
                fromDate = new Date();
                now.setDate(now.getDate() + 30);
                toDate = now;
                break;
            case "Custom":
                toDate = to;
                fromDate = from;
                break;
        }
        let keys = Object.keys(categories);
        let selCates = [];
        keys.forEach(element => {
            categories[element] && selCates.push(element);
        });
        dispatch(getEvents({ location, from: fromDate, to: toDate, categories: selCates }));
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
                        {
                            LOCATIONS.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)
                        }
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
                        {
                            TIMES.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)
                        }
                    </Select>
                </FormControl>
                {
                    time === "Custom" &&

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
                }
            </Stack>
            <Stack direction='row' justifyContent="space-between">
                <Stack direction="row">
                    {
                        CATEGORIES.map((item, index) => <FormControlLabel control={<Checkbox onChange={(e) => changeCategory(e, index)} />} label={item} />)
                    }
                </Stack>
                <Button className='bg-primary' variant='contained' onClick={updateResult} >Update Results</Button>
            </Stack>
        </Container>
    )
}

export default SearchInfo;
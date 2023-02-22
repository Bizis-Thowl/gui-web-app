import { Check, Visibility } from '@mui/icons-material';
import { Box, Button, Paper, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React, { useState } from 'react';
import Anchors from './Anchors';
import MyToggleButton from './components/LocalExamination/MyToggleButton';
import { colors } from './utils/colors';

const timestamps = [
    "2017-06-15T09:30",
    "2017-06-15T09:20",
    "2017-06-15T09:10",
    "2017-06-15T09:00",
    "2017-06-15T08:50"
]

export default function AnchorChoice(props) {

    const [detailedView, setDetailedView] = useState(false);
    const [activeAnchor, setActiveAnchor] = useState(0)

    const [sliderToggler, setSliderToggler] = useState(false);
    const [anchorToggler, setAnchorToggler] = useState(false);
    const [cfToggler, setCfToggler] = useState(false);
    const [fiToggler, setFiToggler] = useState(false);


    return(
        <Box sx={{display: "flex", flexDirection: "row-reverse", alignItems: "start"}}>
            <Box sx={{display: "flex", flexDirection: "column", m: 2}}>
                <Button variant="contained" onClick={props.back}>Zurück</Button>
                <ToggleButtonGroup orientation='vertical' sx={{mt: 2}}>
                    <MyToggleButton selected={sliderToggler} text="Slider" />
                    <MyToggleButton selected={anchorToggler} text="Anchors" />
                    <MyToggleButton selected={cfToggler} text="Counterfactuals" />
                    <MyToggleButton selected={fiToggler} text="Importance" />
                </ToggleButtonGroup>
            </Box>
            <Anchors allDps={props.currentDp} anchors={props.anchors} activeAnchor={activeAnchor} timestamp={timestamps[activeAnchor]}/>
        </Box>
    )
}
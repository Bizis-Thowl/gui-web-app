import { Box, Button, ToggleButtonGroup, Typography } from '@mui/material';
import React from 'react';
import MyToggleButton from './MyToggleButton';
import HelpPopover from './HelpPopover';

export default function ExaminationManagement(props) {

    const {
        backToOverview, 
        toggleSlider, toggleAnchor, toggleFi, toggleMore,
        showSlider, showAnchor, showFi, showMore
    } = props

    return(
        <Box sx={{display: "flex", flexDirection: "column", m: 2}}>
            <Button variant="contained" onClick={backToOverview}>Back</Button>
            <Box sx={{display: "flex", alignItems: "center", mt: 2}}>
                <Typography>Augmentations:</Typography>
                <HelpPopover info={["Click on a button below to augment the examination view"]} notAbsolute/>
            </Box>
            <ToggleButtonGroup orientation='vertical' sx={{mt: 2}}>
                <MyToggleButton onClick={toggleSlider} selected={showSlider} text="Slider" />
                <MyToggleButton onClick={toggleAnchor} selected={showAnchor} text="Anchor" />
                <MyToggleButton onClick={toggleFi} selected={showFi} text="Importance" />
                <MyToggleButton onClick={toggleMore} selected={showMore} text="Show More" />
            </ToggleButtonGroup>
        </Box>
    )
}
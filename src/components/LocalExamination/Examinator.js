import { Box } from '@mui/material';
import React, { useState } from 'react';
import ExaminationManagement from './ExaminationManagement';
import LocalExamination from './LocalExamination';

export default function Examinator(props) {

    const [showSlider, setShowSlider] = useState(false);
    const [showAnchor, setShowAnchor] = useState(false);
    const [showFi, setShowFi] = useState(false);
    const [showMore, setShowMore] = useState(false);

    const toggleSlider = () => {
        setShowSlider(!showSlider)
    }
    const toggleAnchor = () => {
        setShowAnchor(!showAnchor)
    }
    const toggleFi = () => {
        setShowFi(!showFi)
    }
    const toggleMore = () => {
        setShowMore(!showMore)
    }
    
    return(
        <Box sx={{display: "flex"}}>
            <LocalExamination
                 allDps={props.allDps} anchors={props.anchors} activeAnchor={props.activeAnchor} timestamp={props.timestamp}
                 showSlider={showSlider} showAnchor={showAnchor} showFi={showFi} showMore={showMore}
            />
            <ExaminationManagement
                backToOverview={props.backToOverview} 
                toggleSlider={toggleSlider} toggleAnchor={toggleAnchor} toggleFi={toggleFi} toggleMore={toggleMore}
                showSlider={showSlider} showAnchor={showAnchor} showFi={showFi} showMore={showMore}
            />
        </Box>
    )
}
import { Box } from '@mui/material';
import React, { useState } from 'react';
import ExaminationManagement from './ExaminationManagement';
import LocalExamination from './LocalExamination';

export default function Examinator(props) {

    const default_config = false
    const deactivate_manager = false

    const [showSlider, setShowSlider] = useState(default_config);
    const [showAnchor, setShowAnchor] = useState(default_config);
    const [showFi, setShowFi] = useState(default_config);
    const [showMore, setShowMore] = useState(default_config);

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
            {
                !deactivate_manager &&
                <ExaminationManagement
                    backToOverview={props.backToOverview} 
                    toggleSlider={toggleSlider} toggleAnchor={toggleAnchor} toggleFi={toggleFi} toggleMore={toggleMore}
                    showSlider={showSlider} showAnchor={showAnchor} showFi={showFi} showMore={showMore}
                />
            }
        </Box>
    )
}
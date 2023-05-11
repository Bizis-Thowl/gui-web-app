import { Box, Paper, Tooltip } from '@mui/material';
import React from 'react';

const width = 200

export function OneBarsPlot(props) {

    return(
        <Box sx={{display: "flex", flexDirection: "row"}}>
            <Tooltip title={props.anchor}>
                <Paper sx={{width: width, backgroundColor: "lightblue", height: "10px"}}/>
            </Tooltip>
        </Box>
    )
}

export function TwoBarsPlot(props) {

    const {value, cond, min, max} = props;

    let width_1_ratio;
    let width_2_ratio;

    let left_color;
    let right_color;

    let proportion = (parseFloat(value) - min) / (max - min)
    if (proportion > 1) { 
        proportion = 1.0 
    } else if (proportion <= 0) {
        proportion = 0
    }

    const left_condition = cond === "<=" || cond === "<"

    let out;

    width_1_ratio = proportion
    width_2_ratio = 1-proportion

    const width_1 = parseInt(width_1_ratio * width) + "px"
    const width_2 =  parseInt(width_2_ratio * width) + "px"

    if (left_condition && proportion > 0) {
        left_color = "lightblue"
        right_color = "orange"
        out = 
        <Box sx={{display: "flex", flexDirection: "row"}}>
            <Tooltip title={props.anchor}>
                <Paper sx={{width: width_1, backgroundColor: left_color, height: "10px"}}/>
            </Tooltip>
            <Paper sx={{width: width_2, backgroundColor: right_color, height: "10px"}}/>
        </Box>
    } else {
        left_color = "orange"
        right_color = "lightblue"
        out = 
        <Box sx={{display: "flex", flexDirection: "row"}}>
            <Paper sx={{width: width_1, backgroundColor: left_color, height: "10px"}}/>
            <Tooltip title={props.anchor}>
                <Paper sx={{width: width_2, backgroundColor: right_color, height: "10px"}}/>
            </Tooltip>
        </Box>
    }

    return out
}

export function ThreeBarsPlot(props) {

    const {value1, value2, min, max} = props;

    let proportion1 = (parseFloat(value1) - min) / (max - min)
    if (proportion1 > 1) { 
        proportion1 = 1.0
    }
    let proportion2 = 1 - ((parseFloat(value2) - min) / (max - min))
    if (proportion2 > 1) { 
        proportion2 = 1.0
    }

    const left_color = "lightblue"
    const right_color = "orange"
    const width_1_ratio = proportion1
    const width_2_ratio = 1-(proportion2+proportion1)
    const width_3_ratio = proportion2

    const width_1 = parseInt(width_1_ratio * width) + "px"
    const width_2 =  parseInt(width_2_ratio * width) + "px"
    const width_3 =  parseInt(width_3_ratio * width) + "px"

    return(
        <Box sx={{display: "flex", flexDirection: "row"}}>
            <Paper sx={{width: width_1, backgroundColor: right_color, height: "10px"}}/>
            <Tooltip title={props.anchor}>
                <Paper sx={{width: width_2, backgroundColor: left_color, height: "10px"}}/>
            </Tooltip>
            <Paper sx={{width: width_3, backgroundColor: right_color, height: "10px"}}/>
        </Box>
    )
}
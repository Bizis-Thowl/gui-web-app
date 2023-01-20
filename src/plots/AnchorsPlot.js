import { Box, Button, IconButton, Paper, TextField, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import EjectIcon from '@mui/icons-material/Eject';
// import HorizontalDrag from '../utils/HorizontalDrag';

const width = 200

export default function AnchorsPlot(props) {

    const {value1, cond1, feature, 
        cond2, value2, getValueRange, 
        anchor, currentValue} = props;
    
    const [dpValue, setDpValue] = useState(currentValue);
    const [fieldValue, setFieldValue] = useState("");

    const handleDpValue = () => {
        setDpValue(parseFloat(fieldValue))
    }

    const handleFieldValue = (e) => {
        setFieldValue(e.target.value)
    }

    const value_range = getValueRange(feature)

    const min = value_range[0]
    const max = value_range[1]
    
    let valueProportion = ((parseFloat(dpValue) - min) / (max - min)) * 100

    let plot;
    const no_range = min === max

    if (no_range) {
        plot = <OneBarsPlot anchor={anchor} min={min}/>
    } else if (value1) {
        plot = <ThreeBarsPlot anchor={anchor} value1={value1} value2={value2} 
                min={min} max={max}
        />
    } else {
        plot = <TwoBarsPlot anchor={anchor} value={value2} cond={cond2} min={min} max={max}/>
    }

    return(
        <Box sx={{mb: 1}}>
            <Typography align="left">{feature}:</Typography>
            <Box sx={{height: "70px"}}>
                {
                    no_range ?
                    <Box sx= {{display: "flex", justifyContent: "center"}}>
                        <Typography>{min}</Typography>
                    </Box>
                    :
                    <Box sx={{display: "flex", justifyContent: "space-between"}}>
                        <Typography>{min}</Typography>
                        <Typography>{max}</Typography>
                    </Box>
                }
                {plot}
                {/* <HorizontalDrag elem= */}
                <Box sx={{position: "relative"}}>
                    <IconButton size="small" sx={{position: "absolute", left: valueProportion + "%", top: -7, transform: "translate(-55%, 0%)"}}>
                        <EjectIcon sx={{fontSize: 20}} />
                    </IconButton>
                    <Typography sx={{position: "absolute", left: valueProportion + "%", top: 15, transform: "translate(-55%, -5%)"}}>{dpValue}</Typography>
                </Box>
                {/* /> */}
            </Box>
        </Box>
    )
}

function OneBarsPlot(props) {

    return(
        <Box sx={{display: "flex", flexDirection: "row"}}>
            <Tooltip title={props.anchor}>
                <Paper sx={{width: width, backgroundColor: "blue", height: "10px"}}/>
            </Tooltip>
        </Box>
    )
}

function TwoBarsPlot(props) {

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
        left_color = "blue"
        right_color = "red"
        out = 
        <Box sx={{display: "flex", flexDirection: "row"}}>
            <Tooltip title={props.anchor}>
                <Paper sx={{width: width_1, backgroundColor: left_color, height: "10px"}}/>
            </Tooltip>
            <Paper sx={{width: width_2, backgroundColor: right_color, height: "10px"}}/>
        </Box>
    } else {
        left_color = "red"
        right_color = "blue"
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

function ThreeBarsPlot(props) {

    const {value1, value2, min, max} = props;

    let proportion1 = (parseFloat(value1) - min) / (max - min)
    if (proportion1 > 1) { 
        proportion1 = 1.0
    }
    let proportion2 = 1 - ((parseFloat(value2) - min) / (max - min))
    if (proportion2 > 1) { 
        proportion2 = 1.0
    }

    const left_color = "blue"
    const right_color = "red"
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
import { Slider } from "@mui/material"
import { useState } from "react"

export default function MySlider(props) {

    const [updateSlider, setUpdateSlider] = useState(props.histLookback)

    const handleSliderChange = (value) => {
        setUpdateSlider(value)
    }
    
    function valuetext(value) {
        
        return `${value} Tage`;
    }

    return(
        <Slider
                aria-label="Small steps"
                value={updateSlider}
                onChange={(e, value) => handleSliderChange(value)}
                onChangeCommitted={(e, value) => props.setHistLookback(value)}
                getAriaValueText={valuetext}
                step={1}
                marks
                min={1}
                max={60}
                valueLabelDisplay="auto"
                sx={{maxWidth: 400}}
        />     
    )
}
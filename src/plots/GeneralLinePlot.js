import { Box } from '@mui/material';
import React from 'react';
import Plot from 'react-plotly.js';

export default function GeneralLinePlot(props) {

    const { elems } = props

    const maxElementsToShow = 300
    const modulo = Math.ceil(props.timestamps.length / maxElementsToShow)


    const indexes = props.timestamps.filter(function(value, index, Arr) {
        return index % modulo === 0;
    })

    const renderPlots = () => {

        const plots = []

        for (const [key, value] of Object.entries(elems)) {
            plots.push(
                <Plot
                    key={key}

                    data={[{
                        
                        x: indexes,

                        y: value.filter(function(value, index, Arr) { return index % modulo === 0;}),

                        type: 'line',

                        mode: 'markers',

                        marker: {color: 'red', size: 2},

                    }]}

                    layout={ {width: 320, height: 240, title: key} }

                />
            )
        }

        return plots
    }

    return(
        <Box sx={{display: "flex", flexWrap: "wrap"}}>
            {renderPlots()}

        </Box>
    )
}
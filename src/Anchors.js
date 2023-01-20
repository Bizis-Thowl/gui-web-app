import { Typography, Box, Paper } from '@mui/material';
import React from 'react';
import AnchorsPlot from './plots/AnchorsPlot';
import { colors } from './utils/colors';
import { parseAnchor } from './utils/parseAnchor';

export default function Anchors(props) {

    const {currentDp, anchors} = props;

    const getValueRange = (iter) => {
        let min=Infinity;
        let max=-Infinity;
        for (let elem_str of currentDp[iter]){
            const elem = parseInt(elem_str)
            if (elem < min) {
                min = elem
            } else if (elem > max) {
                max = elem
            }
        }

        return [min, max]
    }

    const plot_overview = () => {

        const overview = []

        for (let i in anchors.anchors) {
            overview.push(
                <Paper sx={{m: 2}}>
                    <Typography variant="h4">Anchor {parseInt(i)+1}</Typography>
                    <Box sx={{display: "flex", alignItems: "center", width: 500, justifyContent: "space-around", p: 2}}>
                        <Paper sx={{bgcolor: colors[anchors.preds[i]], p:1}}>
                            <Typography align="center">Vorhersage: <b>{anchors.preds[i]}</b></Typography>
                            <Typography align="center"><b>coverage</b>: {(anchors.coverages[i] * 100).toFixed(2) + " %"}</Typography>
                            <Typography align="center"><b>precision</b>: {(anchors.precisions[i] * 100).toFixed(2) + " %"}</Typography>
                        </Paper>
                        <Box sx={{mb: 2}}>
                            {plot_anchors(anchors.anchors[i], anchors.dps[i])}
                        </Box>

                    </Box>

                </Paper>
            )
        }

        return overview
    }

    const plot_anchors = (conditions, dps) => {
        const anchor_plots = []
        
        for (let i in conditions) {
            let anchor = conditions[i]
            const [value1, cond1, feature, cond2, value2] = parseAnchor(conditions[i]);
            // console.log(elem)
            anchor_plots.push(
                <AnchorsPlot 
                    value1={value1} cond1={cond1} feature={feature} cond2={cond2} value2={value2} 
                    getValueRange={getValueRange} anchor={anchor} currentValue = {dps[feature]}
                />
            )
        }

        return anchor_plots
    }

    return(
        <Box>
            <Typography align="center">Blau: Akzeptierter Wertebereich</Typography>
            <Box sx={{display: "flex", flexWrap: "wrap"}}>
                {plot_overview()}
            </Box>
        </Box>

    )
}
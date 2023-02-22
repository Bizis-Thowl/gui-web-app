import { Typography, Box, Paper, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { fetchPred } from './fetching/general';
import AnchorsPlot from './plots/AnchorsPlot';
import SingleFeaturePlot from './plots/SingleFeaturePlot';
import { colors } from './utils/colors';
import { parseAnchor } from './utils/parseAnchor';

export default function Anchors(props) {

    const {allDps, anchors, activeAnchor, timestamp} = props;

    const currentAnchor = anchors.anchors[activeAnchor]
    const currentPred = anchors.preds[activeAnchor]
    const currentCoverage = anchors.coverages[activeAnchor]
    const currentPrecision = anchors.precisions[activeAnchor]

    const [currentDp, setCurrentDp] = useState(anchors.dps[activeAnchor])
    const [dpPred, setDpPred] = useState("medium")

    useEffect(() => {
        fetchPred(currentDp).then(pred => {
            setDpPred(pred)
        });
    }, [currentDp])

    const updateCurrentDp = (feature, newValue) => {
        setCurrentDp({...currentDp, [feature]: newValue})
    }

    const resetCurrentDp = () => {
        setCurrentDp(anchors.dps[activeAnchor])
    }

    const getValueRange = (feature) => {
        let min=Infinity;
        let max=-Infinity;
        for (let elem_str of allDps[feature]){
            const elem = parseInt(elem_str)
            if (elem < min) {
                min = elem
            } else if (elem > max) {
                max = elem
            }
        }

        return [min, max]
    }


    const plot_anchors = () => {
        const anchor_plots = []
        
        for (let i in currentAnchor) {
            const [value1, cond1, feature, cond2, value2] = parseAnchor(currentAnchor[i]);
            anchor_plots.push(
                <SingleFeaturePlot 
                    value1={value1} cond1={cond1} feature={feature} cond2={cond2} value2={value2} 
                    getValueRange={getValueRange} anchor={currentAnchor[i]} currentValue={currentDp[feature]}
                    updateCurrentDp={updateCurrentDp}
                />
            )
        }

        return anchor_plots
    }

    return(
        <Box>
            <Box sx={{display: "flex", flexWrap: "wrap"}}>
                <Paper sx={{m: 2, p: 2}}>
                    {/* <Paper sx={{
                        bgcolor: colors[currentPred], p:1, display: "flex", 
                        alignItems: "center", justifyContent: "space-around"
                    }}>
                        <Typography variant="h4">Anker</Typography>
                        <Box>
                            <Typography align="center">Vorhersage: <b>{currentPred}</b></Typography>
                            <Typography align="center"><b>coverage</b>: {(currentCoverage * 100).toFixed(2) + " %"}</Typography>
                            <Typography align="center"><b>precision</b>: {(currentPrecision * 100).toFixed(2) + " %"}</Typography>
                        </Box>
                        <Box>
                            <Typography>Zeitpunkt:</Typography>
                            <Typography><b>{timestamp}</b></Typography>
                        </Box>
                    </Paper> */}
                    <Paper sx={{bgcolor: colors[dpPred], mt: 1, p: 1, position: "relative"}}>
                        {/* <Button onClick={resetCurrentDp}
                            sx={{position: "absolute", top: 0, right: 0}}>
                            Reset
                        </Button> */}
                        <Typography>Datenpunkt: <b>{dpPred}</b></Typography>
                    </Paper>
                    <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-around", p: 2, flexWrap: "wrap", width: 800}}>
                        {plot_anchors()}
                    </Box>
                </Paper>
            </Box>
        </Box>
    )
}
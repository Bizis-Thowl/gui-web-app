
import React, { useState } from 'react';
import { Box, Button, Paper, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import HistBarPlot from './plots/HistBarPlot';
import HistTimePlot from './plots/HistTimePlot';
import { getRiskAverage } from './utils/getHighestCount';
import GeneralLinePlot from './plots/GeneralLinePlot';
import GaugeChart from 'react-gauge-chart'
import { label_assignment } from './constants';
import MySlider from './MySlider';

export default function History(props) {

    const [currentWin, setCurrentWin] = useState("features")

    const averagedState = getRiskAverage(props.history.preds)

    const handleWindow = () => {
        setCurrentWin(currentWin === "features" ? "targets" : "features")
    }

    const getGaugeValue = (value) => {

        return Object.keys(label_assignment)[parseInt(averagedState * 5)] + " " + averagedState.toFixed(2) * 100 + "%"
    }

    let otherTitleButton = currentWin === "features" ? "Signale" : "Vorhersagen"

    return(
        <Box sx={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center", maxWidth: 1600 }}>  
            <MySlider setHistLookback={props.setHistLookback} histLookback={props.histLookback}/>
            <Typography>
                Einschätzungen des Modells in den letzten {props.histLookback} Tagen.
            </Typography>
            <ToggleButtonGroup
                color="primary"
                value={otherTitleButton}
                exclusive
                onChange={handleWindow}
                >
                <ToggleButton value="Signale">Signale</ToggleButton>
                <ToggleButton value="Vorhersagen">Vorhersagen</ToggleButton>
            </ToggleButtonGroup>
            {/* <Button variant="contained" onClick={handleWindow}>{otherTitleButton}</Button> */}
            <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        
                <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", m:2}}>
                </Box>
                <Paper sx={{p: 2, m: 2}}>
                {
                    currentWin === "features" 
                    ?
                    <GeneralLinePlot elems={props.currentFeatures}  timestamps={props.history.timestamps}/>
                    :
                    <Box sx={{display: "flex", alignItems: "center"}}>
                        <Paper sx={{width: 300, bgcolor: 'primary.main', height: "fit-content", p: 1}}>
                            
                            <Typography sx={{color: "white"}}>
                                Durchschnitt: 
                            </Typography>
                            <GaugeChart id="gauge-chart1" nrOfLevels={Object.entries(label_assignment).length}
                                        percent={averagedState} 
                                        formatTextValue={getGaugeValue}
                            />
                        </Paper>
                        <HistBarPlot preds={props.history.preds}/>
                        <HistTimePlot timestamps={props.history.timestamps} preds={props.history.preds}/>
                        
                    </Box>
                }
                </Paper>
            </Box>
        </Box>
    )
}


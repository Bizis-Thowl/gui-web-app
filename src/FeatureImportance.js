
import React from 'react';
import { Box, Paper, Typography } from "@mui/material";
import { label_assignment } from './constants';

export default function FeatureImportance(props) {

    const renderPlots = () => {

        const plots = []

        for (let key of Object.keys(label_assignment)) {
            plots.push(
                <Box>
                    <Typography>{key}</Typography>
                    <iframe srcDoc={props.forceplots[key]} width={800} height={165} title={key}/>
                </Box>
            )
        }

        return plots
    }

    return(
        <Box>
            <Box sx={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography variant="h3">Force-Plot Durchschnitt</Typography>
                <Typography>Der Force-Plot beschreibt die Relevanz der verschiedenen Messwerte für die aktuelle Abschätzung. Diese ist der durchschnitt der Vorhersagen über den letzten Tag</Typography>
                <Typography>Ein <b>hoher Wert</b>, ob positiv oder negativ, deutet auf einen <b>hohen Einfluss</b> des Messwertes auf die Abschätzung hin.</Typography>
            
                <Paper sx={{p: 2, m: 2}}>
                    {renderPlots()}
                        
                </Paper>
            </Box>
            <Box sx={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography variant="h3">Detail Force Plot für den aktuellen Tag</Typography>
                {/* <Typography>Der Force-Plot beschreibt die Relevanz der verschiedenen Messwerte für die aktuelle Abschätzung.</Typography> */}
            
                <Paper sx={{p: 2, m: 2}}>
                    <iframe srcDoc={props.forceplotMulti} width={800} height={400}/>
                </Paper>
            </Box>
        </Box>
    )
}
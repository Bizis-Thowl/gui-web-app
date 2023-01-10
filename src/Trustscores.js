import { Box } from '@mui/material';
import React from 'react';
import ScoringScatterPlot from './plots/ScoringScatterPlot';

export default function Trustscores(props) {

    console.log(props.trustscores)

    return(
        <Box>
            <ScoringScatterPlot preds={props.trustscores["predicted_classes"]}  timestamps={props.timestamps}
                closest={props.trustscores["closest_classes"]} scores={props.trustscores["scores"]}
            />
            {/* <HistTimePlot preds={props.trustscores["closest_classes"]}  timestamps={props.timestamps}/>
            <HistTimePlot preds={props.trustscores["closest_classes"]}  timestamps={props.timestamps}/> */}
        </Box>
    )
}
import { Typography, Box, Paper, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { fetchSingleFi } from '../../fetching/feature_importance';
import { fetchPred } from '../../fetching/general';
import SingleFeaturePlot from '../../plots/SingleFeaturePlot';
import { colors } from '../../utils/colors';
import { parseAnchor } from '../../utils/parseAnchor';

export default function LocalExamination(props) {

    const {
        allDps, anchors, activeAnchor, timestamp,
        showSlider, showAnchor, showFi, showMore
    } = props;

    const currentAnchor = anchors.anchors[activeAnchor]
    const currentPred = anchors.preds[activeAnchor]
    const currentCoverage = anchors.coverages[activeAnchor]
    const currentPrecision = anchors.precisions[activeAnchor]

    const currentDp = anchors.dps[activeAnchor]
    const [variableDp, setVariableDp] = useState(anchors.dps[activeAnchor])
    const [dpPred, setDpPred] = useState("medium")
    const [variableDpPred, setVariableDpPred] = useState(dpPred)

    const [shapValues, setShapValues] = useState([]);
    const [variableShapValues, setVariableShapValues] = useState([]);

    const calcSum = (num_list) => {
        return num_list.reduce(function(total, currentValue) {
            return total + Math.abs(currentValue["shapvalue"]);
        }, 0);
    }
    const shapSum = calcSum(shapValues)
    const variableShapSum = calcSum(variableShapValues)

    const calcShapShare = (value, sum) => {
        return value / sum
    }

    useEffect(() => {
        fetchPred(currentDp).then(pred => {
            setDpPred(pred)
        });
    }, [currentDp])

    useEffect(() => {
        fetchSingleFi(currentDp, dpPred).then(values => {
            const myArray = []
            for (let i = 0; i < values["shapvalues"].length; i++) {
                myArray.push(
                    {
                        shapvalue: values["shapvalues"][i],
                        feature: values["featurelist"][i]
                    }
                )
            }
            setShapValues(myArray);
        })
    }, [currentDp, dpPred])

    useEffect(() => {
        fetchSingleFi(variableDp, dpPred).then(values => {
            const myArray = []
            for (let i = 0; i < values["shapvalues"].length; i++) {
                myArray.push(
                    {
                        shapvalue: values["shapvalues"][i],
                        feature: values["featurelist"][i]
                    }
                )
            }
            setVariableShapValues(myArray);
        })
    }, [variableDp, variableDpPred])

    useEffect(() => {
        fetchPred(variableDp).then(pred => {
            setVariableDpPred(pred)
        });
    }, [variableDp])

    function compareShapValues(a, b) {
        return (Math.abs(b["shapvalue"]) - Math.abs(a["shapvalue"]))
    }

    function orderShapValues(values) {
        const tmpShapValues = [...values]
        shapValues.sort(compareShapValues)
        return tmpShapValues
    }

    const updateVariableDp = (feature, newValue) => {
        setVariableDp({...variableDp, [feature]: newValue})
    }

    const resetVariableDp = () => {
        setVariableDp(currentDp)
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

        const orderedShapValues = orderShapValues(shapValues)
        const orderedVariableShapValues = orderShapValues(variableShapValues)
        const myShapValues = orderedShapValues
        const myVariableShapValues = orderedVariableShapValues
        
        for (let i in currentAnchor) {
            const [value1, cond1, feature, cond2, value2] = parseAnchor(currentAnchor[i]);
            const featureIndex = myShapValues.findIndex(value => value["feature"] === feature)
            const shapValue = myShapValues.length !== 0 ? myShapValues[featureIndex]["shapvalue"] : 0
            const shapShare = calcShapShare(shapValue, shapSum)
            const variableFeatureIndex = myVariableShapValues.findIndex(value => value["feature"] === feature)
            const variableShapValue = myVariableShapValues.length !== 0 ? myVariableShapValues[variableFeatureIndex]["shapvalue"] : 0
            const variableShapShare = calcShapShare(variableShapValue, variableShapSum)

            anchor_plots[featureIndex] =
                <Box sx={{display: "flex", alignItems: "center"}}>
                    <SingleFeaturePlot 
                        value1={value1} feature={feature} cond2={cond2} value2={value2} 
                        getValueRange={getValueRange} anchor={currentAnchor[i]} currentValue={currentDp[feature]}
                        variableValue={variableDp[feature]} updateVariableDp={updateVariableDp}
                        showSlider={showSlider} showAnchor={showAnchor}
                    />
                    <Box>
                    {
                        showSlider && showFi &&
                        <Box sx={{display: "flex"}}>
                            <Paper sx={{height: 20, width: Math.abs(variableShapShare*500), mr: 1, backgroundColor: variableShapShare > 0 ? "green" : "red"}}/>
                            <Typography>{(variableShapShare * 100).toFixed(2)}</Typography>
                        </Box>
                    }
                    {
                        showFi &&
                        <Box sx={{display: "flex"}}>
                            <Paper sx={{height: 20, width: Math.abs(shapShare*500), mr: 1, backgroundColor: shapShare > 0 ? "green" : "red"}}/>
                            <Typography>{(shapShare * 100).toFixed(2)}</Typography>
                        </Box>
                    }
                    </Box>
                </Box>
        }

        if (showMore) {
            return anchor_plots
        } else {
            return anchor_plots.slice(0, 4);
        }
    }

    return(
        <Box>
            <Box sx={{display: "flex", flexWrap: "wrap"}}>
                <Paper sx={{m: 2, p: 2, display: "flex"}}>
                    <Box sx={{p: 2}}>
                        {plot_anchors()}
                    </Box>
                    <Box sx={{width: 300}}>
                        <Paper sx={{bgcolor: colors[dpPred], mt: 1, p: 1}}>
                            <Typography>Observing Datapoint: <b>{dpPred}</b></Typography>
                            <Box>
                                <Typography>{timestamp}</Typography>
                                {/* <Typography><b>{timestamp}</b></Typography> */}
                            </Box>
                        </Paper>
                        {
                            showSlider &&
                            <Paper sx={{bgcolor: colors[variableDpPred], mt: 1, p: 1}}>
                                <Typography align="center"><b>Slider</b></Typography>
                                <Typography sx={{mb: 1}}>Changed Datapoint: <b>{variableDpPred}</b></Typography>
                                    <Button onClick={resetVariableDp} variant="contained">
                                        Reset
                                    </Button>
                            </Paper>
                        }
                        {
                            showAnchor &&
                            <Paper sx={{
                                bgcolor: colors[currentPred], p:1, display: "flex", flexWrap: "wrap",
                                alignItems: "center", justifyContent: "space-around", mt: 1, flexDirection: "column"
                            }}>
                                <Typography><b>Anchor</b></Typography>
                                <Box>
                                    <Typography align="center">Prediction: {currentPred}</Typography>
                                    <Typography align="center">Coverage: {(currentCoverage * 100).toFixed(2) + " %"}</Typography>
                                    <Typography align="center">Precision: {(currentPrecision * 100).toFixed(2) + " %"}</Typography>
                                </Box>
                            </Paper>
                        }
                        {
                            showFi &&
                            <Paper sx={{
                                bgcolor: "lightgrey", p:1, display: "flex", flexWrap: "wrap",
                                alignItems: "center", justifyContent: "space-around", mt: 1
                            }}>
                                <Typography><b>Feature Importance</b></Typography>
                                <Box>
                                    <Typography align="left">A positive (negative) importance score increases (decreases) the probability of predicting the given class, given the feature value</Typography>
                                </Box>
                            </Paper>
                        }
                    </Box>
                </Paper>
            </Box>
        </Box>
    )
}
import { Typography, Box, Paper, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchSingleFi } from "../../fetching/feature_importance";
import { fetchPred } from "../../fetching/general";
import SingleFeaturePlot from "../../plots/SingleFeaturePlot";
import { colors } from "../../utils/colors";
import { parseAnchor } from "../../utils/parseAnchor";
import HelpPopover from "./HelpPopover";
import ShapPieChart from "../../plots/ShapPieChart";

export default function LocalExamination(props) {
  const {
    allDps,
    anchors,
    activeAnchor,
    timestamp,
    showSlider,
    showAnchor,
    showFi,
    showMore,
  } = props;

  const currentAnchor = anchors.anchors[activeAnchor];
  const currentPred = anchors.preds[activeAnchor];
  const currentCoverage = anchors.coverages[activeAnchor];
  const currentPrecision = anchors.precisions[activeAnchor];

  const currentDp = anchors.dps[activeAnchor];
  const [variableDp, setVariableDp] = useState(anchors.dps[activeAnchor]);
  const [dpPred, setDpPred] = useState("medium");
  const [variableDpPred, setVariableDpPred] = useState(dpPred);

  const [shapOverview, setShapOverview] = useState(false);
  const [shapValues, setShapValues] = useState([]);
  const [variableShapValues, setVariableShapValues] = useState([]);

  const calcSum = (num_list) => {
    return num_list.reduce(function (total, currentValue) {
      return total + Math.abs(currentValue["shapvalue"]);
    }, 0);
  };
  const shapSum = calcSum(shapValues);
  const variableShapSum = calcSum(variableShapValues);

  const calcShapShare = (value, sum) => {
    return value / sum;
  };

  useEffect(() => {
    fetchPred(currentDp).then((pred) => {
      setDpPred(pred);
    });
  }, [currentDp]);

  useEffect(() => {
    fetchSingleFi(currentDp, dpPred).then((values) => {
      const myArray = [];
      for (let i = 0; i < values["shapvalues"].length; i++) {
        myArray.push({
          shapvalue: values["shapvalues"][i],
          feature: values["featurelist"][i],
        });
      }
      setShapValues(myArray);
    });
  }, [currentDp, dpPred]);

  useEffect(() => {
    fetchSingleFi(variableDp, dpPred).then((values) => {
      const myArray = [];
      for (let i = 0; i < values["shapvalues"].length; i++) {
        myArray.push({
          shapvalue: values["shapvalues"][i],
          feature: values["featurelist"][i],
        });
      }
      setVariableShapValues(myArray);
    });
  }, [variableDp, variableDpPred]);

  useEffect(() => {
    fetchPred(variableDp).then((pred) => {
      setVariableDpPred(pred);
    });
  }, [variableDp]);

  function compareShapValues(a, b) {
    return Math.abs(b["shapvalue"]) - Math.abs(a["shapvalue"]);
  }

  function orderShapValues(values) {
    const tmpShapValues = [...values];
    shapValues.sort(compareShapValues);
    return tmpShapValues;
  }

  const updateVariableDp = (feature, newValue) => {
    setVariableDp({ ...variableDp, [feature]: newValue });
  };

  const resetVariableDp = () => {
    setVariableDp(currentDp);
  };

  const getValueRange = (feature) => {
    let min = Infinity;
    let max = -Infinity;
    for (let elem_str of allDps[feature]) {
      const elem = parseInt(elem_str);
      if (elem < min) {
        min = elem;
      } else if (elem > max) {
        max = elem;
      }
    }

    return [min, max];
  };

  const plot_anchors = () => {
    const anchor_plots = [];

    const orderedShapValues = orderShapValues(shapValues);
    const orderedVariableShapValues = orderShapValues(variableShapValues);
    const myShapValues = orderedShapValues;
    const myVariableShapValues = orderedVariableShapValues;
    const featureList = orderedShapValues.map((v) => v.feature);

    const parsedAnchors = currentAnchor.map((v) => {
      const [value1, cond1, feature, cond2, value2] = parseAnchor(v);
      return {
        value1: value1,
        cond1: cond1,
        feature: feature,
        cond2: cond2,
        value2: value2,
      };
    });

    for (let activeFeature of featureList) {
      const tmpAnchor = parsedAnchors.find((v) => v.feature === activeFeature);
      const featureIndex = myShapValues.findIndex(
        (value) => value["feature"] === activeFeature
      );
      const shapValue =
        myShapValues.length !== 0 ? myShapValues[featureIndex]["shapvalue"] : 0;
      const shapShare = calcShapShare(shapValue, shapSum);
      const variableFeatureIndex = myVariableShapValues.findIndex(
        (value) => value["feature"] === activeFeature
      );
      const variableShapValue =
        myVariableShapValues.length !== 0
          ? myVariableShapValues[variableFeatureIndex]["shapvalue"]
          : 0;
      const variableShapShare = calcShapShare(
        variableShapValue,
        variableShapSum
      );
      let singleFeaturePlot = null;
      if (tmpAnchor) {
        const { value1, cond1, feature, cond2, value2 } = tmpAnchor;
        singleFeaturePlot = (
          <SingleFeaturePlot
            value1={value1}
            feature={feature}
            cond1={cond1}
            cond2={cond2}
            value2={value2}
            getValueRange={getValueRange}
            currentValue={currentDp[feature]}
            variableValue={variableDp[feature]}
            updateVariableDp={updateVariableDp}
            showSlider={showSlider}
            showAnchor={showAnchor}
          />
        );
      } else {
        singleFeaturePlot = (
          <SingleFeaturePlot
            feature={activeFeature}
            getValueRange={getValueRange}
            currentValue={currentDp[activeFeature]}
            variableValue={variableDp[activeFeature]}
            updateVariableDp={updateVariableDp}
            showSlider={showSlider}
            showAnchor={showAnchor}
          />
        );
      }
      anchor_plots[featureIndex] = (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {singleFeaturePlot}
          <Box>
            {showSlider && showFi && (
              <Box sx={{ display: "flex", width: 200, mb: 2 }}>
                <Paper
                  sx={{
                    borderRadius: "10px 0px 0px 10px",
                    height: 20,
                    width: Math.abs(variableShapShare * 200) + "%",
                    backgroundColor: variableShapShare > 0 ? "green" : "red",
                  }}
                />
                <Paper
                  sx={{
                    borderRadius: "0px 10px 10px 0px",
                    height: 20,
                    width: "100%",
                    backgroundColor: "white",
                  }}
                >
                  <Typography>{variableShapValue.toFixed(2)}</Typography>
                </Paper>
              </Box>
            )}
            {showFi ? (
              <Box sx={{ display: "flex", width: 200 }}>
                <Paper
                  sx={{
                    borderRadius: "10px 0px 0px 10px",
                    height: 20,
                    width: Math.abs(shapShare * 200) + "%",
                    backgroundColor: shapShare > 0 ? "green" : "red",
                  }}
                />
                <Paper
                  sx={{
                    borderRadius: "0px 10px 10px 0px",
                    height: 20,
                    width: "100%",
                    backgroundColor: "white",
                  }}
                >
                  <Typography>{shapValue.toFixed(2)}</Typography>
                </Paper>
              </Box>
            ) : (
              <Box sx={{ width: 200 }} />
            )}
          </Box>
        </Box>
      );
    }

    if (showMore) {
      return anchor_plots;
    } else {
      return anchor_plots.slice(0, 3);
    }
  };

  return (
    <Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <Paper sx={{ m: 2, p: 2, display: "flex" }}>
          <Box sx={{ p: 2 }}>{plot_anchors()}</Box>
          <Box sx={{ width: 300 }}>
            <Paper
              sx={{
                bgcolor: colors[dpPred],
                mt: 1,
                p: 1,
                position: "relative",
              }}
            >
              <HelpPopover
                info={[
                  "Here you can see the prediction and date of the datapoint under examination",
                ]}
              />
              <Typography>
                Observing Datapoint: <b>{dpPred}</b>
              </Typography>
              <Box>
                <Typography>{timestamp}</Typography>
              </Box>
            </Paper>
            {showSlider && (
              <Paper
                sx={{
                  bgcolor: colors[variableDpPred],
                  mt: 1,
                  p: 1,
                  position: "relative",
                }}
              >
                <HelpPopover
                  info={[
                    "Here you can see the prediction of the data point you have set with the slider and you can reset it to the initial datapoint.",
                  ]}
                />
                <Typography align="center">
                  <b>Slider</b>
                </Typography>
                <Typography sx={{ mb: 1 }}>
                  Changed Datapoint: <b>{variableDpPred}</b>
                </Typography>
                <Button onClick={resetVariableDp} variant="contained">
                  Reset
                </Button>
              </Paper>
            )}
            {showAnchor && (
              <Paper
                sx={{
                  bgcolor: "lightblue",
                  p: 1,
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-around",
                  mt: 1,
                  flexDirection: "column",
                  position: "relative",
                }}
              >
                <HelpPopover
                  info={[
                    "The anchor provides an orientation in which limits the predictions are very likely to remain the same as the datapoint under observation.",
                    "The coverage provides information on how many datapoints from the training data are part of these limits.",
                    "The precision provides information " +
                      "about the percentage of these datapoints that are classified with the same prediction as the datapoint under observation.",
                  ]}
                />
                <Typography>
                  <b>Anchor</b>
                </Typography>
                <Box>
                  <Typography align="center">
                    Prediction: {currentPred}
                  </Typography>
                  <Typography align="center">
                    Coverage: {(currentCoverage * 100).toFixed(2) + " %"}
                  </Typography>
                  <Typography align="center">
                    Precision: {(currentPrecision * 100).toFixed(2) + " %"}
                  </Typography>
                </Box>
              </Paper>
            )}
            {showFi && (
              <Paper
                sx={{
                  bgcolor: "lightgrey",
                  p: 1,
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-around",
                  mt: 1,
                  position: "relative",
                }}
              >
                <HelpPopover
                  info={[
                    "The feature contribution (FC) describes how each feature effects the observed prediction of the model. " +
                      "For example, a negative FC means that the feature drags the model decision away from its observed prediction. ",
                    "It is important to keep in mind that the sum of the values is not an indicator for the model prediction, i.e. a negative " +
                      "sum of all FC values does not mean that the prediction changes or is invalid.",
                    "If the slider is activated, the upper FC value corresponds to the changed datapoint " +
                      "and the lower FC value corresponds to the data point under observation.",
                  ]}
                />
                <Typography>
                  <b>Feature Contribution</b>
                </Typography>
                <Box sx={{ m: 2 }}>
                  <Button
                    onClick={() => {
                      setShapOverview(!shapOverview);
                    }}
                  >
                    Toggle overview
                  </Button>
                  {shapOverview && (
                    <Box>
                      <Typography>Shap for observed data point:</Typography>
                      <ShapPieChart shapValues={shapValues} />
                      {
                        showSlider &&
                        <Box>
                        <Typography>Shap for changed data point:</Typography>
                        <ShapPieChart
                          shapValues={variableShapValues}
                          featureOrder={shapValues.map((v) => v.feature)}
                        />

                        </Box>
                      }
                    </Box>
                  )}
                </Box>
              </Paper>
            )}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

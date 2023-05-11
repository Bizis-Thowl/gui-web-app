import { Box, Paper, Slider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import EjectIcon from "@mui/icons-material/Eject";
import { OneBarsPlot, ThreeBarsPlot, TwoBarsPlot } from "./AnchorsPlot";
import HelpPopover from "../components/LocalExamination/HelpPopover";

const width = 200;

export default function SingleFeaturePlot(props) {
  const {
    getValueRange,
    currentValue,
    variableValue,
    updateVariableDp,
    feature,
    showSlider,
    showAnchor,
    value1,
    cond1,
    cond2,
    value2,
  } = props;

  const [localDp, setLocalDp] = useState(variableValue);

  const value_range = getValueRange(feature);

  const min = value_range[0];
  const max = value_range[1];
  const noRange = min === max;
  const minMaxWidth = 40;

  let anchor = "   ";

  if (value2 === undefined) {
    anchor = min + " <= " + feature + " <= " + max;
  } else if (value1 === undefined) {
    anchor = feature + " " + cond2 + " " + value2;
  } else {
    anchor = value1 + " " + cond1 + " " + feature + " " + cond2 + " " + value2;
  }

  let valueProportion = (value) =>
    ((parseFloat(value) - min) / (max - min)) * 100;

  useEffect(() => {
    setLocalDp(variableValue);
  }, [variableValue]);

  const handleDpValue = (e) => {
    updateVariableDp(feature, localDp);
  };

  const handleLocalDp = (e) => {
    setLocalDp(parseFloat(e.target.value));
  };

  const plot = () => {
    if (!showAnchor) {
      return (
        <Paper sx={{ width: width, backgroundColor: "grey", height: "10px" }} />
      );
    } else {
      return chooseAnchorPlot();
    }
  };

  const chooseAnchorPlot = () => {
    if (value2 === undefined) {
      return <OneBarsPlot anchor={anchor} min={min} />;
    } else if (noRange) {
      return <OneBarsPlot anchor={anchor} min={min} />;
    } else if (value1) {
      return (
        <ThreeBarsPlot
          anchor={anchor}
          value1={value1}
          value2={value2}
          min={min}
          max={max}
        />
      );
    } else {
      return (
        <TwoBarsPlot
          anchor={anchor}
          value={value2}
          cond={cond2}
          min={min}
          max={max}
        />
      );
    }
  };

  return (
    <Paper sx={{ p: 2, m: 2, position: "relative" }}>
      <HelpPopover
        info={[
          "Here you can see the individual feature with min and max value to the left and right of the bar and the actual feature value indicated by a black arrow.",
          showSlider && "Slider: Changing the feature with the slider will update the model prediction. The changed feature value is indicated by a red arrow",
          showAnchor && "Anchor: The anchor is indicated as the light blue area of the bar. If ALL feature values are inside the light blue area it is very likely to be part of the anchored class."
        ]}
        id={"feature_info " + feature}
      />
      <Typography>{feature}</Typography>
      <Box
        sx={{
          height: "120px",
          width: 300,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {showSlider && (
          <Box sx={{ width: 200 }}>
            <Slider
              min={min}
              max={max}
              valueLabelDisplay="auto"
              value={localDp}
              onChangeCommitted={handleDpValue}
              onChange={handleLocalDp}
              step={0.1}
            />
            <Box sx={{ position: "relative", mt: 4 }}>
              <Typography
                sx={{
                  position: "absolute",
                  left: valueProportion(variableValue) + "%",
                  bottom: 15,
                  transform: "translate(-55%, -5%)",
                  color: "red",
                }}
              >
                {variableValue}
              </Typography>
              <EjectIcon
                sx={{
                  position: "absolute",
                  left: parseFloat(valueProportion(variableValue) - 10) + "%",
                  bottom: -2,
                  transform: "translate(-50%, 0%)",
                  fontSize: 20,
                  rotate: "180deg",
                  color: "red",
                }}
              />
            </Box>
          </Box>
        )}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ width: minMaxWidth }}>{min}</Typography>
          {plot()}
          <Typography sx={{ width: minMaxWidth }}>{max}</Typography>
        </Box>
        <Box sx={{ position: "relative", width: 200 }}>
          <EjectIcon
            sx={{
              position: "absolute",
              left: valueProportion(currentValue) + "%",
              top: -2,
              transform: "translate(-50%, 0%)",
              fontSize: 20,
            }}
          />
          <Typography
            sx={{
              position: "absolute",
              left: valueProportion(currentValue) + "%",
              top: 15,
              transform: "translate(-55%, -5%)",
            }}
          >
            {currentValue}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

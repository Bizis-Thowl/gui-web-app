import { Box, Button, ToggleButtonGroup, Typography } from "@mui/material";
import React, { useState } from "react";
import MyToggleButton from "./MyToggleButton";
import HelpPopover from "./HelpPopover";
import FinishModal from "./FinishModal";
import { ArrowBack } from "@mui/icons-material";

export default function ExaminationManagement(props) {
  const {
    backToOverview,
    toggleSlider,
    toggleAnchor,
    toggleFi,
    toggleMore,
    showSlider,
    showAnchor,
    showFi,
    showMore,
    lockedSlider,
    lockedAnchor,
    lockedFi,
    unlockSlider,
    unlockAnchor,
    unlockFi
  } = props;

  console.log(lockedFi)
  const components = ["slider", "anchor", "relevance"];

  const toggleButtonDict = {
    slider: (
      <MyToggleButton
        toggle={toggleSlider}
        selected={showSlider}
        text="Slider"
        information="The Slider component enables you to change the data point under observation and study how the prediction from the model varies."
        handleUnlocking={unlockSlider}
        locked={lockedSlider}
      />
    ),
    anchor: (
      <MyToggleButton
        toggle={toggleAnchor}
        selected={showAnchor}
        text="Anchor"
        information="The Anchor component offers you an augmentation of the value range (grey bar) and provides you with a sub-range in which it is very likely that the prediction stays the same."
        handleUnlocking={unlockAnchor}
        locked={lockedAnchor}
      />
    ),
    relevance: (
      <MyToggleButton
        toggle={toggleFi}
        selected={showFi}
        text="Relevance"
        information="The Relevance component provides you with information on in which way and how much each feature value contributes to the prediction."
        handleUnlocking={unlockFi}
        locked={lockedFi}
      />
    ),
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", m: 2 }}>
      <Button
        variant="contained"
        onClick={backToOverview}
        startIcon={<ArrowBack />}
      >
        To Overview
      </Button>
      <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
        <Typography>Augmentations:</Typography>
        <HelpPopover
          info={["Click on a button below to augment the examination view"]}
          notAbsolute
        />
      </Box>
      <ToggleButtonGroup orientation="vertical" sx={{ mt: 2 }}>
        {components.map(v => toggleButtonDict[v])}
        <MyToggleButton
          toggle={toggleMore}
          selected={showMore}
          text="Show More"
          information="You can toggle this button to switch between seeing the three most relevant features or seeing all features"
        />
      </ToggleButtonGroup>
      <FinishModal />
    </Box>
  );
}

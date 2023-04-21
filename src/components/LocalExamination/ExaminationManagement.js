import { Box, Button, ToggleButtonGroup, Typography } from "@mui/material";
import React, { useState } from "react";
import MyToggleButton from "./MyToggleButton";
import HelpPopover from "./HelpPopover";

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
  } = props;

  const [lockedSegments, setLockedSegements] = useState([
    true,
    true,
    true,
  ]);

  const handleUnlocking = (index) => {
    setLockedSegements(
      lockedSegments.map((v, i) => {
        if (i === index) return false;
        else return v;
      })
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", m: 2 }}>
      <Button variant="contained" onClick={backToOverview}>
        Back
      </Button>
      <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
        <Typography>Augmentations:</Typography>
        <HelpPopover
          info={["Click on a button below to augment the examination view"]}
          notAbsolute
        />
      </Box>
      <ToggleButtonGroup orientation="vertical" sx={{ mt: 2 }}>
        <MyToggleButton
          toggle={toggleSlider}
          selected={showSlider}
          text="Slider"
          information="The Slider component enables you to change the data point under observation and study how the prediction from the model varies."
          handleUnlocking={() => handleUnlocking(0)}
          locked={lockedSegments[0]}
        />
        <MyToggleButton
          toggle={toggleAnchor}
          selected={showAnchor}
          text="Anchor"
          information="The Anchor component offers you an augmentation of the value range (grey bar) and provides you with a sub-range in which it is very likely that the prediction stays the same."
          handleUnlocking={() => handleUnlocking(1)}
          locked={lockedSegments[1]}
        />
        <MyToggleButton
          toggle={toggleFi}
          selected={showFi}
          text="Relevance"
          information="The Relevance component provides you with information on in which way and how much each feature value contributes to the prediction."
          handleUnlocking={() => handleUnlocking(2)}
          locked={lockedSegments[2]}
        />
        <MyToggleButton
          toggle={toggleMore}
          selected={showMore}
          text="Show More"
          information="You can toggle this button to switch between seeing the three most relevant features or seeing all features"
        />
      </ToggleButtonGroup>
    </Box>
  );
}

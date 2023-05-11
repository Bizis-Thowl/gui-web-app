import { Visibility } from "@mui/icons-material";
import { Box, Button, Paper, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import Examinator from "./Examinator";
import { colors } from "../../utils/colors";

const timestamps = [
  "2017-06-15T09:30",
  "2017-06-15T09:20",
  "2017-06-15T09:10",
  "2017-06-15T09:00",
  "2017-06-15T08:50",
];

export default function ExaminationChoice(props) {
  const [detailedView, setDetailedView] = useState(false);
  const [activeAnchor, setActiveAnchor] = useState(0);

  const handleDetailView = (iterator) => {
    setDetailedView(true);
    setActiveAnchor(iterator);
  };

  const backToOverview = () => {
    setDetailedView(false);
  };

  const anchorChooser = () => {
    const choices = [];

    const preds = props.anchors.preds;

    for (let i = preds.length - 1; i >= 0; i--) {
      const disabled = i !== 4;

      choices.push(
        <Paper sx={{ m: 2, p: 2 }} key={timestamps[i]}>
          <Paper sx={{ bgcolor: colors[preds[i]], mb: 1 }}>
            <Typography>{preds[i]}</Typography>
          </Paper>
          <Typography>{timestamps[i]}</Typography>
          <Tooltip title={disabled ? "This is locked for the evaluation" : ""}>
            <span>
              <Button disabled={disabled} onClick={() => handleDetailView(i)}>
                <Visibility />
              </Button>
            </span>
          </Tooltip>
        </Paper>
      );
    }

    return choices;
  };

  if (!detailedView) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography variant="h2">Overview</Typography>
        <Box sx={{ display: "flex" }}>{anchorChooser()}</Box>
      </Box>
    );
  } else {
    return (
      <Examinator
        backToOverview={backToOverview}
        allDps={props.currentDp}
        anchors={props.anchors}
        activeAnchor={activeAnchor}
        timestamp={timestamps[activeAnchor]}
      />
    );
  }
}

import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ExaminationManagement from "./ExaminationManagement";
import LocalExamination from "./LocalExamination";

export default function Examinator(props) {
  const default_show = false;
  const default_locked = true;
  const deactivate_manager = false;

  const [showSlider, setShowSlider] = useState(
    localStorage.getItem("showSlider")
      ? Boolean(JSON.parse(localStorage.getItem("showSlider")))
      : default_show
  );
  const [lockedSlider, setLockedSlider] = useState(
    localStorage.getItem("lockedSlider")
      ? Boolean(JSON.parse(localStorage.getItem("lockedSlider")))
      : default_locked
  );
  const [showAnchor, setShowAnchor] = useState(
    localStorage.getItem("showAnchor")
      ? Boolean(JSON.parse(localStorage.getItem("showAnchor")))
      : default_show
  );
  const [lockedAnchor, setLockedAnchor] = useState(
    localStorage.getItem("lockedAnchor")
      ? Boolean(JSON.parse(localStorage.getItem("lockedAnchor")))
      : default_locked
  );
  const [showFi, setShowFi] = useState(
    localStorage.getItem("showFi")
      ? Boolean(JSON.parse(localStorage.getItem("showFi")))
      : default_show
  );
  const [lockedFi, setLockedFi] = useState(
    localStorage.getItem("lockedFi")
      ? Boolean(JSON.parse(localStorage.getItem("lockedFi")))
      : default_locked
  );
  const [showMore, setShowMore] = useState(default_show);

  useEffect(() => {
    localStorage.setItem("showSlider", JSON.stringify(showSlider));
  }, [showSlider]);
  useEffect(() => {
    localStorage.setItem("showAnchor", JSON.stringify(showAnchor));
  }, [showAnchor]);
  useEffect(() => {
    localStorage.setItem("showFi", JSON.stringify(showFi));
  }, [showFi]);
  useEffect(() => {
    localStorage.setItem("lockedSlider", JSON.stringify(lockedSlider));
  }, [lockedSlider]);
  useEffect(() => {
    localStorage.setItem("lockedAnchor", JSON.stringify(lockedAnchor));
  }, [lockedAnchor]);
  useEffect(() => {
    localStorage.setItem("lockedFi", JSON.stringify(lockedFi));
  }, [lockedFi]);

  const toggleSlider = () => {
    setShowSlider(!showSlider);
  };
  const toggleAnchor = () => {
    setShowAnchor(!showAnchor);
  };
  const toggleFi = () => {
    setShowFi(!showFi);
  };
  const toggleMore = () => {
    setShowMore(!showMore);
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h2">Examination View</Typography>
      <Typography sx={{ fontWeight: 500, width: 900 }}>
        Your Task: Figure out how trustworthy the current model prediction is.
        If you have found reasons for your assessment, click the button on the
        bottom right to hand-in the answer. Even if you still feel puzzled after
        examining all available information hand-in your thoughts and
        understanding. There is no wrong answer. Thank you :-)
      </Typography>
      <Box sx={{ display: "flex" }}>
        <LocalExamination
          allDps={props.allDps}
          anchors={props.anchors}
          activeAnchor={props.activeAnchor}
          timestamp={props.timestamp}
          showSlider={showSlider}
          showAnchor={showAnchor}
          showFi={showFi}
          showMore={showMore}
        />
        {!deactivate_manager && (
          <ExaminationManagement
            backToOverview={props.backToOverview}
            toggleSlider={toggleSlider}
            toggleAnchor={toggleAnchor}
            toggleFi={toggleFi}
            toggleMore={toggleMore}
            showSlider={showSlider}
            showAnchor={showAnchor}
            showFi={showFi}
            showMore={showMore}
            lockedAnchor={lockedAnchor}
            lockedSlider={lockedSlider}
            lockedFi={lockedFi}
            unlockSlider={() => setLockedSlider(false)}
            unlockAnchor={() => setLockedAnchor(false)}
            unlockFi={() => setLockedFi(false)}
          />
        )}
      </Box>
    </Box>
  );
}

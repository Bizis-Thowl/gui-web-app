import { Visibility, VisibilityOff, LockRounded } from "@mui/icons-material";
import { Box, Button, ToggleButton } from "@mui/material";
import React, { useContext, useState } from "react";
import InformationModal from "./InformationModal";
import HelpPopover from "./HelpPopover";

import { globalClickContext } from "../../App";

export default function MyToggleButton(props) {
  const { toggle, selected, text, information, handleUnlocking, locked } =
    props;

    
  const {handleClickTracker} = useContext(globalClickContext)

  const [modalOpen, setModalOpen] = useState(false);

  const handleToggling = () => {
    toggle()
    handleClickTracker("toggled " + text);
  }

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleModalUnlocking = () => {
    setModalOpen(false);
    handleUnlocking();
    handleClickTracker("unlocked " + text);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {!locked ? (
        <VisibilityButton toggle={handleToggling} selected={selected} text={text} />
      ) : (
        <LockedButton text={text} handleOpen={handleModalOpen} />
      )}
      <HelpPopover info={[information]} notAbsolute id={text + "_info1"}/>
      <InformationModal
        componentText={text}
        info={information}
        open={modalOpen}
        handleClose={handleModalClose}
        handleUnlocking={handleModalUnlocking}
      />
    </Box>
  );
}

function LockedButton({ text, handleOpen }) {
  return (
    <Button
      variant="contained"
      endIcon={<LockRounded />}
      onClick={handleOpen}
      sx={{ m: 1, width: 150 }}
    >
      {text}
    </Button>
  );
}

function VisibilityButton({ toggle, selected, text }) {
  return (
    <ToggleButton
      sx={{
        display: "flex",
        justifyContent: "space-between",
        m: 1,
        width: 150,
      }}
      onClick={toggle}
      selected={selected}
    >
      {text}
      {selected ? <Visibility /> : <VisibilityOff />}
    </ToggleButton>
  );
}

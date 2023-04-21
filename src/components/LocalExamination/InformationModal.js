import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Box, Paper } from "@mui/material";
import { useState } from "react";

const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  p: 4,
};

export default function InformationModal(props) {
  const { componentText, info, open, handleClose, handleUnlocking } = props;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Paper sx={style}>
        <Typography variant="h6" component="h2">
          The {componentText} component
        </Typography>
        <Typography sx={{ mt: 2 }}>
          {info}
        </Typography>
        <Typography sx={{ mt: 2, fontWeight: 500 }}>
            Please do not unlock this component if you have not understood the currently available concepts of the examination view.
        </Typography>
        <Button  sx={{mt: 2}} variant="contained" onClick={handleUnlocking}>unlock</Button>
      </Paper>
    </Modal>
  );
}

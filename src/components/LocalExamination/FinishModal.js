import {
    CheckCircle,
  SentimentVerySatisfied,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function FinishModal(props) {
  const [open, setOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmission = () => {
    setSubmitted(true);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Button
        onClick={handleOpen}
        variant="contained"
        color="secondary"
        fullWidth
        endIcon={<CheckCircle/>}
      >
        Hand In
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Paper
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            p: 2,
          }}
        >
          {!submitted ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-around",
                minHeight: 300,
              }}
            >
              <Typography align="justify" sx={{ mb: 2, fontWeight: 500 }}>
                How trustworthy is the model prediction under examination?
              </Typography>
              <Typography align="justify" sx={{ mb: 2 }}>
                Please provide reasons for your assessment. Even if you do not
                have a clear answer, formulate your thoughts.
              </Typography>
              <TextField
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                multiline
                fullWidth
                rows={3}
              />
              <Button
                variant="contained"
                sx={{ mt: 1 }}
                disabled={answer.length === 0}
                onClick={handleSubmission}
              >
                Submit
              </Button>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-around",
                minHeight: 300,
              }}
            >
              <Typography variant="h2">Thank you for participating!</Typography>
              <SentimentVerySatisfied
                color="secondary"
                sx={{ fontSize: 128 }}
              />
            </Box>
          )}
        </Paper>
      </Modal>
    </Box>
  );
}

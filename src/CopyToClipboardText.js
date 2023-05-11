import { ContentCopy } from "@mui/icons-material";
import { Box, IconButton, Paper, Snackbar, Typography } from "@mui/material";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

export default function CopyToClipboardText({ text }) {
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);

  const handleCopy = (e) => {
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{ position: "absolute", top: 0, right: 0, m: 1, p: 1, borderRadius: 1, bgcolor: "secondary.lightest" }}
    >
      <Typography>ID: {text}</Typography>
      <Box ml={1}>
        <CopyToClipboard text={text} onCopy={handleCopy}>
          <IconButton aria-label="copy to clipboard" size="small">
            <ContentCopy />
          </IconButton>
        </CopyToClipboard>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="ID copied to clipboard!"
      />
    </Box>
  );
}

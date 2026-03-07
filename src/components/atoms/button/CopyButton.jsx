import React, { useState } from "react";
import { ContentCopy } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    // Prevent event bubbling if this is inside a clickable row
    e.stopPropagation();

    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      // Reset the feedback state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Unable to copy", err);
    }
  };

  return (
    <Tooltip
      title={copied ? "Copied!" : "Copy to clipboard"}
      arrow
      placement="top">
      <IconButton
        onClick={handleCopy}
        size="small"
        sx={{
          ml: 0.5,
          p: 0.5,
          color: copied ? "#199700" : "#7A8BB1",
          transition: "all 0.2s ease",
          "&:hover": {
            backgroundColor: "rgba(122, 139, 177, 0.1)",
          },
        }}>
        <ContentCopy sx={{ fontSize: 16 }} />
      </IconButton>
    </Tooltip>
  );
};

export default CopyButton;

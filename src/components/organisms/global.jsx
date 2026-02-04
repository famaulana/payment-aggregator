import React from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  Box,
  Zoom,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useModalStore } from "@/store/useModalStore";

// Import your specific modal views
import SuccessModal from "./modal/Success";

const MODAL_COMPONENTS = {
  SUCCESS: SuccessModal,
};

export const GlobalModalComponent = () => {
  const { isOpen, view, data, closeModal } = useModalStore();

  // Get the component to render based on the store's view string
  const SpecificModal = MODAL_COMPONENTS[view];

  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      slots={{
        transition: Zoom,
      }}
      slotProps={{
        paper: {
          sx: {
            borderRadius: "1.5rem", // rounded-3xl
            padding: "1rem",
            boxShadow: "0 20px 27px 0 rgba(0, 0, 0, 0.05)",
            backgroundImage: "none", // Fix for Dark Mode if enabled
          },
        },
      }}
      maxWidth="xs" // Options: 'xs', 'sm', 'md', etc.
      fullWidth
      // This is where we apply the Soft UI aesthetic
    >
      <Box className="relative">
        {/* Close Button */}
        <IconButton
          onClick={closeModal}
          size="small"
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
            color: "grey.400",
            "&:hover": { color: "grey.700" },
          }}>
          <CloseIcon fontSize="small" />
        </IconButton>

        <DialogContent sx={{ p: 3 }}>
          {SpecificModal ? (
            <SpecificModal data={data} />
          ) : (
            <Typography>Modal content not found.</Typography>
          )}
        </DialogContent>
      </Box>
    </Dialog>
  );
};

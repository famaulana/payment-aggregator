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
import LoadingModal from "./modal/Loading";
import EditMDRModal from "./modal/mdr/EditMDR";
import DetailMDRModal from "./modal/mdr/DetailMDR";

const MODAL_COMPONENTS = {
  SUCCESS: SuccessModal,
  LOADING: LoadingModal,
  EDIT_MDR: EditMDRModal,
  DETAIL_MDR: DetailMDRModal,
};

export const GlobalModalComponent = () => {
  const { isOpen, view, data, closeModal, width } = useModalStore();

  // Get the component to render based on the store's view string
  const SpecificModal = MODAL_COMPONENTS[view];

  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      slots={{ transition: Zoom }}
      slotProps={{
        paper: {
          sx: {
            borderRadius: "1.5rem",
            padding: "0.5rem", // Reduced padding to control it via children
            boxShadow: "0 20px 27px 0 rgba(0, 0, 0, 0.05)",
          },
        },
      }}
      maxWidth={view == "LOADING" ? "xs" : width}
      fullWidth>
      {/* HEADER SECTION */}
      <Box className="flex items-center justify-between px-6 pt-4">
        <div className="flex flex-col">
          <Typography variant="h6" className="font-bold text-slate-700">
            {data?.header || ""}
          </Typography>
          {data?.subheader && (
            <Typography variant="body2" className="text-slate-400">
              {data?.subheader || ""}
            </Typography>
          )}
        </div>

        <IconButton
          onClick={closeModal}
          size="small"
          sx={{
            color: "grey.400",
            "&:hover": { color: "grey.700" },
          }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Optional Divider if title exists */}
      {/* {data?.title && <Divider className="mx-6 mt-2 opacity-50" />} */}

      <DialogContent sx={{ p: 3 }}>
        {SpecificModal ? (
          <SpecificModal data={data} />
        ) : (
          <Typography>Modal content not found.</Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

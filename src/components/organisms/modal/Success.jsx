import { DefaultButton } from "@/components/atoms/button/DefaultButton";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
// import Image from "next/image";

export const SuccessModal = ({
  open,
  onClose,
  onConfirm,
  title = "Perhatian!",
  description,
  maxWidth = "350px",
  ...props
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: maxWidth,
          },
          "& .MuiDialog-paper": {
            borderRadius: "10px",
          },
        },
      }}
      {...props}>
      <DialogTitle id="alert-dialog-title" onClose={onClose}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          display: "grid",
          justifyContent: "center",
          rowGap: "0.5rem",
        }}>
        {/* <Image
          src={}
          width={160}
          height={140}
          alt="modal-loading"
          className="justify-self-center py-2"
          priority
        /> */}
        <div className="text-lg font-extrabold text-center py-2">{title}</div>
        <div className="text-center py-2">{description}</div>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: "center",
          columnGap: "0.5rem",
          padding: "0 1.5rem 1.5rem",
        }}>
        <DefaultButton onClick={onClose}>Tidak</DefaultButton>
        <DefaultButton onClick={onConfirm}>Ya</DefaultButton>
      </DialogActions>
    </Dialog>
  );
};

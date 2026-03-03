import { Typography, Box } from "@mui/material";
import { useModalStore } from "@/store/useModalStore";
import CancelIcon from "@mui/icons-material/Cancel";
import { DefaultButton } from "@/components/atoms/button/DefaultButton";
import ErrorCloseIcon, { ErrorIcon } from "@/components/atoms/icons/ErrorIcon";

const ErrorModal = ({ data }) => {
  const closeModal = useModalStore((s) => s.closeModal);

  return (
    <Box className="text-center  flex flex-col space-y-2">
      <div className="flex justify-center">
        <ErrorCloseIcon size={150} />
      </div>

      <Typography variant="h6" className="font-bold text-slate-700 mb-4">
        {data.title ?? "Oops!"}
      </Typography>

      <Typography className="text-slate-500 mt-2 mb-10">
        {data.messages ?? "Error Modal desc"}
      </Typography>

      <Box className="flex justify-center gap-3">
        <div>
          <DefaultButton colorType="danger" onClick={closeModal}>
            <span className="pt-2">Close</span> <CancelIcon />
          </DefaultButton>
        </div>
      </Box>
    </Box>
  );
};

export default ErrorModal;

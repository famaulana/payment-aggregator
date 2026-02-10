import { Typography, Box } from "@mui/material";
import { useModalStore } from "@/store/useModalStore";
import CancelIcon from "@mui/icons-material/Cancel";
import { SuccessIcon } from "@/components/atoms/icons/SuccessIcon";
import { DefaultButton } from "@/components/atoms/button/DefaultButton";

const SuccessModal = ({ data }) => {
  const closeModal = useModalStore((s) => s.closeModal);

  return (
    <Box className="text-center  flex flex-col space-y-2">
      <div className="flex justify-center">
        <SuccessIcon />
      </div>

      <Typography variant="h6" className="font-bold text-slate-700 mb-4">
        {data.title ?? "Yeay!"}
      </Typography>

      <Typography className="text-slate-500 mt-2 mb-10">
        {data.messages ?? "Success Modal desc"}
      </Typography>

      <Box className="flex gap-3">
        <DefaultButton fullWidth colorType="danger" onClick={closeModal}>
          Close <CancelIcon />
        </DefaultButton>
      </Box>
    </Box>
  );
};

export default SuccessModal;

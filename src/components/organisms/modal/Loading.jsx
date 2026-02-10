import { Box, Typography } from "@mui/material";
import Spinner from "@/components/atoms/spinner/LoadingSpinner";

const LoadingModal = () => {
  return (
    <Box className="text-center flex flex-col items-center justify-center space-y-4">
      <Spinner size={130} />
      <Typography className="text-2xl/loose" sx={{ fontWeight: 600 }}>
        Mohon Tunggu...
      </Typography>
    </Box>
  );
};

export default LoadingModal;

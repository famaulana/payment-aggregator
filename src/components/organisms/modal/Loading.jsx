import { Box, Typography } from "@mui/material";
import Spinner from "@/components/atoms/spinner/LoadingSpinner";

const LoadingModal = () => {
  return (
    <Box className="text-center flex flex-col items-center justify-center">
      <Spinner />
      <Typography className="text-2xl" sx={{ fontWeight: 600 }}>
        Mohon Tunggu...
      </Typography>
    </Box>
  );
};

export default LoadingModal;

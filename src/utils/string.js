export const colorStatusRole = (status) => {
  switch (status) {
    case "success":
      return "text-[#199700]";
    case "pending":
      return "text-[#BC9000]";
    case "failed":
      return "text-[#FF5555]";
    default:
      return null;
  }
};
